import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { Schema } from "hono";
import type { PinoLogger } from "hono-pino";

declare global {
  type AppBindings = {
    Variables: {
      logger: PinoLogger;
    };
  };

  // eslint-disable-next-line ts/no-empty-object-type
  type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppBindings, S>;

  type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;
}
