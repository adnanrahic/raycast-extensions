import fetch, { AbortError } from "node-fetch";
import moment from 'moment';
import { Aggregates } from "../types";

async function getAggregates( ticker: string): Promise<Aggregates[]> {
  const apiKey = 'mxAPLuUuzG8GSi3zC7e7ZZpa_ggQ5Pnf'

  const today = moment().format('YYYY-MM-DD');
  const lastMonth = moment(today).subtract(30, 'days').format('YYYY-MM-DD');

  const dateFrom = lastMonth;
  const dateTo = today;

  const aggregatesUrl = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dateFrom}/${dateTo}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`;

  const response = await fetch(aggregatesUrl, {
    method: "get",
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

export default getAggregates;