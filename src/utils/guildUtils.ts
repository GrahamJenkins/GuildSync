import { Guild } from 'discord.js';
import { prisma } from '../prismaClient';
import { randomUUID } from 'crypto';

/**
 * Upsert guild info into the database.
 * No permission checks are performed.
 * 
 * @param guild Discord Guild object
 * @param adminUserId Optional admin user ID (string)
 * @returns The upserted Guild record
 */
export async function updateGuild(guild: Guild, adminUserId?: string) {
  const now = new Date();

  console.log('Upserting guild:', guild.id, guild.name);
  const result = await prisma.guild.upsert({
    where: { id: BigInt(guild.id) },
    update: {
    },
    create: {
      id: BigInt(guild.id),
      name: guild.name,
      icon: guild.iconURL() ?? '',
    },
  });

  return result;
}

/**
 * Create a new sync group (bridge ID).
 * @param createdBy Discord user ID of the admin creating the group
 * @returns The created SyncGroup record
 */
export async function createSyncGroup(createdBy: string) {
  const now = new Date();

  console.log('Creating sync group by user:', createdBy);
  const syncGroup = await prisma.syncGroup.create({
    data: {
      createdBy: {
        connect: { id: BigInt(createdBy) },
      },
      created_at: now,
      name: 'Unnamed Group',
      description: '',
    },
  });

  return syncGroup;
}

/**
 * Upsert a Discord user into the database.
 * @param userId Discord user ID (string)
 * @param username Discord username (string)
 * @returns The upserted User record
 */
export async function upsertUser(userId: string, username: string) {
  console.log('Upserting user:', userId, username);
  const user = await prisma.user.upsert({
    where: { id: BigInt(userId) },
    update: {
      username,
    },
    create: {
      id: BigInt(userId),
      username,
      avatar: '',
    },
  });

  return user;
}

/**
 * Upsert a Discord guild into the database.
 * @param guildId Discord guild ID (string)
 * @param name Guild name (string)
 * @param iconUrl Guild icon URL (string or null)
 * @returns The upserted Guild record
 */
export async function upsertGuild(guildId: string, name: string, iconUrl: string | null) {
  console.log('Upserting guild:', guildId, name, iconUrl);
  const guild = await prisma.guild.upsert({
    where: { id: BigInt(guildId) },
    update: {
      name,
      icon: iconUrl ?? '',
    },
    create: {
      id: BigInt(guildId),
      name,
      icon: iconUrl ?? '',
    },
  });

  return guild;
}

/**
 * Link a Discord channel to a sync group.
 * @param channelId Discord channel ID (string)
 * @param guildId Discord guild/server ID (string)
 * @param syncGroupId Sync group UUID (string)
 * @param channelName Channel name (string)
 * @param addedByUserId Discord user ID of the admin linking (string)
 * @param addedByUsername Discord username of the admin linking (string)
 * @returns The created ChannelLink record
 */
export async function linkChannelToGroup(
  channelId: string,
  guildId: string,
  syncGroupId: string,
  channelName: string,
  addedByUserId: string,
  addedByUsername: string,
  language: string
) {
  const now = new Date();

  const link = await prisma.groupChannel.create({
    data: {
      discord_id: BigInt(channelId),
      guild_id: BigInt(guildId),
      sync_group_id: syncGroupId,
      name: channelName,
      rate_limit: 0,
      language_code: language,
      status: 'accepted',
      added_by_user_id: BigInt(addedByUserId),
      added_by_username: addedByUsername,
      created_at: now,
    }
  });
  console.log('Creating group channel link:', link);













  return link;
}