import 'dotenv/config';
import { startBot, client } from './auth/DiscordAuth';
import { registerSyncListener } from './syncListener';
import logger from './utils/logger';

(async () => {
  try {
    await startBot();
    registerSyncListener(client);
  } catch (error) {
    logger.error('Bot failed to start: %s', error);
    process.exit(1);
  }
})();
