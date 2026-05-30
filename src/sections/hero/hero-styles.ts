/**
 * @file hero-styles.ts
 * @description Shared Tailwind class strings for hero typography (must be static for scanning).
 */

/** Temporarily hide the hero video container (slideshow + dark backdrop). */
export const HERO_VIDEO_CONTAINER_HIDDEN = true;

export const HERO_TITLE_SIZE =
  "text-4xl sm:text-6xl md:text-7xl lg:text-8xl";

export const HERO_TAGLINE_SIZE =
  "text-4xl sm:text-6xl md:text-7xl lg:text-8xl";

export const HERO_TAGLINE_FONT_FAMILY =
  "[font-family:var(--font-editorial-new)] font-normal italic leading-none";

export const HERO_TAGLINE_FONT = `${HERO_TAGLINE_FONT_FAMILY} text-white`;

export const HERO_TAGLINE_FONT_LIGHT = `${HERO_TAGLINE_FONT_FAMILY} text-neutral-950`;

/** Matches hero navbar link labels (Satoshi, size, casing, tracking). */
export const HERO_NAV_LINK_TYPOGRAPHY =
  "font-nav text-[11px] font-normal uppercase leading-none tracking-[0.06em] sm:text-xs";

/** Elevation for the hero navbar bar. */
export const HERO_NAVBAR_SHADOW =
  "shadow-[0_2px_8px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.12)]";

/**
 * Pins the navbar to the viewport. Top aligns with hero section padding;
 * horizontal inset matches section padding + inner card inset.
 */
export const HERO_NAVBAR_FIXED_POSITION =
  "fixed left-[calc(1.5rem+1rem)] right-[calc(1.5rem+1rem)] top-3 z-50 sm:left-[calc(2rem+1.5rem)] sm:right-[calc(2rem+1.5rem)] sm:top-5 md:left-[calc(2.25rem+2.25rem)] md:right-[calc(2.25rem+2.25rem)] md:top-5";
