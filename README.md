# Web CV Portfolio

This project is a personal **web CV / portfolio** built with Next.js.
It showcases:

- Professional summary (`About me`)
- Work experience timeline (multilingual)
- Public GitHub projects (fetched dynamically)
- Tech stack and profile metrics

It is designed to work as a public personal site that recruiters and clients can browse.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- i18next (English/Spanish)
- Vitest + Testing Library
- Husky + lint-staged

## Architecture

- `app/[lng]/page.tsx`: main portfolio page (`/en`, `/es`)
- `proxy.ts`: language detection and redirects
- `locales/en/*`, `locales/es/*`: all UI copies
- `lib/github.ts`: GitHub API integration (profile + repos)
- `components/*`: interactive UI (language switch, theme switch)

## Getting Started

Install dependencies:

```bash
npm install
```

Run local dev:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create a local env file:

```bash
cp .env.example .env.local
```

Variables:

- `GITHUB_USERNAME`: GitHub username to fetch profile/repos
- `LINKEDIN_URL`: fallback LinkedIn URL for CTA
- `GITHUB_TOKEN` (optional): increases GitHub API limits

## Scripts

- `npm run dev`: start dev server
- `npm run build`: production build
- `npm run start`: run production server
- `npm run lint`: run ESLint
- `npm run test`: run tests once (Vitest)
- `npm run test:watch`: run tests in watch mode

## Quality Gates

Pre-commit hook (Husky) runs automatically:

1. `npx lint-staged`
2. `npm run lint`
3. `npm run test`

## Testing

Current tests cover:

- i18n language utilities
- theme switch behavior
- language path switching logic
- GitHub data mapping/filtering

## Deployment

### Vercel (recommended)

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Add environment variables (`GITHUB_USERNAME`, `LINKEDIN_URL`, optional `GITHUB_TOKEN`).
4. Deploy.

### Is Vercel free?

Yes, Vercel has a **Hobby plan** that is **free** for personal/non-commercial projects.

Important notes:

- Free tier has usage/limit caps (builds, bandwidth, function usage, etc.).
- If limits are exceeded, features can be temporarily throttled until reset.
- For commercial/high-traffic usage, Pro is usually required.

### Will it stay online forever?

Not guaranteed forever in an absolute sense.
It can stay online long-term as long as:

- your Vercel account and project remain active
- you stay within Hobby limits/policies
- platform terms/plans do not change

For most personal portfolios, Vercel Hobby is a solid long-term option.
