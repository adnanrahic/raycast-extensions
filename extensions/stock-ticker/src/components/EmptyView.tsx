import { ActionPanel, List } from "@raycast/api";
import { Stock, Ticker } from "../types";
import CreateStockAction from "./CreateStockAction";

function EmptyView(props: { stocks: Stock[]; searchText: string; onCreate: (ticker: Ticker) => void }) {
  if (props.stocks.length > 0) {
    return (
      <List.EmptyView
        icon="😕"
        title="No matching stocks found"
        description={`Can't find a stock matching ${props.searchText}.\nCreate it now!`}
        actions={
          <ActionPanel>
            <CreateStockAction onCreate={props.onCreate} />
          </ActionPanel>
        }
      />
    );
  }

  return (
    <List.EmptyView
      icon="📈"
      title="No stocks found"
      description="You don't have any stocks yet. Why not add some?"
      actions={
        <ActionPanel>
          <CreateStockAction onCreate={props.onCreate} />
        </ActionPanel>
      }
    />
  );
}
export default EmptyView;
