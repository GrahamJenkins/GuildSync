import 'dotenv/config';
import { startBot, client } from './auth/DiscordAuth';
import { registerSyncListener } from './syncListener';
import logger from './utils/logger';

(async () => {
  try {
    console.log('--- GuildSync Startup Configuration ---');
    console.log('LLM_BASE_URL:', process.env.LLM_BASE_URL || 'NOT SET');
    console.log('LLM_MODEL:', process.env.LLM_MODEL || 'NOT SET');
    console.log('LLM_API_KEY:', process.env.LLM_API_KEY ? 'SET' : 'NOT SET');
    console.log('---------------------------------------');

    await startBot();
    registerSyncListener(client);
  } catch (error) {
    logger.error('Bot failed to start: %s', error);
    process.exit(1);
  }
})();
