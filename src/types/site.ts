/**
 * @file site.ts
 * @description Shared domain types for site-wide content and navigation.
 */

export interface SiteNavLink {
  label: string;
  href: string;
  /** Opens in a new tab with an external-link affordance in the navbar */
  external?: boolean;
}

export type FooterSocialIcon =
  | "instagram"
  | "linkedin"
  | "x"
  | "dribbble"
  | "figma"
  | "github";

export interface FooterSocialLink {
  label: string;
  href: string;
  icon: FooterSocialIcon;
  /** Opens in a new tab (off-site profiles). Omit for same-site links. */
  external?: boolean;
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
