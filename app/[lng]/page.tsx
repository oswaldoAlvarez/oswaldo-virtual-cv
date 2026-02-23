import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { getGithubProfile, getGithubProjects } from "@/lib/github";
import { getTranslation } from "@/i18n/server";
import { isSupportedLanguage, languages } from "@/i18n/settings";

type PageProps = {
  params: Promise<{ lng: string }>;
};

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
};

type SkillsItem = {
  label: string;
};

export function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lng } = await params;

  if (!isSupportedLanguage(lng)) {
    return {};
  }

  const [{ t }, profile] = await Promise.all([
    getTranslation(lng, ["landing"]),
    getGithubProfile(),
  ]);

  return {
    title: `${profile.name} | Virtual CV`,
    description: t("landing:aboutText"),
    openGraph: {
      title: profile.name,
      description: t("landing:aboutText"),
      images: [profile.avatarUrl],
    },
  };
}

export default async function Home({ params }: PageProps) {
  const { lng } = await params;

  if (!isSupportedLanguage(lng)) {
    notFound();
  }

  const [{ t }, profile, projects] = await Promise.all([
    getTranslation(lng, ["landing", "common"]),
    getGithubProfile(),
    getGithubProjects(),
  ]);
  const experienceData = t("landing:experience.items", {
    returnObjects: true,
  }) as unknown as ExperienceItem[];
  const skillsData = t("landing:skills.items", {
    returnObjects: true,
  }) as unknown as SkillsItem[];

  return (
    <div className="portfolio-bg min-h-screen text-slate-100">
      <main className="mx-auto flex w-full max-w-6xl flex-col px-6 py-14 sm:px-10">
        <header className="mb-16 flex items-center justify-end">
          <div className="flex flex-wrap items-center justify-end gap-3">
            <ButtonLink href="#projects" size="md" variant="secondary">
              {t("common:projects")}
            </ButtonLink>
            <ThemeSwitcher />
            <LanguageSwitcher currentLanguage={lng} />
          </div>
        </header>

        <Card
          as="section"
          radius="xl"
          size="lg"
          className="mb-16 grid gap-8 md:grid-cols-[1fr_240px] md:items-center"
        >
          <div>
            <Text
              as="span"
              variant="caption"
              className="portfolio-badge mb-3 inline-block rounded-full bg-emerald-500/20 px-3 py-1 font-semibold text-emerald-300"
            >
              {t("landing:badge")}
            </Text>
            <Heading as="h1" variant="hero" className="mb-4">
              {t("landing:title", { name: profile.name })}
            </Heading>
            <Heading as="h2" variant="card" className="mb-2 text-emerald-300">
              {t("landing:aboutTitle")}
            </Heading>
            <Text className="mb-6 max-w-2xl">{t("landing:aboutText")}</Text>
            <div className="flex flex-wrap gap-3">
              <ButtonLink
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                variant="primary"
              >
                {t("landing:githubCta")}
              </ButtonLink>
              <ButtonLink
                href={profile.blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                variant="secondary"
              >
                {t("landing:linkedinCta")}
              </ButtonLink>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[220px]">
            <Image
              src={profile.avatarUrl}
              alt={profile.name}
              width={220}
              height={220}
              className="aspect-square w-full rounded-2xl border border-slate-700 object-cover"
            />
          </div>
        </Card>

        <section className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card radius="lg" size="md">
            <Heading as="h3" variant="section">
              {profile.publicRepos}
            </Heading>
            <Text variant="muted">{t("landing:stats.publicRepos")}</Text>
          </Card>
          <Card radius="lg" size="md">
            <Heading as="h3" variant="section">
              {profile.followers}
            </Heading>
            <Text variant="muted">{t("landing:stats.followers")}</Text>
          </Card>
          <Card radius="lg" size="md">
            <Heading as="h3" variant="section">
              {profile.following}
            </Heading>
            <Text variant="muted">{t("landing:stats.following")}</Text>
          </Card>
          <Card radius="lg" size="md">
            <Heading as="h3" variant="section">
              {profile.location || "-"}
            </Heading>
            <Text variant="muted">{t("landing:stats.location")}</Text>
          </Card>
        </section>

        <section className="mb-16">
          <Heading as="h2" variant="section" className="mb-5">
            {t("landing:skillsTitle")}
          </Heading>
          <div className="flex flex-wrap gap-2">
            {skillsData.map((skill) => (
              <span
                key={skill.label}
                className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-200"
              >
                {skill.label}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <Heading as="h2" variant="section" className="mb-6">
            {t("landing:experienceTitle")}
          </Heading>
          <div className="grid gap-4">
            {experienceData.map((item) => (
              <Card key={`${item.company}-${item.role}`}>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <Heading as="h3" variant="card">
                    {item.role}
                  </Heading>
                  <Text as="span" variant="muted">
                    {item.period}
                  </Text>
                </div>
                <Text className="portfolio-company mb-2" variant="label">
                  {item.company}
                </Text>
                <Text className="mb-2" variant="muted">
                  {item.location}
                </Text>
                <Text className="mb-3">{item.summary}</Text>
                <ul className="space-y-1">
                  {item.highlights.map((highlight) => (
                    <Text as="li" key={highlight}>
                      - {highlight}
                    </Text>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        <section id="projects" className="mb-6">
          <Heading as="h2" variant="section" className="mb-6">
            {t("landing:projectsTitle")}
          </Heading>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.githubUrl}>
                <div className="mb-3 flex items-start justify-between gap-2">
                  <Heading as="h3" variant="card">
                    {project.name}
                  </Heading>
                  <Text
                    as="span"
                    variant="caption"
                    className="rounded-full bg-slate-800 px-2 py-1"
                  >
                    {project.language}
                  </Text>
                </div>
                <Text className="mb-4 min-h-10">
                  {project.description || t("landing:projectFallback")}
                </Text>
                <div className="mb-4 flex items-center gap-4">
                  <Text as="span" variant="muted">
                    {t("landing:publishedOn")}:{" "}
                    {new Date(project.createdAt).toLocaleDateString(lng)}
                  </Text>
                  <Text as="span" variant="muted">
                    {t("landing:stars")}: {project.stars}
                  </Text>
                  <Text as="span" variant="muted">
                    {t("landing:lastUpdate")}:{" "}
                    {new Date(project.pushedAt).toLocaleDateString(lng)}
                  </Text>
                </div>
                <div className="flex flex-wrap gap-2">
                  <ButtonLink
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                    variant="primary"
                  >
                    {t("landing:viewRepo")}
                  </ButtonLink>
                  {project.demoUrl ? (
                    <ButtonLink
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="sm"
                      variant="secondary"
                    >
                      {t("landing:viewDemo")}
                    </ButtonLink>
                  ) : null}
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
