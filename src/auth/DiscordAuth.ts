import { Client, GatewayIntentBits } from 'discord.js';
import type { CloseEvent } from 'ws';
import logger from '../utils/logger';
let botClientId: string | null = null;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

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

client.once('ready', () => {
  logger.info('Discord bot logged in as %s', client.user?.tag);
  console.log(`[INFO] Bot logged in as ${client.user?.tag}`);
  botClientId = client.user?.id ?? null;
});


client.on('warn', (info) => {
  console.warn('[WARN EVENT]', info);
});

client.on('error', (error) => {
  console.error('[ERROR EVENT]', error);
});

client.on('error', (error: Error) => {
  logger.error('Discord client error: %s', error);
});

client.on('shardDisconnect', (event: any, shardId: number) => {
  logger.warn('Discord shard %d disconnected: %o', shardId, event);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // Add future slash command handlers here
});

/**
 * TEMPORARY: Register /hello slash command for a specific guild
 * Replace 'YOUR_GUILD_ID_HERE' with your guild ID after running the debug command
 */
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

  const rest = new REST({ version: '10' }).setToken(token);

  try {
    console.log(`Registering ${commands.length} commands for guild ${guildId}...`);
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      {
        body: commands.map(cmd => ('toJSON' in cmd ? cmd.toJSON() : cmd)),
      }
    );
    console.log(`Commands registered for guild ${guildId}.`);
    registeredGuilds.add(guildId);
  } catch (error) {
    console.error(`Failed to register commands for guild ${guildId}:`, error);
  }
}

// TEMPORARY: Auto-register /hello command on any message received (DISABLED)
// client.on('messageCreate', (message) => {
//   if (message.author.bot) return;
//   const guildId = message.guild?.id;
//   if (!guildId) return;
//   if (registeredGuilds.has(guildId)) return;
//   if (!botClientId) return;
//   registerHelloCommand(guildId, botClientId);
// });

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
