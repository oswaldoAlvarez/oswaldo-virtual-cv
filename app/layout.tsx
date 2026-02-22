import type { Metadata } from "next";
import { cookies } from "next/headers";
import { cookieName, fallbackLng, isSupportedLanguage } from "@/i18n/settings";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nova Landing",
  description: "Landing page with i18next multilingual support",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const languageFromCookie = cookieStore.get(cookieName)?.value;
  const htmlLang =
    languageFromCookie && isSupportedLanguage(languageFromCookie)
      ? languageFromCookie
      : fallbackLng;

  return (
    <html lang={htmlLang} data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem("portfolio-theme");
                if (theme === "light" || theme === "dark") {
                  document.documentElement.setAttribute("data-theme", theme);
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
