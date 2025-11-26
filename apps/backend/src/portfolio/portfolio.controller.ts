import * as HttpStatusCodes from "stoker/http-status-codes";
import type { Context, TypedResponse } from "hono";
import type {
  CreatePortfolioRequest,
  CreatePortfolioResponse,
  GetPortofolioRequest,
  GetPortofolioResponse,
  NotFound,
} from "./portfolio.schema";
import { Portfolio } from "./portofolio";
import { Database } from "@/infra/db/db";
import { Logger } from "@/infra/logger/logger";
import * as HttpStatusPhrases from "stoker/http-status-phrases"
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
  async getPortfolio(c: Context): Promise<TypedResponse<GetPortofolioResponse, 200, "json"> | TypedResponse<NotFound, 404, "json">> {
    const body = await c.req.json();
    const id = body.userId;
    const portfolio: Portfolio | null = await Portfolio.get(this.db, id);

    if( !portfolio ){
      return c.json({
        message: HttpStatusPhrases.NOT_FOUND
      }, HttpStatusCodes.NOT_FOUND)
    }

    return c.json({
      portfolio: {
        id: portfolio.id!,
        name: portfolio.name,
        userId: portfolio.userId,
        baseCurrency: portfolio.baseCurrency,
        cashBalance: portfolio.cashBalance,
      }
    }, HttpStatusCodes.OK)
  }
}
