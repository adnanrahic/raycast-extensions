import { Action, Icon } from "@raycast/api";
import { Todo } from "../types";
import ViewTodo from "./ViewTodo";

function ViewTodoAction(props: { todo: Todo }) {
  return (
    <Action.Push
      icon={Icon.Eye}
      title="View Todo"
      target={<ViewTodo todo={props.todo} />}
    />
  );
}

export default ViewTodoAction;
