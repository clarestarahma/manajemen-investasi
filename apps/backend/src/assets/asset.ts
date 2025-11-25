import type { OHLCV } from "./entities/ohlcv.js";
import { v4 as uuidv4 } from "uuid";

export class Asset {
  id: string;
  assetType: string;
  symbol: string;
  name: string;
  categories: string[];
  ohlcv: OHLCV[];
  baseCurrency?: string;
  quoteCurrency?: string;

  constructor(
    assetType: string,
    symbol: string,
    name: string,
    categories: string[],
    ohlcv: OHLCV[],
    baseCurrency?: string,
    quoteCurrency?: string
  ) {
    this.id = uuidv4();
    this.assetType = assetType;
    this.symbol = symbol;
    this.name = name;
    this.categories = categories;
    this.ohlcv = ohlcv;
    this.baseCurrency = baseCurrency;
    this.quoteCurrency = quoteCurrency;
  }

  static get(assetId: string): Asset | null {
    return null;
  }

  static search(query: string): Asset[] {
    return [];
  }
}
