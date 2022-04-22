import { Detail, Icon, showToast, Toast } from "@raycast/api";
import { useState, useEffect, useRef, useCallback } from "react";
import fetch, { AbortError } from "node-fetch";
import { Stock, Aggregates } from "../types";
import moment from 'moment';
import dedent from "dedent-js";

/**
 * Component
 * @param props 
 * @returns <Detail>
 */
function ViewStockAction(props: { stock: Stock }) {
  const { stock } = props;
  const [results, isLoading, get] = useGet();
  
  useEffect(() => {
    get(stock.ticker.ticker);
  }, []);  

  const aggregates = results
  .sort((a, b) => {
    return Number(b.timestamp) - Number(a.timestamp);
  })
  .reduce((markdown, r) => {
    let line = dedent(`
      ### ${moment(r.timestamp).format('MMMM Do')}
      ⭕${r.open} 🚫${r.close} ⬆️${r.high} ⬇️${r.low}
      \n
    `);

    markdown += line;
    return markdown;
  }, '');

  const markdown = `
  ${aggregates}
  `;


  return (
    <Detail
      isLoading={isLoading}
      markdown={markdown}
      navigationTitle={stock.ticker.ticker}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Name" text={stock.ticker.name} />
          <Detail.Metadata.Label title="Ticker" text={stock.ticker.ticker} />
          <Detail.Metadata.Separator />
          <Detail.Metadata.TagList title="Market">
            <Detail.Metadata.TagList.Item text={stock.ticker.market} color={"#f0f0f0"} />
            <Detail.Metadata.TagList.Item text={stock.ticker.locale} color={"#f0f0f0"} />
          </Detail.Metadata.TagList>
          <Detail.Metadata.TagList title="Currency">
            <Detail.Metadata.TagList.Item text={stock.ticker.currencyName} color={"#f0f0f0"} />
          </Detail.Metadata.TagList>
        </Detail.Metadata>
      }
    />
  );
}

function useGet() {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<Aggregates[]>([]);
  const cancelRef = useRef<AbortController | null>(null);

  const get = useCallback(
    async function get(ticker: string) {
      cancelRef.current?.abort();
      cancelRef.current = new AbortController();
      setIsLoading(true);
      try {
        const results = await getAggregates(ticker, cancelRef.current.signal);
        setResults(results);
      } catch (error) {
        if (error instanceof AbortError) {
          return;
        }
        console.error("search error", error);
        showToast({
          style: Toast.Style.Failure,
          title: "Could not perform search",
          message: String(error),
        });
      } finally {
        setIsLoading(false);
      }
    },
    [cancelRef, setIsLoading, setResults]
  );

  useEffect(() => {
    get("");
    return () => {
      cancelRef.current?.abort();
    };
  }, []);

  return [results, isLoading, get] as const;
}

async function getAggregates( ticker: string, signal: AbortSignal): Promise<Aggregates[]> {
  const apiKey = 'mxAPLuUuzG8GSi3zC7e7ZZpa_ggQ5Pnf'

  const today = moment().format('YYYY-MM-DD');
  const lastMonth = moment(today).subtract(30, 'days').format('YYYY-MM-DD');

  const dateFrom = lastMonth;
  const dateTo = today;

  const aggregatesUrl = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dateFrom}/${dateTo}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`;

  const response = await fetch(aggregatesUrl, {
    method: "get",
    signal: signal,
  });

  const json = (await response.json()) as
    | {
        resultsCount: number;
        results: {
          o: number;
          c: number;
          h: number;
          l: number;
          t: string;
        }[];
      }
    | { status: string; error: string };

  if (!response.ok || "error" in json) {
    throw new Error("error" in json ? json.error : response.statusText);
  }
  const { results, resultsCount } = json;

  if (!resultsCount || resultsCount === 0) {
    throw new Error("No result for this date.");
  }

  return results.map(result => {
    return {
      open: result.o,
      close: result.c,
      high: result.h,
      low: result.l,
      timestamp: result.t,
    };
  });
}

export default ViewStockAction;
