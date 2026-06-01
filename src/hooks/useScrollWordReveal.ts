/**
 * @file useScrollWordReveal.ts
 * @description Scroll-scrubbed word reveal — opacity + blur tied to viewport position.
 */

"use client";

import { useEffect, useRef } from "react";

import type { RefObject } from "react";

export const SCROLL_REVEAL_START_RATIO = 0.75;
export const SCROLL_REVEAL_END_RATIO = 0.6;
export const SCROLL_REVEAL_BLUR_PX = 10;
export const SCROLL_REVEAL_TRANSLATE_REM = 4;
/** Per-item delay when siblings share the same row (e.g. logo strip). */
export const SCROLL_REVEAL_STAGGER_VIEWPORT_RATIO = 0.045;

export type ScrollRevealMode = "element" | "section";

export interface ScrollWordRevealOptions {
  mode?: ScrollRevealMode;
  startRatio?: number;
  endRatio?: number;
  staggerViewportRatio?: number;
}

function getScrollRevealStaggerIndex(element: HTMLElement): number {
  const raw = element.dataset.scrollRevealIndex;
  if (raw === undefined) return 0;
  const index = Number.parseInt(raw, 10);
  return Number.isFinite(index) && index >= 0 ? index : 0;
}

function getMaxScrollRevealStaggerIndex(
  words: NodeListOf<HTMLElement>,
): number {
  let max = 0;
  words.forEach((word) => {
    max = Math.max(max, getScrollRevealStaggerIndex(word));
  });
  return max;
}

function getStaggeredSectionItemProgress(
  sectionProgress: number,
  index: number,
  maxIndex: number,
): number {
  if (maxIndex <= 0) return sectionProgress;

  const steps = maxIndex + 1;
  const staggerStep = 1 / steps;
  const itemStart = index * staggerStep;

  return Math.min(1, Math.max(0, (sectionProgress - itemStart) / staggerStep));
}

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

function applyScrollRevealStyles(
  word: HTMLElement,
  progress: number,
  noBlur: boolean,
): void {
  word.style.opacity = String(progress);

  const translateRem = SCROLL_REVEAL_TRANSLATE_REM * (1 - progress);
  word.style.transform =
    translateRem > 0.01 ? `translateX(${translateRem}rem)` : "none";

  if (noBlur) {
    word.style.filter = "none";
  } else {
    const blur = SCROLL_REVEAL_BLUR_PX * (1 - progress);
    word.style.filter = blur > 0.01 ? `blur(${blur}px)` : "none";
  }
}

/**
 * Scrubs each `[data-scroll-reveal-word]` child from hidden/blurred to visible.
 * Element mode: per-item top crosses 75% → 60% of the viewport (about-text pattern).
 * Section mode: one progress curve for the container; items stagger across 0 → 1.
 */
export function useScrollWordReveal(
  containerRef: RefObject<HTMLElement | null>,
  enabled = true,
  options: ScrollWordRevealOptions = {},
): void {
  const {
    mode = "element",
    startRatio = SCROLL_REVEAL_START_RATIO,
    endRatio = SCROLL_REVEAL_END_RATIO,
    staggerViewportRatio = SCROLL_REVEAL_STAGGER_VIEWPORT_RATIO,
  } = options;
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

      if (reducedMotion) {
        words.forEach((word) => {
          word.style.opacity = "1";
          word.style.filter = "none";
          word.style.transform = "none";
        });
        return;
      }

      if (mode === "section") {
        const sectionProgress = getScrollRevealProgress(
          container.getBoundingClientRect().top,
          viewportHeight,
          startRatio,
          endRatio,
        );
        const maxIndex = getMaxScrollRevealStaggerIndex(words);

        words.forEach((word) => {
          const index = getScrollRevealStaggerIndex(word);
          const progress = getStaggeredSectionItemProgress(
            sectionProgress,
            index,
            maxIndex,
          );
          applyScrollRevealStyles(word, progress, noBlur);
        });
        return;
      }

      words.forEach((word) => {
        const staggerIndex = getScrollRevealStaggerIndex(word);
        const staggerOffset =
          staggerIndex * viewportHeight * staggerViewportRatio;
        const progress = getScrollRevealProgress(
          word.getBoundingClientRect().top - staggerOffset,
          viewportHeight,
          startRatio,
          endRatio,
        );

        applyScrollRevealStyles(word, progress, noBlur);
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
  }, [
    containerRef,
    enabled,
    mode,
    startRatio,
    endRatio,
    staggerViewportRatio,
  ]);
}
