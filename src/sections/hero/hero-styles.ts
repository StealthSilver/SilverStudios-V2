/**
 * @file hero-styles.ts
 * @description Shared Tailwind class strings for hero typography (must be static for scanning).
 */

export const HERO_TITLE_SIZE =
  "text-4xl sm:text-6xl md:text-7xl lg:text-8xl";

export const HERO_TAGLINE_SIZE =
  "text-4xl sm:text-6xl md:text-7xl lg:text-8xl";

export const HERO_TAGLINE_FONT =
  "[font-family:var(--font-editorial-new)] font-normal italic leading-none text-white";

/** Matches hero navbar link labels (Satoshi, size, casing, tracking). */
export const HERO_NAV_LINK_TYPOGRAPHY =
  "font-nav text-[11px] font-normal uppercase leading-none tracking-[0.06em] sm:text-xs";

/** Soft elevation for the hero navbar bar. */
export const HERO_NAVBAR_SHADOW =
  "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_10px_rgba(0,0,0,0.05)]";
