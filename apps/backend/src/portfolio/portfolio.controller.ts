import * as HttpStatusCodes from "stoker/http-status-codes";
import type { Context, TypedResponse } from "hono";
import type {
  CreatePortfolioRequest,
  CreatePortfolioResponse,
  GetPortofolioResponse,
} from "./portfolio.schema";
import { Portfolio } from "./portofolio";
import { Database } from "@/infra/db/db";
import { Logger } from "@/infra/logger/logger";
export class PortfolioController {
  private db: Database
  private logger: Logger
  
  constructor(db: Database, logger: Logger){
    this.db = db;
    this.logger = logger;
  }

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

    this.logger.info(this.db);
    await portfolio.save(this.db);

    if ( !portfolio.id ){
      throw new Error("Tidak ada id");
    }

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
  async getPortfolio(c: Context): Promise<TypedResponse<GetPortofolioResponse, 200, "json">> {
    const id = c.req.param("id");
    return c.json({
      portofolio: {
        id: id,
        name: "blabla",
        userId: id,
        baseCurrency: "IDR",
        cashBalance: 1,
      }
    }, HttpStatusCodes.OK)
  }

  // portofolioId, assetId, quantity
  async addAsset(c: Context) {}
}
