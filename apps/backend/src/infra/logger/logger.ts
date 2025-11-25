import pino from "pino";
import pretty from "pino-pretty";

import { type Config } from "@/shared/config/config";

export function createLogger(config: Config) {
  return pino(
    {
      level: config.logLevel || "info",
    },
    config.nodeEnv === "production" ? undefined : pretty()
  );
}

export type Logger = ReturnType<typeof createLogger>;
