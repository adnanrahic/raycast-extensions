import { ActionPanel, List, showToast, Action, Toast, Icon } from "@raycast/api";
import { useState, useEffect, useRef, useCallback } from "react";
import fetch, { AbortError } from "node-fetch";

export default function Command() {
  const [results, isLoading, search] = useSearch();

  return (
    <List isLoading={isLoading} onSearchTextChange={search} searchBarPlaceholder="Search npm packages..." throttle>
      <List.Section title="Results" subtitle={results.length + ""}>
        {results.map((searchResult) => (
          <SearchListItem key={searchResult.ticker} searchResult={searchResult} />
        ))}
      </List.Section>
    </List>
  );
}

function SearchListItem({ searchResult }: { searchResult: SearchResult }) {
  return (
    <List.Item
      title={searchResult.ticker}
      subtitle={searchResult.market}
      accessories={[{ icon: Icon.Document, text: searchResult.currency_name }]}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action.OpenInBrowser title="Open in Browser" url={searchResult.url} />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}

function useSearch() {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<SearchResult[]>([]);
  const cancelRef = useRef<AbortController | null>(null);

  const search = useCallback(
    async function search(searchText: string) {
      cancelRef.current?.abort();
      cancelRef.current = new AbortController();
      setIsLoading(true);
      try {
        const results = await performSearch(searchText, cancelRef.current.signal);
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
    search("");
    return () => {
      cancelRef.current?.abort();
    };
  }, []);

  return [results, isLoading, search] as const;
}

async function performSearch(searchText: string, signal: AbortSignal): Promise<SearchResult[]> {
  const tickerId = searchText.length === 0 ? "SPY" : searchText
  const tickerDetailsUrl = `https://api.polygon.io/v3/reference/tickers/${tickerId}?apiKey=mxAPLuUuzG8GSi3zC7e7ZZpa_ggQ5Pnf`;

  const response = await fetch(tickerDetailsUrl, {
    method: "get",
    signal: signal,
  });

  const json = (await response.json()) as
    | {
        results: {
          ticker: string;
          market: string;
          locale: string;
          currency_name: string;
        }[];
      }
    | { code: string; message: string };

  if (!response.ok || "message" in json) {
    throw new Error("message" in json ? json.message : response.statusText);
  }

  return json.results.map((result) => {
    return {
      ticker: result.ticker,
      market: result.market,
      locale: result.locale,
      currency_name: result.currency_name,
    };
  });
}

interface SearchResult {
  ticker: string,
  market: string,
  locale: string,
  currency_name: string,
}
