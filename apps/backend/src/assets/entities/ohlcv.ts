export class OHLCV {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;

  constructor(
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number
  ) {
    this.open = open;
    this.high = high;
    this.low = low;
    this.close = close;
    this.volume = volume;
  }
}
