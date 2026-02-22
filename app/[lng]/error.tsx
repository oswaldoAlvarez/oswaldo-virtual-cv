"use client";

import { usePathname } from "next/navigation";
import type { AppLanguage } from "@/i18n/settings";
import commonEn from "@/locales/en/common.json";
import commonEs from "@/locales/es/common.json";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

function getLanguageFromPath(pathname: string): AppLanguage {
  const firstSegment = pathname.split("/")[1];
  return firstSegment === "es" ? "es" : "en";
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  const pathname = usePathname();
  const language = getLanguageFromPath(pathname);
  const copy = language === "es" ? commonEs : commonEn;

  return (
    <div className="portfolio-bg min-h-screen text-slate-100">
      <main className="mx-auto flex w-full max-w-6xl flex-col px-6 py-14 sm:px-10">
        <div className="portfolio-card rounded-2xl p-8">
          <h1 className="mb-3 text-2xl font-bold">{copy.errorTitle}</h1>
          <p className="mb-5 text-sm text-slate-300">{copy.errorDescription}</p>
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            {copy.retry}
          </button>
        </div>
      </main>
    </div>
  );
}
