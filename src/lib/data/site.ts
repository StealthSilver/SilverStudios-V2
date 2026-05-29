/**
 * @file site.ts
 * @description Site-wide copy and metadata — never hardcode in JSX.
 */

import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Silver Studios",
  tagline: "Crafting memorable stories.",
  description:
    "Silver Studios is a creative web studio crafting memorable digital stories — through considered design, expressive motion, and purposeful code.",
  url: "https://silverstudios.art",
  ogImage: "/og-image.png",
  twitterHandle: "@silverstudios",
  locale: "en_US",
  themeColor: "#0d0d0d",
};
