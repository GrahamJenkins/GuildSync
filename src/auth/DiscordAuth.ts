import { Client, GatewayIntentBits } from 'discord.js';
import type { CloseEvent } from 'ws';
import logger from '../utils/logger';

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
});

client.on('error', (error: Error) => {
  logger.error('Discord client error: %s', error);
});

client.on('shardDisconnect', (event: any, shardId: number) => {
  logger.warn('Discord shard %d disconnected: %o', shardId, event);
});