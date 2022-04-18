import { ActionPanel, List } from "@raycast/api";
import { Todo } from "../types";
import CreateTodoAction from "./CreateTodoAction";

function EmptyView(props: { todos: Todo[]; searchText: string; onCreate: (title: string, ticker: object) => void }) {
  if (props.todos.length > 0) {
    return (
      <List.EmptyView
        icon="😕"
        title="No matching todos found"
        description={`Can't find a todo matching ${props.searchText}.\nCreate it now!`}
        actions={
          <ActionPanel>
            <CreateTodoAction defaultTitle={props.searchText} onCreate={props.onCreate} />
          </ActionPanel>
        }
      />
    );
  }

  return (
    <List.EmptyView
      icon="📝"
      title="No todos found"
      description="You don't have any todos yet. Why not add some?"
      actions={
        <ActionPanel>
          <CreateTodoAction defaultTitle={props.searchText} onCreate={props.onCreate} />
        </ActionPanel>
      }
    />
  );
}
export default EmptyView;
