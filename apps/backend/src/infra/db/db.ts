import type { Config } from "@/shared/config/config.js";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.js";

export function createDb(config: Config) {
  const db = drizzle(config.databaseUrl, {
    casing: "snake_case",
    schema: schema,
  });

  return db;
}
