import { relations } from "drizzle-orm";
import {
  doublePrecision,
  pgTable,
  text,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const portfolio = pgTable(
  "portfolio",
  {
    id: uuid().defaultRandom().primaryKey(),
    name: text().notNull(),
    userId: text().notNull(),
    cashBalance: text().notNull(),
    baseCurrency: text().notNull(),
  },
  (t) => [uniqueIndex().on(t.userId, t.name)]
);

export const portfolioRelations = relations(portfolio, ({ many }) => ({
  assets: many(portfolioAsset),
}));

export const portfolioAsset = pgTable("portfolio_asset", {
  portofolioId: uuid().defaultRandom().primaryKey(),
  userId: uuid().notNull(),
  quantity: doublePrecision().notNull(),
});

export const portfolioAssetRelations = relations(portfolioAsset, ({ one }) => ({
  portfolio: one(portfolio, {
    fields: [portfolioAsset.portofolioId],
    references: [portfolio.id],
  }),
  asset: one(asset, {
    fields: [portfolioAsset.portofolioId],
    references: [asset.id],
  }),
}));

export const asset = pgTable("asset", {
  id: text().primaryKey(),
  symbol: text().notNull(),
  assetType: text().notNull(),
  baseCurrency: text(),
  quoteCurrency: text(),
});

export const assetRelations = relations(asset, ({ many }) => ({
  ohlcv: many(ohlcv),
}));

export const ohlcv = pgTable("ohlcv", {
  assetId: text().notNull(),
  open: doublePrecision().notNull(),
  high: doublePrecision().notNull(),
  low: doublePrecision().notNull(),
  close: doublePrecision().notNull(),
  volume: doublePrecision().notNull(),
});

export const ohlcvRelations = relations(ohlcv, ({ one }) => ({
  asset: one(asset, {
    fields: [ohlcv.assetId],
    references: [asset.id],
  }),
}));
