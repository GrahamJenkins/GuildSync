import { Message, GuildMember, TextChannel, WebhookClient, ChannelType, GuildTextBasedChannel } from 'discord.js';
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
const webhookCache: Record<string, WebhookClient> = {};

export async function syncMessageToChannels(client: import('discord.js').Client, message: Message, targetChannelIds: string[]): Promise<void> {
  console.debug('[Sync Debug] message.member:', {
    nickname: message.member?.nickname,
    userId: message.member?.user.id,
  });
  console.debug('[Sync Debug] message.author:', {
    username: message.author.username,
    discriminator: message.author.discriminator,
    id: message.author.id,
    avatar: message.author.displayAvatarURL(),
  });

  let senderName: string = message.author.username;
  try {
    if (message.guild) {
      const member = await message.guild.members.fetch(message.author.id);
      senderName = member.nickname ?? member.user.username;
      console.debug('[Sync Debug] fetched member:', {
        nickname: member.nickname,
        username: member.user.username,
      });
    } else {
      senderName = message.author.username;
    }
  } catch (fetchErr) {
  console.debug('[Sync Debug] final senderName:', senderName);
    console.warn('[Sync Debug] Failed to fetch member, attempting to fetch user profile:', fetchErr);
    try {
      const user = await message.client.users.fetch(message.author.id);
      senderName = user.username;
      console.debug('[Sync Debug] fetched user profile:', {
        username: user.username,
        id: user.id,
      });
    } catch (userFetchErr) {
      console.warn('[Sync Debug] Failed to fetch user profile, falling back to cached author username:', userFetchErr);
      senderName = message.author.username;
    }
  }

  const senderAvatar = message.author.displayAvatarURL();

  for (const channelId of targetChannelIds) {
    try {
      const channel = await client.channels.fetch(channelId);

      if (!channel || !channel.isTextBased() || channel.type !== ChannelType.GuildText) {
        continue;
      }

      const textChannel = channel as TextChannel;

      let webhookClient: WebhookClient | null = null;

      try {
        webhookClient = await getOrCreateWebhook(textChannel);
        await webhookClient.send({
          content: message.content,
          username: senderName,
          avatarURL: senderAvatar,
          embeds: message.embeds,
          files: message.attachments.map((a) => a),
        });
        console.log(`[Sync] Synced message via webhook to channel ${channelId}`);
      } catch (webhookError) {
        console.warn(`[Sync] Webhook failed for channel ${channelId}, falling back. Reason:`, webhookError);

        // Remove cached webhook so it can be recreated next time
        delete webhookCache[channelId];

        // Fallback: send as bot with sender prefix
        await textChannel.send({
          content: `**[${senderName}]** ${message.content}`,
          embeds: message.embeds,
          files: message.attachments.map((a) => a),
        });
        console.log(`[Sync] Synced message via fallback to channel ${channelId}`);
      }
    } catch (error) {
      console.error(`[Sync] Failed to sync message to channel ${channelId}:`, error);
    }
  }
}

async function getOrCreateWebhook(channel: TextChannel): Promise<WebhookClient> {
  if (webhookCache[channel.id]) {
    return webhookCache[channel.id];
  }

  const webhooks = await channel.fetchWebhooks();
  let webhook = webhooks.find((wh) => wh.owner && wh.owner.id === channel.client.user?.id);

  if (!webhook) {
    webhook = await channel.createWebhook({
      name: 'GuildSync Proxy',
      reason: 'Sync messages as original sender',
    });
  }

  const webhookClient = new WebhookClient({ id: webhook.id, token: webhook.token! });
  webhookCache[channel.id] = webhookClient;
  return webhookClient;
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