import { ActionPanel, List, showToast, Action, Toast, Icon, useNavigation } from "@raycast/api";
import { useState, useEffect, useRef, useCallback } from "react";
import fetch, { AbortError } from "node-fetch";

export default function Command(props: { onCreate: (ticker: object) => void }) {
  const [results, isLoading, search] = useSearch();
  const { onCreate } = props;
  const { pop } = useNavigation();

  const handleCreate = useCallback(
    (ticker: object) => {
      onCreate(ticker);
      pop();
    },
    [onCreate, pop]
  );

  return (
    <List isLoading={isLoading} onSearchTextChange={search} searchBarPlaceholder="Search for more stock tickers..." throttle>
      <List.Section title="Results" subtitle={results.length + ""}>
        {results.map((searchResult, index) => (
          <List.Item
            key={index}
            title={searchResult.ticker}
            subtitle={searchResult.name}
            accessories={[{ icon: Icon.Document, text: searchResult.currencyName }]}
            actions={
              <ActionPanel>
                <ActionPanel.Section>
                <Action
                  icon={Icon.Plus}
                  title="Add Ticker"
                  onAction={() => handleCreate(searchResult)}
                />
                </ActionPanel.Section>
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
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
  if (searchText.length === 0) {
    return [];
  }

  const searchTextUpper = searchText.toUpperCase();
  const tickerDetailsUrl = `https://api.polygon.io/v3/reference/tickers/${searchTextUpper}?apiKey=mxAPLuUuzG8GSi3zC7e7ZZpa_ggQ5Pnf`;

  const response = await fetch(tickerDetailsUrl, {
    method: "get",
    signal: signal,
  });

  const json = (await response.json()) as
    | {
        results: {
          ticker: string;
          name: string;
          market: string;
          locale: string;
          currency_name: string;
        };
      }
    | { status: string; error: string };

  if (!response.ok || "error" in json) {
    throw new Error("error" in json ? json.error : response.statusText);
  }

  const { results } = json;
  const searchResult = {
    ticker: results.ticker,
    name: results.name,
    market: results.market.toUpperCase(),
    locale: results.locale.toUpperCase(),
    currencyName: results.currency_name.toUpperCase(),
  };
  return [searchResult];
}

interface SearchResult {
  ticker: string,
  name: string,
  market: string,
  locale: string,
  currencyName: string,
}
