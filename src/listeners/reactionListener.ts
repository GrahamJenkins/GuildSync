import { Client } from 'discord.js';
import { translationService } from '../services/TranslationService';
import { LANGUAGES } from '../utils/languages';

const emojiToLang: Record<string, string> = LANGUAGES.reduce((acc, { emoji, code }) => {
  acc[emoji] = code;
  return acc;
}, {} as Record<string, string>);

export function registerReactionListener(client: Client): void {
  client.on('messageReactionAdd', async (reaction, user) => {
    try {
      console.log('[Debug] Reaction added:', reaction.emoji.name, 'by user:', user.id);
      if (user.bot) {
        console.log('[Debug] Ignored bot reaction');
        return; // Ignore bot reactions
      }
      const message = reaction.message;

      // Only handle reactions in guild text channels
      if (!message.guild) {
        console.log('[Debug] Reaction not in guild');
        return;
      }
      if (message.channel.type !== 0) {
        console.log('[Debug] Reaction not in text channel');
        return;
      }

      const emoji = reaction.emoji.name;
      if (!emoji) {
        console.log('[Debug] No emoji name found');
        return;
      }
      if (!(emoji in emojiToLang)) {
        console.log('[Debug] Emoji not in emojiToLang map:', emoji);
        return;
      }

      const targetLang = emojiToLang[emoji];
      if (!targetLang) {
        console.log('[Debug] No target language found for emoji:', emoji);
        return;
      }

      // Fetch message content
      const originalContent = message.content;
      if (!originalContent) {
        console.log('[Debug] No original message content');
        return;
      }

      // Translate message content
      const translatedText = await translationService.translate(originalContent, targetLang);
      console.log('[Debug] Translated text:', translatedText);

      // Send public reply with translation
      await message.reply(translatedText);
    } catch (error) {
      console.error('Error handling reaction translation:', error);
    }
  });
}