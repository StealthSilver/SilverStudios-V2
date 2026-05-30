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

export interface HeroBackgroundSlide {
  src: string;
  alt: string;
  /** Bump when replacing the file at the same path to bust image cache. */
  version?: number;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  rotatingLines: readonly string[];
  backgroundSlides: readonly HeroBackgroundSlide[];
  description: string;
  primaryCta: SiteNavLink;
  secondaryCta: SiteNavLink;
}
