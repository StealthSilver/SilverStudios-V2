/**
 * @file site.ts
 * @description Site-wide copy and metadata — never hardcode in JSX.
 */

import type { SiteConfig, SiteNavLink } from "@/types";

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

export const SILVER_UI_URL = "https://silver-ui.vercel.app/";

export const siteNavLinks: SiteNavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  {
    label: "Silver UI",
    href: SILVER_UI_URL,
    external: true,
  },
];

export const footerNavPrimaryLinks: SiteNavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
];

export const footerNavSecondaryLinks: SiteNavLink[] = [
  {
    label: "Silver UI",
    href: SILVER_UI_URL,
    external: true,
  },
  { label: "Workflow", href: "/workflow" },
  { label: "Contact", href: "/contact" },
];
