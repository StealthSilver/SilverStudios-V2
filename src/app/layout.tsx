/**
 * @file layout.tsx
 * @description Root layout — app-wide metadata, fonts, SEO, OG, and global shell.
 */

import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import localFont from "next/font/local";

export { metadata, viewport } from "@/lib/metadata";
import "./globals.css";

const satoshi = localFont({
  src: "../../public/Fonts/Satoshi/Satoshi-Light.otf",
  variable: "--font-satoshi",
  weight: "300",
  display: "swap",
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
      className={`${cormorantGaramond.variable} ${dmSans.variable} ${satoshi.variable} h-full bg-white antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
