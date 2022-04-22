interface Stock {
  id: string;
  ticker: Ticker;
}

interface Ticker {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  currencyName: string;
}

interface Aggregates {
  open: number;
  close: number;
  high: number;
  low: number;
  timestamp: string;
}

export type { Stock, Ticker, Aggregates };
