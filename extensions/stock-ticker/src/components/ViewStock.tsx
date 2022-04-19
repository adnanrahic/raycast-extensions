import { Detail } from "@raycast/api";
import { Stock } from "../types";

function ViewStockAction(props: { stock: Stock }) {
  // load stock props to create chart
  const { stock } = props;
  const markdown = `
  # ${stock.ticker.name}

  ![](https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png)

  Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.
  `;

  return (
    <Detail
      markdown={markdown}
      navigationTitle={stock.ticker.ticker}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Name" text={stock.ticker.name} />
          <Detail.Metadata.Label title="Ticker" text={stock.ticker.ticker} />
          <Detail.Metadata.Separator />
          <Detail.Metadata.TagList title="Market">
            <Detail.Metadata.TagList.Item text={stock.ticker.market} color={"#f0f0f0"} />
            <Detail.Metadata.TagList.Item text={stock.ticker.locale} color={"#f0f0f0"} />
          </Detail.Metadata.TagList>
          <Detail.Metadata.TagList title="Currency">
            <Detail.Metadata.TagList.Item text={stock.ticker.currencyName} color={"#f0f0f0"} />
          </Detail.Metadata.TagList>
        </Detail.Metadata>
      }
    />
  );
}

export default ViewStockAction;
