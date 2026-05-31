/**
 * @file hero-styles.ts
 * @description Shared Tailwind class strings for hero typography (must be static for scanning).
 */

/** Temporarily hide the hero video container (slideshow + dark backdrop). */
export const HERO_VIDEO_CONTAINER_HIDDEN = true;

/** Rounded slideshow frame (hero card / footer media). */
export const HERO_MEDIA_FRAME =
  "relative isolate min-h-0 overflow-hidden rounded-3xl bg-neutral-950";

/** Periwinkle → royal blue (135deg). */
export const HERO_GRADIENT_BACKGROUND =
  "linear-gradient(135deg, #8eb0f0 0%, #5278dc 28%, #2e52c8 58%, #122a94 100%)";

/** Individual gradient stops (135deg, top-left → bottom-right). */
export const HERO_GRADIENT_STOPS = [
  { color: "#8eb0f0", position: "0%" },
  { color: "#5278dc", position: "28%" },
  { color: "#2e52c8", position: "58%" },
  { color: "#122a94", position: "100%" },
] as const;

/** Tiled film-grain overlay strength (0–1). */
export const HERO_NOISE_OPACITY = 0.6;

/** Noise tile size in px (smaller = finer grain). */
export const HERO_NOISE_TILE_SIZE = 120;

export const HERO_TITLE_SIZE =
  "text-4xl sm:text-6xl md:text-7xl lg:text-8xl";

/** Static headline typography (color applied per context). */
export const HERO_HEADLINE_FONT =
  "text-center font-display font-normal tracking-[-0.04em]";

export const HERO_TAGLINE_SIZE =
  "text-4xl sm:text-6xl md:text-7xl lg:text-8xl py-2 sm:py-4 md:py-6 lg:py-4";

export const HERO_TAGLINE_FONT_FAMILY =
  "[font-family:var(--font-editorial-new)] font-normal italic leading-none";

export const HERO_TAGLINE_FONT = `${HERO_TAGLINE_FONT_FAMILY} text-white`;

export const HERO_TAGLINE_FONT_LIGHT = `${HERO_TAGLINE_FONT_FAMILY} text-neutral-950`;

/** Matches hero navbar link labels (Satoshi, size, casing, tracking). */
export const HERO_NAV_LINK_TYPOGRAPHY =
  "font-nav text-[11px] font-normal uppercase leading-none tracking-[0.06em] sm:text-xs";

/** Max width of the navbar glass bar (content sizing unchanged). */
export const HERO_NAVBAR_MAX_WIDTH = "max-w-7xl";

/**
 * Pins the navbar to the viewport. Top aligns with hero section padding;
 * horizontal inset matches section padding + inner card inset.
 */
export const HERO_NAVBAR_FIXED_POSITION =
  "fixed left-[calc(1.25rem+1rem)] right-[calc(1.25rem+1rem)] top-3 z-50 sm:left-[calc(1.75rem+1.5rem)] sm:right-[calc(1.75rem+1.5rem)] sm:top-5 md:left-[calc(2rem+2.25rem)] md:right-[calc(2rem+2.25rem)] md:top-5";

/** Navbar inset when the hero fills the viewport (gradient mode, no outer card padding). */
export const HERO_NAVBAR_FIXED_POSITION_FULL_BLEED =
  "fixed left-5 right-5 top-3 z-50 sm:left-7 sm:right-7 sm:top-5 md:left-8 md:right-8 md:top-5";
