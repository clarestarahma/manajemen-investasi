import z from "zod";

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
  baseCurrency: z.string(),
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
