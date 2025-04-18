import { Client } from 'discord.js';
import { registerSyncMessageListener } from './listeners/syncMessageListener';
import { registerReactionListener } from './listeners/reactionListener';

export function registerSyncListener(client: Client): void {
  registerSyncMessageListener(client);
}

export { registerReactionListener };