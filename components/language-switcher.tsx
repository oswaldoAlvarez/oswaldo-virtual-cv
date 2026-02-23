"use client";

import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { type AppLanguage, languages } from "@/i18n/settings";

type LanguageSwitcherProps = {
  currentLanguage: AppLanguage;
};

export function buildLanguagePath(pathname: string, targetLanguage: AppLanguage) {
  const segments = pathname.split("/");

  if (segments.length > 1 && languages.includes(segments[1] as AppLanguage)) {
    segments[1] = targetLanguage;
    return segments.join("/") || `/${targetLanguage}`;
  }

  return `/${targetLanguage}${pathname}`;
}

export function LanguageSwitcher({ currentLanguage }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const nextLanguage = currentLanguage === "es" ? "en" : "es";
  const href = buildLanguagePath(pathname, nextLanguage);
  const label = currentLanguage === "es" ? "English" : "Español";

  return (
    <ButtonLink href={href} size="md" variant="secondary">
      {label}
    </ButtonLink>
  );
}
