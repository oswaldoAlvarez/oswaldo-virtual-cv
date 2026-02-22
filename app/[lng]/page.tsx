import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
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
            <a
              href="#projects"
              className="portfolio-btn-secondary rounded-full px-4 py-2 text-sm font-semibold transition"
            >
              {t("common:projects")}
            </a>
            <ThemeSwitcher />
            <LanguageSwitcher currentLanguage={lng} />
          </div>
        </header>

        <section className="portfolio-card mb-16 grid gap-8 rounded-2xl p-6 md:grid-cols-[1fr_240px] md:items-center">
          <div>
            <p className="portfolio-badge mb-3 inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
              {t("landing:badge")}
            </p>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {t("landing:title", { name: profile.name })}
            </h1>
            <h2 className="mb-2 text-lg font-semibold text-emerald-300">
              {t("landing:aboutTitle")}
            </h2>
            <p className="mb-6 max-w-2xl text-slate-300">{t("landing:aboutText")}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                {t("landing:githubCta")}
              </a>
              <a
                href={profile.blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-btn-secondary rounded-full px-5 py-3 text-sm font-semibold transition"
              >
                {t("landing:linkedinCta")}
              </a>
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
        </section>

        <section className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="portfolio-card rounded-xl p-4">
            <p className="text-2xl font-bold">{profile.publicRepos}</p>
            <p className="text-xs text-slate-400">{t("landing:stats.publicRepos")}</p>
          </article>
          <article className="portfolio-card rounded-xl p-4">
            <p className="text-2xl font-bold">{profile.followers}</p>
            <p className="text-xs text-slate-400">{t("landing:stats.followers")}</p>
          </article>
          <article className="portfolio-card rounded-xl p-4">
            <p className="text-2xl font-bold">{profile.following}</p>
            <p className="text-xs text-slate-400">{t("landing:stats.following")}</p>
          </article>
          <article className="portfolio-card rounded-xl p-4">
            <p className="text-2xl font-bold">{profile.location || "-"}</p>
            <p className="text-xs text-slate-400">{t("landing:stats.location")}</p>
          </article>
        </section>

        <section className="mb-16">
          <h2 className="mb-5 text-2xl font-bold">{t("landing:skillsTitle")}</h2>
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
          <h2 className="mb-6 text-2xl font-bold">{t("landing:experienceTitle")}</h2>
          <div className="grid gap-4">
            {experienceData.map((item) => (
              <article
                key={`${item.company}-${item.role}`}
                className="portfolio-card rounded-2xl p-5"
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold">{item.role}</h3>
                  <span className="text-xs text-slate-400">{item.period}</span>
                </div>
                <p className="portfolio-company mb-2 text-sm font-medium text-emerald-300">
                  {item.company}
                </p>
                <p className="mb-2 text-xs text-slate-400">{item.location}</p>
                <p className="mb-3 text-sm text-slate-300">{item.summary}</p>
                <ul className="space-y-1 text-sm text-slate-300">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>- {highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="mb-6">
          <h2 className="mb-6 text-2xl font-bold">{t("landing:projectsTitle")}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.githubUrl}
                className="portfolio-card rounded-2xl p-5"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <span className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300">
                    {project.language}
                  </span>
                </div>
                <p className="mb-4 min-h-10 text-sm text-slate-300">
                  {project.description || t("landing:projectFallback")}
                </p>
                <div className="mb-4 flex items-center gap-4 text-xs text-slate-400">
                  <span>
                    {t("landing:publishedOn")}:{" "}
                    {new Date(project.createdAt).toLocaleDateString(lng)}
                  </span>
                  <span>
                    {t("landing:stars")}: {project.stars}
                  </span>
                  <span>
                    {t("landing:lastUpdate")}:{" "}
                    {new Date(project.pushedAt).toLocaleDateString(lng)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400"
                  >
                    {t("landing:viewRepo")}
                  </a>
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-btn-secondary rounded-full px-4 py-2 text-xs font-semibold transition"
                    >
                      {t("landing:viewDemo")}
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
