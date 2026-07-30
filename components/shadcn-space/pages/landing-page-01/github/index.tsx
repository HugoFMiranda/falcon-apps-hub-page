import type { GitHubStats } from "@/lib/github";

export default function GitHubSection({ stats }: { stats: GitHubStats }) {
  return (
    <section id="github">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
        <div className="border-x border-border px-5 md:px-8 py-8 lg:py-16 flex flex-col gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground m-1.5" />
            <span className="text-base font-normal text-muted-foreground">GitHub</span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-foreground">
            What I&apos;ve shipped lately.
          </h2>
        </div>
      </div>

      {stats.recentRepos.length > 0 && (
        <div className="border-y border-border">
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
