import { describe, test, should, expect } from "vitest";
import { createConfig } from "./config.js";
import { title } from "process";

describe("Config", () => {
  test("should validate correctly", () => {
    const testCases = [
      {
        title: "Complete fields",
        env: {
          LOG_LEVEL: "debug",
          DATABASE_URL: "postgresql://postgres:postgres@localhost:5173/test",
          NODE_ENV: "development",
          MASSIVE_API_KEY: "massive",
        },
        wantError: false,
        want: {
          logLevel: "debug",
          databaseUrl: "postgresql://postgres:postgres@localhost:5173/test",
          nodeEnv: "development",
          massiveApiKey: "massive",
        },
      },
      {
        title: "Missing optional fields",
        env: {
          DATABASE_URL: "postgresql://postgres:postgres@localhost:5173/test",
          MASSIVE_API_KEY: "massive",
        },
        wantError: false,
        want: {
          logLevel: "info",
          databaseUrl: "postgresql://postgres:postgres@localhost:5173/test",
          massiveApiKey: "massive",
          nodeEnv: "development",
        },
      },
      {
        title: "Invalid DATABASE_URL",
        env: {
          DATABASE_URL: "https://google.com",
          MASSIVE_API_KEY: "massive",
        },
        wantError: true,
      },
      {
        title: "Invalid LOG_LEVEL",
        env: {
          DATABASE_URL: "postgresql://postgres:postgres@localhost:5173/test",
          MASSIVE_API_KEY: "massive",
          LOG_LEVEL: "invalid",
        },
        wantError: true,
      },
      {
        title: "Invalid NODE_ENV",
        env: {
          DATABASE_URL: "postgresql://postgres:postgres@localhost:5173/test",
          MASSIVE_API_KEY: "massive",
          NODE_ENV: "invalid",
        },
        wantError: true,
      },
    ];

    testCases.forEach((tc) => {
      const wantError = tc.wantError;
      const want = tc.want;
      const envKeys = Object.keys(tc.env);

      for (const key of envKeys) {
        process.env[key] = tc.env[key as unknown as keyof typeof tc.env];
      }

      console.log("Tect Case:", tc.title);

      if (wantError) {
        expect(createConfig).toThrow();
      } else {
        const got = createConfig();
        expect(got).toEqual(want);
      }

      for (const key of envKeys) {
        delete process.env[key];
      }
    });
  });
});
