interface Stock {
  id: string;
  ticker: {
    ticker: string;
    name: string;
    market: string;
    locale: string;
    currency_name: string;
  };
}

export type { Stock };
