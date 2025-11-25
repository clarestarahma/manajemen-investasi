import { defineConfig } from "drizzle-kit";
import { createConfig } from "@/shared/config/config.js";

const config = createConfig();

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/infra/db/schema.ts",
  dbCredentials: {
    url: config.databaseUrl,
  },
});
