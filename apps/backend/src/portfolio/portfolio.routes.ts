import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { createRoute } from "@hono/zod-openapi";
import {
  createPortfolioRequestSchema,
  createPortfolioResponseSchema,
  getPortofolioRequestScheme,
  getPortofolioResponseSchema,
  notFoundSchema,
} from "./portfolio.schema";

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

export const get = createRoute({
  path : "/:id",
  method : "get",
  request: {
    params: getPortofolioRequestScheme
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPortofolioResponseSchema,
      "Portofolio with matching ID"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema, 
      "Portofolio not found"
    )
  }
})