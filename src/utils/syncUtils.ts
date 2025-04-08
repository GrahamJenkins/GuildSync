import { Message, GuildMember, TextChannel } from 'discord.js';
import { prisma } from '../prismaClient';

/**
 * Check if a message was sent by the bot itself.
 */
export function isBotMessage(message: Message): boolean {
  return message.author.bot;
}

/**
 * Fetch the sync group ID linked to a channel.
 * @param channelId Discord channel ID
 * @returns sync group ID string or null if not linked
 */
export async function fetchSyncGroupId(channelId: string): Promise<string | null> {
  const discordId = BigInt(channelId);
  const link = await prisma.groupChannel.findFirst({
    where: { discord_id: discordId },
    select: { sync_group_id: true },
  });
  return link ? link.sync_group_id : null;
}

/**
 * Fetch all channel IDs linked to a sync group.
 * @param syncGroupId Sync group ID
 * @returns Array of channel IDs
 */
export async function getLinkedChannels(syncGroupId: string): Promise<string[]> {
  const links = await prisma.groupChannel.findMany({
    where: { sync_group_id: syncGroupId },
    select: { discord_id: true },
  });
  const channelIds = links.map((l: { discord_id: bigint }) => l.discord_id.toString());
  return channelIds;
}

/**
 * Filter out the origin channel from a list of channel IDs.
 */
export function filterOutOriginChannel(channelIds: string[], originChannelId: string): string[] {
  return channelIds.filter((id) => id !== originChannelId);
}

/**
 * Sync a message to multiple target channels.
 * @param message The original Discord message
 * @param targetChannelIds Array of channel IDs to sync to
 */
export async function syncMessageToChannels(client: import('discord.js').Client, message: Message, targetChannelIds: string[]): Promise<void> {
  for (const channelId of targetChannelIds) {
    try {
      const channel = await client.channels.fetch(channelId);
      if (channel && channel.isTextBased()) {
        await (channel as TextChannel).send({
          content: message.content,
          embeds: message.embeds,
          files: message.attachments.map((a) => a),
        });
        console.log(`[Sync] Synced message to channel ${channelId}`);
      }
    } catch (error) {
      console.error(`[Sync] Failed to sync message to channel ${channelId}:`, error);
    }
  }
}

/**
 * Fetch linked channels with metadata including language.
 * Placeholder implementation: replace with actual DB/config fetch.
 */

export async function getLinkedChannelsWithMetadata(syncGroupId: string): Promise<{ id: string; language: string }[]> {
  const channels = await prisma.groupChannel.findMany({
    where: { sync_group_id: syncGroupId },
    select: {
      discord_id: true,
      language_code: true,
    },
  });

  return channels.map((channel) => ({
    id: channel.discord_id.toString(),
    language: channel.language_code || 'en',
  }));
}

/**
 * Check if a guild member has admin permissions.
 */
export function hasAdminPermission(member: GuildMember): boolean {
  return member.permissions.has('Administrator');
}