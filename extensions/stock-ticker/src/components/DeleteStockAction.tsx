import { Action, Icon } from "@raycast/api";

function DeleteStockAction(props: { onDelete: () => void }) {
  return (
    <Action
      icon={Icon.Trash}
      title="Remove stock from favorites"
      shortcut={{ modifiers: ["ctrl"], key: "x" }}
      onAction={props.onDelete}
    />
  );
}

export default DeleteStockAction;
