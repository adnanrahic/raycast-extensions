import { Action, Icon } from "@raycast/api";
import { Stock } from "../types";
import ViewStock from "./ViewStock";

function ViewStockAction(props: { stock: Stock }) {
  return (
    <Action.Push
      icon={Icon.Eye}
      title="View Stock"
      target={<ViewStock stock={props.stock} />}
    />
  );
}

export default ViewStockAction;
