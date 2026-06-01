/**
 * @file index.ts
 * @description Barrel export for custom React hooks.
 */

export { useMediaQuery } from "./use-media-query";
export {
  isNavbarForegroundLight,
  mixNavbarForeground,
  useNavbarForegroundColor,
  useNavbarScrollProgress,
} from "./useNavbarScrollProgress";
export { usePreloadHeroSlides } from "./use-preload-hero-slides";
export { usePinnedScrollProgress } from "./usePinnedScrollProgress";
export { useScrollProgress } from "./useScrollProgress";
export {
  getScrollRevealProgress,
  SCROLL_REVEAL_BLUR_PX,
  SCROLL_REVEAL_END_RATIO,
  SCROLL_REVEAL_START_RATIO,
  SCROLL_REVEAL_STAGGER_VIEWPORT_RATIO,
  useScrollWordReveal,
  type ScrollRevealMode,
  type ScrollWordRevealOptions,
} from "./useScrollWordReveal";
export { useProjectCardsScroll } from "./useProjectCardsScroll";
export { useFooterOverscroll } from "./useFooterOverscroll";
