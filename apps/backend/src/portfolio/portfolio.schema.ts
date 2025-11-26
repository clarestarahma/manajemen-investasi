import z from "zod";
import { createMessageObjectSchema } from "stoker/openapi/schemas"
import * as HttpStatusPhrases from "stoker/http-status-phrases"

export const portfolioSchema = z.object({
  id: z.uuidv4(),
  name: z.string(),
  userId: z.uuidv4(),
  baseCurrency: z.string(),
  cashBalance: z.number(),
});



export const createPortfolioRequestSchema = z.object({
  name: z.string(),
  userId: z.uuidv4(),
  baseCurrency: z.enum(["IDR", "USD"]),
  cashBalance: z.number(),
});



export type CreatePortfolioRequest = z.infer<
  typeof createPortfolioRequestSchema
>;

export const createPortfolioResponseSchema = z.object({
  portfolio: portfolioSchema,
});

export type CreatePortfolioResponse = z.infer<
  typeof createPortfolioResponseSchema
>;

export const getPortofolioRequestScheme = z.object({
  id: z.uuidv4(),
})

export type GetPortofolioRequest = z.infer<
  typeof getPortofolioRequestScheme
>;

export type GetPortofolioResponse = z.infer<
  typeof getPortofolioResponseSchema
>;

export const getPortofolioResponseSchema = z.object({
  portfolio: portfolioSchema
})

export const notFoundSchema = createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND)

export type NotFound = z.infer<typeof notFoundSchema>