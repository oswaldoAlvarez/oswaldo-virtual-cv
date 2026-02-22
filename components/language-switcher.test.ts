import { describe, expect, it } from "vitest";
import { buildLanguagePath } from "@/components/language-switcher";

describe("buildLanguagePath", () => {
  it("replaces current language segment", () => {
    expect(buildLanguagePath("/en/projects", "es")).toBe("/es/projects");
  });

  it("prepends language when path has no language segment", () => {
    expect(buildLanguagePath("/projects", "en")).toBe("/en/projects");
  });

  it("keeps root path valid", () => {
    expect(buildLanguagePath("/", "es")).toBe("/es/");
  });
});
