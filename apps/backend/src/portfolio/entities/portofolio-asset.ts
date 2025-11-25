export class PortfolioAsset {
  assetId: string;
  portofolioId: string;
  quantity: number;

  constructor(assetId: string, portofolioId: string, quantity: number) {
    this.assetId = assetId;
    this.portofolioId = portofolioId;
    this.quantity = quantity;
  }
}
