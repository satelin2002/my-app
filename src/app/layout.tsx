import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

import { inter } from "@/lib/fonts";
import { siteConfig } from "@/config/site";

interface RootLayoutProps {
  children: React.ReactNode;
}

// export const metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s | ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   keywords: [
//     "Next.js",
//     "React",
//     "Tailwind CSS",
//     "Server Components",
//     "Radix UI",
//   ],
//   authors: [
//     {
//       name: "shadcn",
//       url: "https://shadcn.com",
//     },
//   ],
//   creator: "shadcn",
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "white" },
//     { media: "(prefers-color-scheme: dark)", color: "black" },
//   ],
//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     url: siteConfig.url,
//     title: siteConfig.name,
//     description: siteConfig.description,
//     siteName: siteConfig.name,
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: siteConfig.name,
//     description: siteConfig.description,
//     images: [`${siteConfig.url}/og.jpg`],
//     creator: "@shadcn",
//   },
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon-16x16.png",
//     apple: "/apple-touch-icon.png",
//   },
//   manifest: `${siteConfig.url}/site.webmanifest`,
// };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={cn("antialiased h-full dark:bg-gray-800 ")}>
      <body className={cn(inter.className)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
