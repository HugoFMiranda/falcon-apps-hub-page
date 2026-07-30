const USERNAME = "HugoFMiranda";
const API = "https://api.github.com";

export interface LanguageSlice {
  name: string;
  count: number;
  percent: number;
}

export interface RecentRepo {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  pushedAt: string;
}

export interface GitHubStats {
  ok: boolean;
  publicRepos: number | null;
  followers: number | null;
  memberSince: number | null;
  totalStars: number | null;
  languages: LanguageSlice[];
  recentRepos: RecentRepo[];
}

export const EMPTY_STATS: GitHubStats = {
  ok: false,
  publicRepos: null,
  followers: null,
  memberSince: null,
  totalStars: null,
  languages: [],
  recentRepos: [],
};

interface RawRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
}

export async function getGitHubStats(): Promise<GitHubStats> {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "falcon-hub",
  };
  const options = { headers, next: { revalidate: 3600 } } as const;

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${API}/users/${USERNAME}`, options),
      fetch(`${API}/users/${USERNAME}/repos?sort=pushed&per_page=100`, options),
    ]);

    if (!userRes.ok || !reposRes.ok) return EMPTY_STATS;

    const user = await userRes.json();
    const repos: unknown = await reposRes.json();
    if (!Array.isArray(repos)) return EMPTY_STATS;

    const list = repos as RawRepo[];
    const owned = list.filter((r) => !r.fork);

    const counts = new Map<string, number>();
    for (const repo of owned) {
      if (!repo.language) continue;
      counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
    }
    const totalTagged = [...counts.values()].reduce((a, b) => a + b, 0);
    const languages: LanguageSlice[] = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        count,
        percent: totalTagged ? Math.round((count / totalTagged) * 100) : 0,
      }));

    const recentRepos: RecentRepo[] = owned.slice(0, 4).map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      language: r.language,
      stars: r.stargazers_count,
      pushedAt: r.pushed_at,
    }));

    return {
      ok: true,
      publicRepos: typeof user.public_repos === "number" ? user.public_repos : null,
      followers: typeof user.followers === "number" ? user.followers : null,
      memberSince: user.created_at ? new Date(user.created_at).getFullYear() : null,
      totalStars: owned.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0),
      languages,
      recentRepos,
    };
  } catch {
    return EMPTY_STATS;
  }
}
