import { defineConfig } from "drizzle-kit";
import { createConfig } from "@/shared/config/config";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/infra/db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  casing: "snake_case",
});
