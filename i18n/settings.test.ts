import { describe, expect, it } from "vitest";
import { fallbackLng, isSupportedLanguage, languages } from "@/i18n/settings";

describe("i18n settings", () => {
  it("has expected fallback language", () => {
    expect(fallbackLng).toBe("en");
  });

  it("includes supported languages", () => {
    expect(languages).toEqual(["en", "es"]);
  });

  it("validates supported languages", () => {
    expect(isSupportedLanguage("en")).toBe(true);
    expect(isSupportedLanguage("es")).toBe(true);
    expect(isSupportedLanguage("fr")).toBe(false);
  });
});
