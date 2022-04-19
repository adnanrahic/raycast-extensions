import { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { ActionPanel, Icon, List, LocalStorage } from "@raycast/api";
import { Stock } from "./types";
import { CreateStockAction, DeleteStockAction, EmptyView, ViewStockAction } from "./components";

type State = {
  isLoading: boolean;
  searchText: string;
  stocks: Stock[];
};

export default function Command() {
  const [state, setState] = useState<State>({
    isLoading: true,
    searchText: "",
    stocks: [],
  });

  useEffect(() => {
    (async () => {
      const storedStocks = await LocalStorage.getItem<string>("stocks");

      if (!storedStocks) {
        setState((previous) => ({ ...previous, isLoading: false }));
        return;
      }

      try {
        const stocks: Stock[] = JSON.parse(storedStocks);
        setState((previous) => ({ ...previous, stocks, isLoading: false }));
      } catch (e) {
        // can't decode stocks
        setState((previous) => ({ ...previous, stocks: [], isLoading: false }));
      }
    })();
  }, []);

  useEffect(() => {
    LocalStorage.setItem("stocks", JSON.stringify(state.stocks));
  }, [state.stocks]);

  const handleCreate = useCallback(
    (ticker: object) => {
      const newStocks = [...state.stocks, { id: nanoid(), ticker }];
      setState((previous) => ({ ...previous, stocks: newStocks, searchText: "" }));
    },
    [state.stocks, setState]
  );

  const handleDelete = useCallback(
    (index: number) => {
      const newStocks = [...state.stocks];
      newStocks.splice(index, 1);
      setState((previous) => ({ ...previous, stocks: newStocks }));
    },
    [state.stocks, setState]
  );

  return (
    <List
      enableFiltering
      isLoading={state.isLoading}
      navigationTitle="Filter your favorite stock tickers"
      searchBarPlaceholder="Filter your favorite stock tickers"
      searchText={state.searchText}
      onSearchTextChange={(newValue) => {
        setState((previous) => ({ ...previous, searchText: newValue }));
      }}
    >
      <EmptyView
        stocks={state.stocks}
        searchText={state.searchText}
        onCreate={handleCreate}
      />

      {state.stocks.map((stock, index) => (
        <List.Item
          key={stock.id}
          title={stock.ticker.ticker}
          subtitle={stock.ticker.name}
          accessories={[{ icon: Icon.Document, text: stock.ticker.currencyName }]}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <ViewStockAction stock={stock} />
              </ActionPanel.Section>
              <ActionPanel.Section>
                <CreateStockAction onCreate={handleCreate} />
                <DeleteStockAction onDelete={() => handleDelete(index)} />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
