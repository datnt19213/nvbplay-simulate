import { getGlobalKey } from "@/services/globals";
import { GlobalKeys } from "@/services/globals";
import Ably from "ably";
let ablyInstance: Ably.Realtime | null = null;
/**
 * Get the Ably instance, initializing it if necessary.
 * @returns {Ably.Realtime} The Ably instance
 */
export const getAblyInstance = (): Ably.Realtime => {
  if (!ablyInstance) {
    const apiKey = getGlobalKey(GlobalKeys.ABLY_KEY) || "";
    if (!apiKey) {
      console.warn(
        "Ably API key is missing in environment variables. Ably features will be disabled."
      );
      return {
        connection: { on: () => {} },
        channels: {
          get: () => ({
            subscribe: () => {},
            unsubscribe: () => {},
            publish: () => {},
          }),
        },
      } as any;
    }
    ablyInstance = new Ably.Realtime(apiKey);
  }
  if (ablyInstance && ablyInstance.connection) {
    ablyInstance.connection.on("connected", () => {
      console.log("Connected to Ably!");
    });
  }
  return ablyInstance;
};

/**
 * Get a specific Ably channel.
 * @param {string} channelName - The name of the channel to retrieve
 * @returns {Ably.Types.RealtimeChannelCallbacks} The Ably channel instance
 */
export const getAblyChannel = (channelName: string): Ably.RealtimeChannel => {
  const ably = getAblyInstance();
  return (ably as any).channels.get(channelName);
};
