import { Action, Icon } from "@raycast/api";
import CreateStockSearch from "./CreateStockSearch";

function CreateStockAction(props: { onCreate: (ticker: object) => void }) {
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
