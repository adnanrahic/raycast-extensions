import { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { ActionPanel, Icon, List, LocalStorage } from "@raycast/api";
import { Todo } from "./types";
import { CreateTodoAction, DeleteTodoAction, EmptyView, ViewTodoAction } from "./components";

type State = {
  isLoading: boolean;
  searchText: string;
  todos: Todo[];
};

export default function Command() {
  const [state, setState] = useState<State>({
    isLoading: true,
    searchText: "",
    todos: [],
  });

  useEffect(() => {
    (async () => {
      const storedTodos = await LocalStorage.getItem<string>("todos");

      if (!storedTodos) {
        setState((previous) => ({ ...previous, isLoading: false }));
        return;
      }

      try {
        const todos: Todo[] = JSON.parse(storedTodos);
        setState((previous) => ({ ...previous, todos, isLoading: false }));
      } catch (e) {
        // can't decode todos
        setState((previous) => ({ ...previous, todos: [], isLoading: false }));
      }
    })();
  }, []);

  useEffect(() => {
    LocalStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  const handleCreate = useCallback(
    (title: string, ticker: object) => {
      const newTodos = [...state.todos, { id: nanoid(), title, ticker }];
      setState((previous) => ({ ...previous, todos: newTodos, searchText: "" }));
    },
    [state.todos, setState]
  );

  const handleDelete = useCallback(
    (index: number) => {
      const newTodos = [...state.todos];
      newTodos.splice(index, 1);
      setState((previous) => ({ ...previous, todos: newTodos }));
    },
    [state.todos, setState]
  );

  return (
    <List
      enableFiltering
      isLoading={state.isLoading}
      navigationTitle="Search Stock Tickers"
      searchBarPlaceholder="Search Stock Tickers"
      searchText={state.searchText}
      onSearchTextChange={(newValue) => {
        setState((previous) => ({ ...previous, searchText: newValue }));
      }}
    >
      <EmptyView
        todos={state.todos}
        searchText={state.searchText}
        onCreate={handleCreate}
      />

      {state.todos.map((todo, index) => (
        <List.Item
          key={todo.id}
          title={todo.title}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <ViewTodoAction todo={todo} />
              </ActionPanel.Section>
              <ActionPanel.Section>
                <CreateTodoAction onCreate={handleCreate} />
                <DeleteTodoAction onDelete={() => handleDelete(index)} />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
