interface Stock {
  id: string;
  ticker: {
    ticker: string;
    name: string;
    market: string;
    locale: string;
    currencyName: string;
  };
}

export type { Stock };
