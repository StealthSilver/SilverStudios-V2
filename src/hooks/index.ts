/**
 * @file index.ts
 * @description Barrel export for custom React hooks.
 */

export { useMediaQuery } from "./use-media-query";
export {
  mixNavbarForeground,
  useNavbarScrollProgress,
} from "./useNavbarScrollProgress";
export { usePreloadHeroSlides } from "./use-preload-hero-slides";
export { useScrollProgress } from "./useScrollProgress";
export {
  getScrollRevealProgress,
  SCROLL_REVEAL_BLUR_PX,
  SCROLL_REVEAL_END_RATIO,
  SCROLL_REVEAL_START_RATIO,
  useScrollWordReveal,
} from "./useScrollWordReveal";
