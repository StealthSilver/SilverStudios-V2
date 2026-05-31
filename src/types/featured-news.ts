/**
 * @file featured-news.ts
 * @description Shared types for the Featured News section.
 */

export interface FeaturedNewsSlide {
  id: string;
  headline: string;
  gradientClassName: string;
}

export interface FeaturedNewsContent {
  eyebrow: string;
  title: string;
  ctaLabel: string;
  ctaHref: string;
  slides: readonly FeaturedNewsSlide[];
}
