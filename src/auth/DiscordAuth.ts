import { Client, GatewayIntentBits } from 'discord.js';
import type { CloseEvent } from 'ws';
import logger from '../utils/logger';
let botClientId: string | null = null;

const client: Client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

/**
 * Singleton Discord client instance used throughout the app.
 */
export { client };

/**
 * Starts the Discord bot by logging in and setting up event listeners.
 */
export async function startBot(): Promise<void> {
  const token = process.env.DISCORD_TOKEN;
  if (!token) {
    logger.error('DISCORD_TOKEN is not set in environment variables.');
    throw new Error('Missing Discord bot token');
  }

  try {
    logger.info('Attempting to log in to Discord...');
    await client.login(token);
  } catch (error) {
    logger.error('Failed to login to Discord: %s', error);
    throw error;
  }
}

client.once('ready', async () => {
  logger.info('Discord bot logged in as %s', client.user?.tag);
  console.log(`[INFO] Bot logged in as ${client.user?.tag}`);
  botClientId = client.user?.id ?? null;

  const devGuildId = process.env.DEV_GUILD_ID;
  if (devGuildId && botClientId) {
    console.log(`[INFO] Registering slash commands for dev guild ${devGuildId}...`);
    try {
      await registerGuildSyncCommands(devGuildId);
      console.log(`[INFO] Slash commands registered for dev guild ${devGuildId}.`);
    } catch (error) {
      console.error(`[ERROR] Failed to register commands for dev guild ${devGuildId}:`, error);
    }
  }
});


client.on('warn', (info: string | unknown) => {
  console.warn('[WARN EVENT]', info);
});

client.on('error', (error: Error | unknown) => {
  console.error('[ERROR EVENT]', error);
});

client.on('error', (error: Error) => {
  logger.error('Discord client error: %s', error);
});

client.on('shardDisconnect', (event: any, shardId: number) => {
  logger.warn('Discord shard %d disconnected: %o', shardId, event);
});

import type { Interaction } from 'discord.js';

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'guildsync' || interaction.commandName === 'gs') {
    const { handleCreate, handleJoin, handleAbout, getAboutMessage } = await import('../utils/commandHandlers');

    const action = interaction.options.getString('action');
    const groupCode = interaction.options.getString('group_code');

    const member = interaction.member;
    let isAdmin = false;
    if (member && 'permissions' in member) {
      const perms = member.permissions;
      if (typeof perms !== 'string' && perms.has('Administrator')) {
        isAdmin = true;
      }
    }

    if (!isAdmin) {
      await handleAbout(interaction);
      return;
    }

    if (action === 'about') {
      await handleAbout(interaction);
      return;
    }

    if (action === 'create') {
      await handleCreate(interaction);
    } else if (action === 'join') {
      if (!groupCode) {
        await interaction.reply('Please provide a sync group code to join.');
      } else {
        await handleJoin(interaction, groupCode);
      }
    } else {
      await interaction.reply('Unknown action. Please specify "create", "join", or "about".');
    }
  }
});

import { REST, Routes, SlashCommandBuilder } from 'discord.js';

const registeredGuilds = new Set<string>();

/**
 * Register multiple slash commands for a specific guild
 * @param guildId Guild/server ID
 * @param clientId Bot application/client ID
 * @param commands Array of SlashCommandBuilder instances or JSON command data
 */
export async function registerGuildCommands(
  guildId: string,
  clientId: string,
  commands: any[]
) {
  const token = process.env.DISCORD_TOKEN;

  if (!token || !clientId || !guildId) {
    console.warn('Skipping command registration. Missing token, clientId, or guildId.');
    return;
  }
/**
 * Discord bot authentication and command registration module.
 *
 * - Exports a singleton Discord `client` instance.
 * - Provides `startBot()` to login and initialize the bot.
 * - Handles slash command registration and event listeners.
 * - Used as the main entry point for bot startup.
 */


  const rest = new REST({ version: '10' }).setToken(token);

  try {
    console.log(`Registering ${commands.length} commands for guild ${guildId}...`);
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      {
        body: commands.map(cmd => ('toJSON' in cmd ? cmd.toJSON() : cmd)),
      }
    );
    registeredGuilds.add(guildId);
  } catch (error) {
    console.error(`Failed to register commands for guild ${guildId}:`, error);
  }
}

/**
 * Unregister multiple slash commands by name for a specific guild
 * @param guildId Guild/server ID
 * @param clientId Bot application/client ID
 * @param commandNames Array of command names to delete
 */
export async function unregisterGuildCommands(
  guildId: string,
  clientId: string,
  commandNames: string[]
) {
  const token = process.env.DISCORD_TOKEN;
  if (!token || !clientId || !guildId) {
    console.warn('Skipping command unregister. Missing token, clientId, or guildId.');
    return;
  }

  const rest = new REST({ version: '10' }).setToken(token);

  try {
    console.log(`Fetching commands for guild ${guildId}...`);
  } catch (error) {
    console.error(`Failed to delete commands from guild ${guildId}:`, error);
  }
}

/**
 * Register /guildsync and /gs commands for a guild.
 */
export async function registerGuildSyncCommands(guildId: string) {
  if (!botClientId) {
    console.warn('Bot client ID not available yet.');
    return;
  }

  const commands = [
    (() => {
      const builder = new SlashCommandBuilder()
        .setName('guildsync')
        .setDescription('GuildSync command (multi-purpose)');

      builder.addStringOption(option =>
        option
          .setName('action')
          .setDescription('Action to perform')
          .setRequired(true)
          .addChoices(
            { name: 'create', value: 'create' },
            { name: 'join', value: 'join' },
            { name: 'about', value: 'about' }
          )
      );

      builder.addStringOption(option =>
        option
          .setName('group_code')
          .setDescription('Sync group code (required for join)')
          .setRequired(false)
      );

      builder.addChannelOption(option =>
        option
          .setName('channel')
          .setDescription('Target channel to link (optional)')
          .setRequired(false)
      );

      return builder;
    })(),
    (() => {
      const builder = new SlashCommandBuilder()
        .setName('gs')
        .setDescription('GuildSync command (alias)');

      builder.addStringOption(option =>
        option
          .setName('action')
          .setDescription('Action to perform')
          .setRequired(true)
          .addChoices(
            { name: 'create', value: 'create' },
            { name: 'join', value: 'join' },
            { name: 'about', value: 'about' }
          )
      );

      builder.addStringOption(option =>
        option
          .setName('group_code')
          .setDescription('Sync group code (required for join)')
          .setRequired(false)
      );

      builder.addChannelOption(option =>
        option
          .setName('channel')
          .setDescription('Target channel to link (optional)')
          .setRequired(false)
      );

      return builder;
    })(),
  ];

  await registerGuildCommands(guildId, botClientId, commands);
/**
 * Returns information about GuildSync.
 */
function getAboutMessage() {
  return (
    "**GuildSync** is a free, open-source, self-hostable Discord bot " +
    "designed to break down language barriers in global gaming communities. " +
    "It enables seamless, real-time multilingual communication and cross-server collaboration."
  );
}
}
