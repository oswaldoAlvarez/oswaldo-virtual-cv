export const fallbackLng = "en";

export const languages = ["en", "es"] as const;

export type AppLanguage = (typeof languages)[number];

export const cookieName = "i18next";

export function isSupportedLanguage(value: string): value is AppLanguage {
  return languages.includes(value as AppLanguage);
}
