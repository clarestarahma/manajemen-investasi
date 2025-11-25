import { v4 as uuidv4 } from "uuid";
import type { PortfolioAsset } from "./entities/portofolio-asset.js";

export class Portfolio {
  id: string;
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
    assets: PortfolioAsset[]
  ) {
    this.id = uuidv4();
    this.name = name;
    this.userId = userId;
    this.cashBalance = cashBalance;
    this.baseCurrency = baseCurrency;
    this.assets = assets;
  }

  static getByUserId(userId: string): Portfolio[] {
    return [];
  }

  static get(portfolioId: string): Portfolio | null {
    return null;
  }

  save() {}

  delete() {}

  addAsset() {}

  deleteAsset() {}
}
