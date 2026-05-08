import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Falcon Apps",
  description: "A collection of personal tools and experiments by HugoFMiranda.",
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
