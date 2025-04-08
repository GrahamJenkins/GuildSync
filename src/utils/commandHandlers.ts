import { ChatInputCommandInteraction, GuildMember } from 'discord.js';
import * as utils from './guildUtils';

/**
 * Returns information about GuildSync.
 */
export function getAboutMessage() {
  return (
    "**GuildSync** is a free, open-source, self-hostable Discord bot " +
    "designed to break down language barriers in global gaming communities. " +
    "It enables seamless, real-time multilingual communication and cross-server collaboration."
  );
}

export async function handleAbout(interaction: ChatInputCommandInteraction) {
  await interaction.reply(getAboutMessage());
}

export async function handleCreate(interaction: ChatInputCommandInteraction) {
  try {
    const userId = interaction.user.id;
    const username = interaction.user.tag;
    const guild = interaction.guild;

    const targetChannel = interaction.options.getChannel('channel') ?? interaction.channel;

    if (!targetChannel || !guild) {
      await interaction.reply('Error: Could not determine target channel or guild.');
      return;
    }

    await utils.upsertUser(userId, username);
    await utils.upsertGuild(guild.id, guild.name, guild.iconURL());

    const syncGroup = await utils.createSyncGroup(userId);
    const language = interaction.options.getString('language') ?? 'en';

    await utils.linkChannelToGroup(
      targetChannel.id,
      guild.id,
      syncGroup.id,
      ('name' in targetChannel ? (targetChannel as any).name : 'Unnamed Channel'),
      userId,
      username,
      language
    );

    await interaction.reply(
      `Created new sync group and linked channel <#${targetChannel.id}>!\n` +
      `**Group code:** \`${syncGroup.id}\`\n\n` +
      `To link another channel, use:\n` +
      `\`/guildsync action:join group_code:${syncGroup.id}\``
    );
  } catch (error) {
    console.error('Error creating sync group:', error);
    await interaction.reply('Failed to create sync group.');
  }
}

export async function handleJoin(interaction: ChatInputCommandInteraction, groupCode: string) {
  try {
    const userId = interaction.user.id;
    const username = interaction.user.tag;
    const guild = interaction.guild;

    const targetChannel = interaction.options.getChannel('channel') ?? interaction.channel;

    if (!targetChannel || !guild) {
      await interaction.reply('Error: Could not determine target channel or guild.');
      return;
    }

    await utils.upsertUser(userId, username);
    await utils.upsertGuild(guild.id, guild.name, guild.iconURL());

    const language = interaction.options.getString('language') ?? 'en';

    await utils.linkChannelToGroup(
      targetChannel.id,
      guild.id,
      groupCode,
      ('name' in targetChannel ? (targetChannel as any).name : 'Unnamed Channel'),
      userId,
      username,
      language
    );

    await interaction.reply(`Linked channel <#${targetChannel.id}> to sync group \`${groupCode}\`!`);
  } catch (error) {
    console.error('Error joining sync group:', error);
    await interaction.reply('Failed to join sync group.');
  }
}