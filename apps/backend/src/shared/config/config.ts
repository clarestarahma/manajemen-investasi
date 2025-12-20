import "dotenv/config";
import z from "zod";

const configSchema = z.object({
  logLevel: z.enum(["debug", "info", "warn", "error", "fatal"]),
  databaseUrl: z.url({ protocol: /postgresql/ }),
  nodeEnv: z.enum(["development", "production", "test"]),
  massiveApiKey: z.string(),
});

export type Config = z.infer<typeof configSchema>;

export function createConfig(): Config {
  const config = {
    logLevel: process.env.LOG_LEVEL || "info",
    databaseUrl: process.env.DATABASE_URL!,
    nodeEnv: process.env.NODE_ENV || "development",
    massiveApiKey: process.env.MASSIVE_API_KEY!,
  } as const;

  return configSchema.parse(config);
}
