import { PortfolioAsset } from "./entities/portofolio-asset";
import type { Database } from "@/infra/db/db";
import { eq } from "drizzle-orm";
import * as schema from "@/infra/db/schema";

export class Portfolio {
  id?: string;
  name: string;
  userId: string;
  cashBalance: number;
  baseCurrency: string;
  assets: PortfolioAsset[];

  constructor(
    name: string,
    userId: string,
    cashBalance: number,
    baseCurrency: string,
    assets: PortfolioAsset[],
    id?: string
  ) {
    this.id = id;
    this.name = name;
    this.userId = userId;
    this.cashBalance = cashBalance;
    this.baseCurrency = baseCurrency;
    this.assets = assets;
  }

  static async getByUserId(db: Database, userId: string): Promise<Portfolio[]> {
    const portfolios = await db.query.portfolio.findMany({
      where: eq(schema.portfolio.userId, userId),
      with: {
        assets: true,
      },
    });

    const models = [];
    for (let i = 0; i < portfolios.length; i++) {
      const p = portfolios[i];
      const assets = p.assets.map(
        (v) => new PortfolioAsset(v.assetId, v.portofolioId, v.quantity)
      );
      models.push(
        new Portfolio(
          p.name,
          p.userId,
          p.cashBalance,
          p.baseCurrency,
          assets,
          p.id
        )
      );
    }
    return models;
  }

  static async get(
    db: Database,
    portfolioId: string
  ): Promise<Portfolio | null> {
    const p = await db.query.portfolio.findFirst({
      where: eq(schema.portfolio.id, portfolioId),
      with: {
        assets: true,
      },
    });
    if (!p) return null;
    const assets = p.assets.map(
      (v) => new PortfolioAsset(v.assetId, v.portofolioId, v.quantity)
    );

    return new Portfolio(
      p.name,
      p.userId,
      p.cashBalance,
      p.baseCurrency,
      assets,
      p.id
    );
  }

  async save(db: Database) {
    const p = await db
      .insert(schema.portfolio)
      .values({
        userId: this.userId,
        name: this.name,
        baseCurrency: this.baseCurrency,
        cashBalance: this.cashBalance,
      })
      .onConflictDoUpdate({
        target: schema.portfolio.id,
        set: {
          name: this.name,
          baseCurrency: this.baseCurrency,
          cashBalance: this.cashBalance,
          userId: this.userId,
        },
      })
      .returning();

    this.id = p[0].id;
  }
}
