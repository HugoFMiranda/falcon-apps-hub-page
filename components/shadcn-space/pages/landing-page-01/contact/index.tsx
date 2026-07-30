import { ArrowUpRight } from "lucide-react";

const channels = [
  {
    label: "Email",
    value: "hugo.miranda.imp@gmail.com",
    href: "mailto:hugo.miranda.imp@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/HugoFMiranda",
    href: "https://github.com/HugoFMiranda",
  },
];

export default function Contact() {
  return (
    <section id="contact">
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="border-x border-border px-5 md:px-8 py-8 lg:py-16 flex flex-col gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground m-1.5" />
              <span className="text-base font-normal text-muted-foreground">Contact</span>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-foreground">
              Get in touch.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Open to interesting problems and good engineering conversations.
            </p>
          </div>
        </div>
      </div>

      <div className="border-y border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="border-x border-border grid grid-cols-1 md:grid-cols-2">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                {...(channel.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center justify-between gap-4 p-6 lg:p-10 border-b md:border-b-0 md:border-r md:last:border-r-0 border-border hover:bg-muted/40 transition-colors"
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-base text-muted-foreground">{channel.label}</span>
                  <span className="text-lg md:text-xl font-medium text-foreground truncate">
                    {channel.value}
                  </span>
                </div>
                <ArrowUpRight
                  size={20}
                  className="shrink-0 text-muted-foreground transition-transform group-hover:rotate-45"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
