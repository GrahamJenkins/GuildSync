export interface Language {
  emoji: string;
  code: string;
  nativeName: string;
}

export const LANGUAGES: Language[] = [
  { emoji: "🇨🇳", code: "zh", nativeName: "中文" }, // Chinese (Mandarin)
  { emoji: "🇪🇸", code: "es", nativeName: "Español" }, // Spanish
  { emoji: "🇺🇸", code: "en", nativeName: "English" }, // English (US)
  { emoji: "🇮🇳", code: "hi", nativeName: "हिन्दी" }, // Hindi
  { emoji: "🇸🇦", code: "ar", nativeName: "العربية" }, // Arabic
  { emoji: "🇧🇩", code: "bn", nativeName: "বাংলা" }, // Bengali
  { emoji: "🇵🇹", code: "pt", nativeName: "Português" }, // Portuguese
  { emoji: "🇷🇺", code: "ru", nativeName: "Русский" }, // Russian
  { emoji: "🇯🇵", code: "ja", nativeName: "日本語" }, // Japanese
  { emoji: "🇵🇰", code: "ur", nativeName: "اردو" }, // Urdu
  { emoji: "🇮🇩", code: "id", nativeName: "Bahasa Indonesia" }, // Indonesian
  { emoji: "🇫🇷", code: "fr", nativeName: "Français" }, // French
  { emoji: "🇩🇪", code: "de", nativeName: "Deutsch" }, // German
  { emoji: "🇻🇳", code: "vi", nativeName: "Tiếng Việt" }, // Vietnamese
  { emoji: "🇹🇭", code: "th", nativeName: "ไทย" }, // Thai
  { emoji: "🇹🇷", code: "tr", nativeName: "Türkçe" }, // Turkish
  { emoji: "🇰🇷", code: "ko", nativeName: "한국어" }, // Korean
  { emoji: "🇮🇹", code: "it", nativeName: "Italiano" }, // Italian
  { emoji: "🇵🇱", code: "pl", nativeName: "Polski" }, // Polish
  { emoji: "🇺🇦", code: "uk", nativeName: "Українська" }, // Ukrainian
  { emoji: "🇮🇷", code: "fa", nativeName: "فارسی" }, // Persian (Farsi)
  { emoji: "🇲🇾", code: "ms", nativeName: "Bahasa Melayu" }, // Malay
  { emoji: "🇳🇱", code: "nl", nativeName: "Nederlands" }, // Dutch
  { emoji: "🇬🇷", code: "el", nativeName: "Ελληνικά" }, // Greek
  { emoji: "🇨🇿", code: "cs", nativeName: "Čeština" }, // Czech
];