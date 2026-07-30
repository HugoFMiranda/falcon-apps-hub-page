import { Star, Users, BookMarked } from "lucide-react";
import type { GitHubStats } from "@/lib/github";

const dash = (v: number | null) => (v === null ? "—" : v.toLocaleString());

// lucide-react removed brand/logo icons (e.g. Github) in its v1 line;
// this is a minimal inline stand-in for the GitHub mark.
function GithubIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .32.21.68.8.56A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

export default function GitHubSection({ stats }: { stats: GitHubStats }) {
  const tiles = [
    { label: "Public repos", value: dash(stats.publicRepos), icon: BookMarked },
    { label: "Followers", value: dash(stats.followers), icon: Users },
    { label: "Stars earned", value: dash(stats.totalStars), icon: Star },
    { label: "On GitHub since", value: dash(stats.memberSince), icon: GithubIcon },
  ];

  return (
    <section id="github">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
        <div className="border-x border-border px-5 md:px-8 py-8 lg:py-16 flex flex-col gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground m-1.5" />
            <span className="text-base font-normal text-muted-foreground">GitHub</span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-foreground">
            What I ship.
          </h2>
        </div>
      </div>

      <div className="border-y border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="border-x border-border grid grid-cols-2 lg:grid-cols-4">
            {tiles.map((tile) => (
              <div
                key={tile.label}
                className="flex flex-col gap-2 p-6 lg:p-10 border-b lg:border-b-0 border-r last:border-r-0 border-border [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r"
              >
                <tile.icon size={16} className="text-muted-foreground" />
                <p className="text-4xl md:text-5xl font-medium text-foreground">{tile.value}</p>
                <p className="text-base text-muted-foreground">{tile.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {stats.languages.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="border-x border-border p-6 lg:p-10 flex flex-col gap-4">
            <p className="text-base text-muted-foreground">Most used languages</p>
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
              {stats.languages.map((lang, i) => (
                <div
                  key={lang.name}
                  style={{ width: `${lang.percent}%`, opacity: 1 - i * 0.15 }}
                  className="bg-foreground"
                  title={`${lang.name} — ${lang.percent}%`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {stats.languages.map((lang) => (
                <span key={lang.name} className="text-sm text-muted-foreground">
                  {lang.name} <span className="text-foreground">{lang.percent}%</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {stats.recentRepos.length > 0 && (
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
            <div className="border-x border-border grid grid-cols-1 md:grid-cols-2">
              {stats.recentRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2 p-6 lg:p-8 border-b md:odd:border-r border-border hover:bg-muted/40 transition-colors"
                >
                  <span className="text-lg font-medium text-foreground group-hover:underline">
                    {repo.name}
                  </span>
                  <span className="text-sm text-muted-foreground line-clamp-2">
                    {repo.description ?? "No description."}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {repo.language ?? "—"} · updated{" "}
                    {new Date(repo.pushedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
