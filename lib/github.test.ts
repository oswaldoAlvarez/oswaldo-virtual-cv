import { afterEach, describe, expect, it, vi } from "vitest";
import { getGithubProfile, getGithubProjects } from "@/lib/github";

describe("github service", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("maps github profile response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            avatar_url: "https://example.com/avatar.png",
            blog: null,
            bio: "Bio text",
            followers: 10,
            following: 2,
            html_url: "https://github.com/oswaldoAlvarez",
            location: "Madrid",
            name: "Oswaldo Alvarez",
            public_repos: 20,
          }),
          { status: 200 },
        ),
      ),
    );

    const profile = await getGithubProfile();

    expect(profile.name).toBe("Oswaldo Alvarez");
    expect(profile.blogUrl).toContain("linkedin.com");
    expect(profile.publicRepos).toBe(20);
  });

  it("filters forked and archived repositories", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify([
            {
              name: "repo-1",
              description: "Main repo",
              fork: false,
              archived: false,
              homepage: null,
              html_url: "https://github.com/oswaldoAlvarez/repo-1",
              language: "TypeScript",
              pushed_at: "2026-01-01T00:00:00.000Z",
              created_at: "2025-01-01T00:00:00.000Z",
              stargazers_count: 1,
            },
            {
              name: "repo-2",
              description: "Forked",
              fork: true,
              archived: false,
              homepage: null,
              html_url: "https://github.com/oswaldoAlvarez/repo-2",
              language: "TypeScript",
              pushed_at: "2026-01-02T00:00:00.000Z",
              created_at: "2025-01-01T00:00:00.000Z",
              stargazers_count: 0,
            },
            {
              name: "repo-3",
              description: "Archived",
              fork: false,
              archived: true,
              homepage: null,
              html_url: "https://github.com/oswaldoAlvarez/repo-3",
              language: "TypeScript",
              pushed_at: "2026-01-03T00:00:00.000Z",
              created_at: "2025-01-01T00:00:00.000Z",
              stargazers_count: 0,
            },
          ]),
          { status: 200 },
        ),
      ),
    );

    const projects = await getGithubProjects();

    expect(projects).toHaveLength(1);
    expect(projects[0].name).toBe("repo-1");
  });
});
