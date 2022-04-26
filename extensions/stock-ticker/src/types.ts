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
  chart: string;
  trend: number;
  trendPercentage: number;
  newHigh: number;
  isLoading: boolean;
}

export type { Stock, Ticker, Aggregates };
