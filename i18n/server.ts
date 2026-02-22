import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { fallbackLng, isSupportedLanguage, languages } from "@/i18n/settings";

type Namespace = string | readonly string[];

export async function initI18next(language: string, ns: Namespace) {
  const lng = isSupportedLanguage(language) ? language : fallbackLng;
  const i18nInstance = createInstance();

  await i18nInstance
    .use(
      resourcesToBackend((lngValue: string, nsValue: string) => {
        return import(`@/locales/${lngValue}/${nsValue}.json`);
      }),
    )
    .init({
      lng,
      fallbackLng,
      supportedLngs: [...languages],
      defaultNS: "landing",
      fallbackNS: "common",
      ns,
      interpolation: {
        escapeValue: false,
      },
    });

  return i18nInstance;
}

export async function getTranslation(language: string, ns: Namespace) {
  const i18nInstance = await initI18next(language, ns);
  const fixedLanguage = isSupportedLanguage(language) ? language : fallbackLng;

  return {
    i18n: i18nInstance,
    t: i18nInstance.getFixedT(fixedLanguage),
  };
}
