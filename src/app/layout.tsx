/**
 * @file layout.tsx
 * @description Root layout — app-wide metadata, fonts, SEO, OG, and global shell.
 */

import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import localFont from "next/font/local";

import { GlassScrollbar } from "@/components/ui/GlassScrollbar";

import "./globals.css";

export { metadata, viewport } from "@/lib/metadata";

const satoshi = localFont({
  src: [
    {
      path: "../../public/Fonts/Satoshi/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Satoshi/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Satoshi/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const ranade = localFont({
  src: "../../public/Fonts/Ranade/Ranade-Regular.otf",
  variable: "--font-ranade",
  weight: "400",
  display: "swap",
});

const editorialNew = localFont({
  src: "../../public/Fonts/EditorialNew/PPEditorialNew-UltralightItalic.otf",
  variable: "--font-editorial-new",
  weight: "200",
  style: "italic",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${dmSans.variable} ${satoshi.variable} ${ranade.variable} ${editorialNew.variable} h-full bg-white antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="/scrollbar.css" />
      </head>
      <body className="flex min-h-full flex-col bg-white font-sans text-foreground">
        {children}
        <GlassScrollbar />
      </body>
    </html>
  );
}
