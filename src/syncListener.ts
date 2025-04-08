import { Client, Message } from 'discord.js';
import { isBotMessage, fetchSyncGroupId, getLinkedChannels, filterOutOriginChannel, syncMessageToChannels } from './utils/syncUtils';

/**
 * Register the message sync event listener on the Discord client.
 * @param client Discord.js Client instance
 */
export function registerSyncListener(client: Client): void {
  client.on('messageCreate', async (message: Message) => {
    try {
      if (isBotMessage(message)) return;

      const syncGroupId = await fetchSyncGroupId(message.channel.id);
      if (!syncGroupId) return;

      const allChannelIds = await getLinkedChannels(syncGroupId);
      const targetChannelIds = filterOutOriginChannel(allChannelIds, message.channel.id);

      await syncMessageToChannels(message, targetChannelIds);
      console.log(`[Sync] Synced message from channel ${message.channel.id} to channels: ${targetChannelIds.join(', ')}`);
    } catch (error) {
      console.error('[Sync] Error syncing message:', error);
    }
  });
}