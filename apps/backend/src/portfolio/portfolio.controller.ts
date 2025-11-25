import * as HttpStatusCodes from "stoker/http-status-codes";
import type { Context, TypedResponse } from "hono";
import type {
  CreatePortfolioRequest,
  CreatePortfolioResponse,
} from "./portfolio.schema.js";
import { Portfolio } from "./portofolio.js";

export class PortfolioController {
  async createPortfolio(
    c: Context
  ): Promise<TypedResponse<CreatePortfolioResponse, 200, "json">> {
    const req: CreatePortfolioRequest = await c.req.json();

    const portfolio = new Portfolio(
      req.name,
      req.userId,
      req.cashBalance,
      req.baseCurrency,
      []
    );

    portfolio.save();

    return c.json(
      {
        portfolio: {
          id: portfolio.id,
          userId: portfolio.userId,
          name: portfolio.name,
          cashBalance: portfolio.cashBalance,
          baseCurrency: portfolio.baseCurrency,
        },
      },
      HttpStatusCodes.OK
    );
  }

  // id
  async getPortfolio(c: Context) {}

  // portofolioId, assetId, quantity
  async addAsset(c: Context) {}
}
