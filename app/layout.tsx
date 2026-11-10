import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL, person } from "@/lib/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = SITE_TITLE;
const description = SITE_DESCRIPTION;

// Icons and share images come from the file conventions in this folder
// (favicon.ico, icon.png, apple-icon.png, opengraph-image.png, twitter-image.png).
// robots.txt, sitemap.xml and /llms.txt are generated here too.
export const metadata: Metadata = {
  // hub.hugofmiranda.com serves the same page; canonical points both at the apex.
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: person.name,
  authors: [{ name: person.name, url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: person.name,
    title,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              const key = "falcon-hub-theme";
              const root = document.documentElement;
              const saved = localStorage.getItem(key);
              const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
              const isDark = saved ? saved === "dark" : prefersDark;
              root.classList.toggle("dark", isDark);
              root.style.colorScheme = isDark ? "dark" : "light";
            })();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
