/**
 * @file site.ts
 * @description Shared domain types for site-wide content and navigation.
 */

export interface SiteNavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  twitterHandle: string;
  locale: string;
  themeColor: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  rotatingLines: readonly string[];
  description: string;
  primaryCta: SiteNavLink;
  secondaryCta: SiteNavLink;
}
