import { useCallback } from "react";
import { Form, Action, ActionPanel, useNavigation } from "@raycast/api";

function CreateTodoForm(props: { defaultTitle?: string; onCreate: (title: string, ticker: object) => void }) {
  const { onCreate, defaultTitle = "" } = props;
  const { pop } = useNavigation();

  const handleSubmit = useCallback(
    (values: { title: string, ticker: object }) => {
      onCreate(values.title, values.ticker);
      pop();
    },
    [onCreate, pop]
  );

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create Todo" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="title" defaultValue={defaultTitle} title="Title" />
    </Form>
  );
}

export default CreateTodoForm;
