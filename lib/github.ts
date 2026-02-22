const GITHUB_API = "https://api.github.com";
const USERNAME = process.env.GITHUB_USERNAME ?? "oswaldoAlvarez";
const LINKEDIN_URL =
  process.env.LINKEDIN_URL ?? "https://www.linkedin.com/in/oswaldo-alvarez/";

type GithubProfileResponse = {
  avatar_url: string;
  blog: string | null;
  bio: string | null;
  followers: number;
  following: number;
  html_url: string;
  location: string | null;
  name: string | null;
  public_repos: number;
};

type GithubRepoResponse = {
  created_at: string;
  description: string | null;
  fork: boolean;
  homepage: string | null;
  html_url: string;
  language: string | null;
  name: string;
  pushed_at: string;
  stargazers_count: number;
  archived: boolean;
};

export type GithubProfile = {
  avatarUrl: string;
  bio: string;
  blogUrl: string;
  followers: number;
  following: number;
  githubUrl: string;
  location: string;
  name: string;
  publicRepos: number;
};

export type GithubProject = {
  createdAt: string;
  description: string;
  demoUrl: string;
  githubUrl: string;
  language: string;
  name: string;
  pushedAt: string;
  stars: number;
};

function getHeaders() {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

export async function getGithubProfile(): Promise<GithubProfile> {
  const response = await fetch(`${GITHUB_API}/users/${USERNAME}`, {
    headers: getHeaders(),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub profile");
  }

  const profile = (await response.json()) as GithubProfileResponse;
  const bio = profile.bio?.replace(/\r/g, "") ?? "";

  return {
    avatarUrl: profile.avatar_url,
    bio,
    blogUrl: profile.blog ?? LINKEDIN_URL,
    followers: profile.followers,
    following: profile.following,
    githubUrl: profile.html_url,
    location: profile.location ?? "",
    name: profile.name ?? "Oswaldo Alvarez",
    publicRepos: profile.public_repos,
  };
}

export async function getGithubProjects(): Promise<GithubProject[]> {
  const response = await fetch(
    `${GITHUB_API}/users/${USERNAME}/repos?per_page=100&sort=updated`,
    {
      headers: getHeaders(),
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub repositories");
  }

  const repos = (await response.json()) as GithubRepoResponse[];

  return repos
    .filter((repo) => !repo.fork && !repo.archived)
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
    .map((repo) => ({
      createdAt: repo.created_at,
      description: repo.description ?? "",
      demoUrl: repo.homepage ?? "",
      githubUrl: repo.html_url,
      language: repo.language ?? "N/A",
      name: repo.name,
      pushedAt: repo.pushed_at,
      stars: repo.stargazers_count,
    }));
}
