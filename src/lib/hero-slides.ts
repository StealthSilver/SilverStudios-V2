/**
 * @file hero-slides.ts
 * @description Shared hero slideshow image URL helper.
 */

import type { HeroBackgroundSlide } from "@/types";

export const HERO_SLIDE_IMAGE_QUALITY = 85;
/** Slideshow frame — full-bleed hero background. */
export const HERO_SLIDE_IMAGE_SIZES = "100vw";
/** Off-screen preloader — matches the fixed 1600×900 preload container. */
export const HERO_SLIDE_PRELOAD_SIZES = "1600px";

/** Public URL for a hero background slide (includes cache-bust version when set). */
export function getHeroSlideUrl(slide: HeroBackgroundSlide): string {
  if (slide.version === undefined) {
    return slide.src;
  }

  return `${slide.src}?v=${slide.version}`;
}
