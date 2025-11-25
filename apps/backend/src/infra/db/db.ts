import type { Config } from "@/shared/config/config";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export function createDb(config: Config) {
  const db = drizzle(config.databaseUrl, {
    casing: "snake_case",
    schema: schema,
  });

  return db;
}


export type Database = ReturnType<typeof createDb>