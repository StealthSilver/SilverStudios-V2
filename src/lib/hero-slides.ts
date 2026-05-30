/**
 * @file hero-slides.ts
 * @description Shared hero slideshow image URL helper.
 */

import type { HeroBackgroundSlide } from "@/types";

export const HERO_SLIDE_IMAGE_QUALITY = 85;
export const HERO_SLIDE_IMAGE_SIZES = "100vw";

/** Public URL for a hero background slide (includes cache-bust version when set). */
export function getHeroSlideUrl(slide: HeroBackgroundSlide): string {
  if (slide.version === undefined) {
    return slide.src;
  }

  return `${slide.src}?v=${slide.version}`;
}
