import ConvexClientProvider from "@/providers/convex-client-provider";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snippet Share",
  description: "Share code snippets with anyone",
  openGraph: {
    title: "Snippet Share",
    description: "Share code snippets with anyone",
    images: [`/api/og?title=SnippetShare`],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark:bg-gradient-to-r dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 dark:via-90% bg-gradient-to-r from-neutral-100 via-sky-300 to-neutral-200 via-60% scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        <SessionProvider>
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </ConvexClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
