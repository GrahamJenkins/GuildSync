import 'dotenv/config';
import path from 'path';
import { startBot, client } from './auth/DiscordAuth';
import { registerSyncListener, registerReactionListener } from './syncListener';
import logger from './utils/logger';
import { exec } from 'child_process';
import util from 'util';

console.log('DATABASE_URL at startup:', process.env.DATABASE_URL);
console.log('Current working directory:', process.cwd());

let databaseUrl = process.env.DATABASE_URL;
if (databaseUrl && databaseUrl.startsWith('file:./')) {
  const relativePath = databaseUrl.slice(5);
  const absolutePath = path.resolve(process.cwd(), relativePath);
  databaseUrl = 'file://' + absolutePath;
  console.log('Resolved absolute DATABASE_URL:', databaseUrl);
}
if (!databaseUrl) {
  databaseUrl = "file://" + path.resolve(process.cwd(), 'db.sqlite');
}
process.env.DATABASE_URL = databaseUrl;

const gracefulShutdown = () => {
  console.log('Received shutdown signal, cleaning up...');
  client.destroy();
  process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

const execAsync = util.promisify(exec);

(async () => {
  try {
    console.log('--- GuildSync Startup Configuration ---');
    console.log('LLM_BASE_URL:', process.env.LLM_BASE_URL || 'NOT SET');
    console.log('LLM_MODEL:', process.env.LLM_MODEL || 'NOT SET');
    console.log('LLM_API_KEY:', process.env.LLM_API_KEY ? 'SET' : 'NOT SET');
    console.log('---------------------------------------');

    console.log('Running database migrations...');
    await execAsync('npx prisma migrate deploy');
    console.log('Database migrations completed successfully.');

    await startBot();
    console.log('Bot started successfully');
    registerSyncListener(client);
    console.log('Sync listener registered');
    registerReactionListener(client);
    console.log('Reaction listener registered');

  } catch (error) {
    logger.error('Bot failed to start: %s', error);
    process.exit(1);
  }
})();
