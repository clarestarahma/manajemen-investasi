import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { createRoute } from "@hono/zod-openapi";
import {
  createPortfolioRequestSchema,
  createPortfolioResponseSchema,
} from "./portfolio.schema.js";

const tags = ["Portfolios"];

export const create = createRoute({
  path: "/",
  method: "post",
  request: {
    body: jsonContentRequired(
      createPortfolioRequestSchema,
      "The portfolio to create"
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      createPortfolioResponseSchema,
      "The created portfolio"
    ),
  },
});
