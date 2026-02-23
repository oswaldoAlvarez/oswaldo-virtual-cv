"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { AppLanguage } from "@/i18n/settings";
import { Heading, Text } from "@/components/ui/typography";
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
        <Card as="div" className="p-8">
          <Heading as="h1" variant="section" className="mb-3">
            {copy.errorTitle}
          </Heading>
          <Text className="mb-5">{copy.errorDescription}</Text>
          <Button onClick={reset} size="md" variant="primary">
            {copy.retry}
          </Button>
        </Card>
      </main>
    </div>
  );
}
