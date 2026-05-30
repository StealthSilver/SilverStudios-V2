/**
 * @file footer-invite-scroll.ts
 * @description Shared scroll-scrub helpers for the footer invite transition.
 */

export const FOOTER_INVITE_SECTION_ID = "footer-invite-scroll";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Ease-out cubic — matches Khufu-style deceleration on scrub. */
export function easeOutCubic(progress: number): number {
  const t = clamp(progress, 0, 1);
  return 1 - (1 - t) ** 3;
}

export function lerp(min: number, max: number, progress: number): number {
  return min + (max - min) * progress;
}

/** Pinned-section scrub progress (0 at pin start, 1 at pin end). */
export function getPinnedSectionProgress(element: HTMLElement): number {
  const viewportHeight = window.innerHeight;
  const scrollableDistance = element.offsetHeight - viewportHeight;

  if (scrollableDistance <= 0) {
    return 1;
  }

  const scrolled = -element.getBoundingClientRect().top;
  return clamp(scrolled / scrollableDistance, 0, 1);
}

/** True while the sticky invite panel is actively pinned during scroll. */
export function isPinnedSectionScrubbing(element: HTMLElement): boolean {
  const viewportHeight = window.innerHeight;
  const scrollableDistance = element.offsetHeight - viewportHeight;

  if (scrollableDistance <= 0) {
    return false;
  }

  const rect = element.getBoundingClientRect();
  return rect.top <= 0 && rect.bottom > viewportHeight;
}
