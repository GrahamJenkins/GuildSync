import { LANGUAGES } from './languages';

export const LANGUAGE_CHOICES = LANGUAGES.map(({ nativeName, code }) => ({
  name: nativeName,
  value: code,
}));