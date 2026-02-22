import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { ThemeSwitcher } from "@/components/theme-switcher";

describe("ThemeSwitcher", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.setAttribute("data-theme", "dark");
  });

  it("renders toggle button", () => {
    render(<ThemeSwitcher />);

    expect(screen.getByRole("button", { name: "Toggle theme" })).toBeInTheDocument();
  });

  it("toggles theme and persists value", () => {
    render(<ThemeSwitcher />);
    const button = screen.getByRole("button", { name: "Toggle theme" });

    fireEvent.click(button);

    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(localStorage.getItem("portfolio-theme")).toBe("light");
  });
});
