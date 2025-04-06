import 'dotenv/config';
import { startBot } from './auth/DiscordAuth';
import logger from './utils/logger';

(async () => {
  try {
    await startBot();
  } catch (error) {
    logger.error('Bot failed to start: %s', error);
    process.exit(1);
  }
})();
