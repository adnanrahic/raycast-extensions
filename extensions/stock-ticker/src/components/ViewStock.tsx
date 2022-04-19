import { Detail } from "@raycast/api";
import { Stock } from "../types";

const markdown = `
# Pikachu

![](https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png)

Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.
`;

function ViewStockAction(props: { stock: Stock }) {
  // load stock props to create chart

  return (
    <Detail
      markdown={markdown}
      navigationTitle="Pikachu"
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Height" text={`1' 04"`} />
          <Detail.Metadata.Label title="Weight" text="13.2 lbs" />
          <Detail.Metadata.TagList title="Type">
            <Detail.Metadata.TagList.Item text="Electric" color={"#eed535"} />
          </Detail.Metadata.TagList>
          <Detail.Metadata.Separator />
          <Detail.Metadata.Link
            title="Evolution"
            target="https://www.pokemon.com/us/pokedex/pikachu"
            text="Raichu"
          />
        </Detail.Metadata>
      }
    />
  );
}

export default ViewStockAction;
