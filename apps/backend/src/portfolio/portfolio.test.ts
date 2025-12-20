import { beforeAll, describe, expect, test } from "vitest";
import { Portfolio } from "./portfolio";
import { it } from "node:test";
import { createDb, Database } from "@/infra/db/db";
import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { v4 as uuidv4 } from "uuid";
import { execSync } from "child_process";

describe("portfolio model", async () => {
  let db: Database;

  const container = await new PostgreSqlContainer("postgres:18").start();
  db = createDb({
    nodeEnv: "test",
    databaseUrl: container.getConnectionUri(),
    logLevel: "info",
    massiveApiKey: "",
  });

  execSync(`${process.execPath} node_modules/.bin/drizzle-kit migrate`, {
    stdio: "inherit",
    env: {
      DATABASE_URL: container.getConnectionUri(),
    },
  });

  test("instantiates correctly", async () => {
    const portfolio = new Portfolio(
      "test portfolio",
      "2b334395-2657-4a7a-983b-ef67f34752e1",
      1e9,
      "IDR",
      []
    );

    expect(portfolio.name).toBe("test portfolio");
    expect(portfolio.userId).toBe("2b334395-2657-4a7a-983b-ef67f34752e1");
    expect(portfolio.cashBalance).toBe(1e9);
    expect(portfolio.baseCurrency).toBe("IDR");
  });

  test("save updates object correctly", async () => {
    const portfolio = new Portfolio("test", uuidv4(), 1000, "IDR", []);
    await portfolio.save(db);
    expect(portfolio.id).toBeTypeOf("string");
  });

  test("getByUserId returns all user portfolios", async () => {
    const userId = uuidv4();

    const portfolio1 = new Portfolio("test1", userId, 1000, "IDR", []);
    const portfolio2 = new Portfolio("test2", userId, 1000, "IDR", []);
    await portfolio1.save(db);
    await portfolio2.save(db);

    const portfolios = await Portfolio.getByUserId(db, userId);

    expect(portfolios).toBeDefined();
    expect(portfolios[0]).toBeDefined();
    expect(portfolios.length).toBe(2);
  });

  test("get returns portfolio with correct id", async () => {
    const portfolio = new Portfolio("test", uuidv4(), 1000, "IDR", []);
    await portfolio.save(db);

    const got = (await Portfolio.get(db, portfolio.id!))!;

    expect(got).toBeDefined();
    expect(got).toStrictEqual(portfolio);
  });

  test("get returns null if portfolio not found", async () => {
    const got = (await Portfolio.get(db, uuidv4()))!;
    expect(got).toBeNull();
  });
});
