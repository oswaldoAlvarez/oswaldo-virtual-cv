"use client";

type ThemeMode = "dark" | "light";

const STORAGE_KEY = "portfolio-theme";

function applyTheme(theme: ThemeMode) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

export function ThemeSwitcher() {
  const toggleTheme = () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const nextTheme: ThemeMode = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-switch"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <span aria-hidden="true" className="theme-switch-thumb">
        <span className="theme-icon theme-icon-sun">☀</span>
        <span className="theme-icon theme-icon-moon">☾</span>
      </span>
    </button>
  );
}
