import { Action, Icon } from "@raycast/api";
import { Ticker } from "../types";
import CreateStockSearch from "./CreateStockSearch";

function CreateStockAction(props: { onCreate: (ticker: Ticker) => void }) {
  return (
    <Action.Push
      icon={Icon.ArrowRight}
      title="Add more stock to favorites"
      shortcut={{ modifiers: ["cmd"], key: "n" }}
      target={<CreateStockSearch onCreate={props.onCreate} />}
    />
  );
}

export default CreateStockAction;
