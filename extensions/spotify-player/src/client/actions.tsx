import { closeMainWindow, showToast, ActionPanel, Toast } from "@raycast/api";
import { playSong } from "./spotify-applescript";

export function PlayAction(props: { itemURI: string }) {
  async function handleAction() {
    try {
      await closeMainWindow();
      await playSong(props.itemURI);
    } catch (error: any) {
      showToast(Toast.Style.Failure, "Failed playing song", error instanceof Error ? error.message : error.toString());
    }
  }

  return (
    <ActionPanel.Item
      title="Play"
      icon={{ source: { light: "play-light.png", dark: "play-dark.png" } }}
      onAction={handleAction}
    />
  );
}
