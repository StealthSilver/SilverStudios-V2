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
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: SiteNavLink;
  secondaryCta: SiteNavLink;
}
