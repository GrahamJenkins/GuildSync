import { Client, Message } from 'discord.js';
import { isBotMessage, fetchSyncGroupId, getLinkedChannelsWithMetadata, syncMessageToChannels } from '../utils/syncUtils';
import { translationService } from '../services/TranslationService';

type ChannelInfo = {
  id: string;
  language: string;
};

/**
 * Register the message sync event listener on the Discord client.
 * @param client Discord.js Client instance
 */
export function registerSyncMessageListener(client: Client): void {
  client.on('messageCreate', async (message: Message) => {
    try {
      if (isBotMessage(message)) return;

      const syncGroupId = await fetchSyncGroupId(message.channel.id);
      if (!syncGroupId) return;

      const allChannels: ChannelInfo[] = await getLinkedChannelsWithMetadata(syncGroupId);

      const sourceChannel = allChannels.find(c => c.id === message.channel.id);
      const sourceLang = sourceChannel?.language ?? 'en';

      const destinationChannels = allChannels.filter(c => c.id !== message.channel.id);

      // Group destination channels by language
      const langGroups: Record<string, string[]> = {};
      for (const channel of destinationChannels) {
        if (!langGroups[channel.language]) langGroups[channel.language] = [];
        langGroups[channel.language].push(channel.id);
      }

      const translationsCache: Record<string, string> = {};

      for (const [lang, channelIds] of Object.entries(langGroups)) {
        if (lang === sourceLang) {
          // Same language, forward original message
          await syncMessageToChannels(message.client, message, channelIds);
        } else {
          // Different language, translate once then forward
          if (!translationsCache[lang]) {
            translationsCache[lang] = await translationService.translate(message.content, lang);
          }
          // Clone the message with translated content
          const translatedMessage = { ...message, content: translationsCache[lang] } as Message;
          await syncMessageToChannels(message.client, translatedMessage, channelIds);
        }
      }

      console.log(`[Sync] Synced message from channel ${message.channel.id} to channels grouped by language.`);
    } catch (error) {
      console.error('[Sync] Error syncing message:', error);
    }
  });
}