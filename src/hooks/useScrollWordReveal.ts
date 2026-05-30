/**
 * @file useScrollWordReveal.ts
 * @description Scroll-scrubbed word reveal — opacity + blur tied to viewport position.
 */

"use client";

import { useEffect, useRef } from "react";

import type { RefObject } from "react";

export const SCROLL_REVEAL_START_RATIO = 0.75;
export const SCROLL_REVEAL_END_RATIO = 0.6;
export const SCROLL_REVEAL_BLUR_PX = 8;

export function getScrollRevealProgress(
  wordTop: number,
  viewportHeight: number,
  startRatio = SCROLL_REVEAL_START_RATIO,
  endRatio = SCROLL_REVEAL_END_RATIO,
): number {
  const startY = viewportHeight * startRatio;
  const endY = viewportHeight * endRatio;
  const range = startY - endY;

  if (range <= 0) return 1;

  return Math.min(1, Math.max(0, (startY - wordTop) / range));
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function prefersNoBlur(): boolean {
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

/**
 * Scrubs each `[data-scroll-reveal-word]` child from hidden/blurred to visible
 * as its top crosses 75% → 60% of the viewport (Luke Baffait about-text pattern).
 */
export function useScrollWordReveal(
  containerRef: RefObject<HTMLElement | null>,
  enabled = true,
): void {
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    const update = (): void => {
      rafId.current = null;

      const words = container.querySelectorAll<HTMLElement>(
        "[data-scroll-reveal-word]",
      );
      if (words.length === 0) return;

      const reducedMotion = prefersReducedMotion();
      const noBlur = prefersNoBlur();
      const viewportHeight = window.innerHeight;

      words.forEach((word) => {
        if (reducedMotion) {
          word.style.opacity = "1";
          word.style.filter = "none";
          return;
        }

        const progress = getScrollRevealProgress(
          word.getBoundingClientRect().top,
          viewportHeight,
        );

        word.style.opacity = String(progress);

        if (noBlur) {
          word.style.filter = "none";
        } else {
          const blur = SCROLL_REVEAL_BLUR_PX * (1 - progress);
          word.style.filter = blur > 0.01 ? `blur(${blur}px)` : "none";
        }
      });
    };

    const scheduleUpdate = (): void => {
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(update);
      }
    };

    const observer = new IntersectionObserver(scheduleUpdate, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });
    observer.observe(container);

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    scheduleUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [containerRef, enabled]);
}
