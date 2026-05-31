/**
 * @file useProjectCardsScroll.ts
 * @description Scroll-scrubbed reveal and column parallax for project cards.
 */

"use client";

import { useEffect, useRef } from "react";

import type { RefObject } from "react";

const REVEAL_START_RATIO = 0.88;
const REVEAL_END_RATIO = 0.55;
const REVEAL_TRANSLATE_PX = 48;
const PARALLAX_NARROW_FACTOR = 0.05;
const PARALLAX_WIDE_FACTOR = 0.035;

function getRevealProgress(elementTop: number, viewportHeight: number): number {
  const startY = viewportHeight * REVEAL_START_RATIO;
  const endY = viewportHeight * REVEAL_END_RATIO;
  const range = startY - endY;

  if (range <= 0) return 1;

  return Math.min(1, Math.max(0, (startY - elementTop) / range));
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function prefersNoBlur(): boolean {
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

/**
 * Scrubs each `[data-project-card]` from hidden to visible and applies
 * light parallax while scrolling the work grid.
 */
export function useProjectCardsScroll(
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

      const cards = container.querySelectorAll<HTMLElement>("[data-project-card]");
      if (cards.length === 0) return;

      const reducedMotion = prefersReducedMotion();
      const noBlur = prefersNoBlur();
      const viewportHeight = window.innerHeight;

      cards.forEach((card) => {
        if (reducedMotion) {
          card.style.opacity = "1";
          card.style.transform = "none";
          card.style.filter = "none";
          return;
        }

        const rect = card.getBoundingClientRect();
        const progress = getRevealProgress(rect.top, viewportHeight);
        const opacity = progress;
        const revealY = REVEAL_TRANSLATE_PX * (1 - progress);

        const size = card.dataset.projectSize;
        const viewportCenter = viewportHeight * 0.5;
        const elementCenter = rect.top + rect.height * 0.5;
        const distanceFromCenter = elementCenter - viewportCenter;
        const parallaxFactor =
          size === "large" ? PARALLAX_WIDE_FACTOR : PARALLAX_NARROW_FACTOR;
        const parallaxY = distanceFromCenter * parallaxFactor * -1;

        card.style.opacity = String(opacity);
        card.style.transform = `translate3d(0, ${revealY + parallaxY}px, 0)`;

        if (noBlur) {
          card.style.filter = "none";
        } else {
          const blur = 10 * (1 - progress);
          card.style.filter = blur > 0.01 ? `blur(${blur}px)` : "none";
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
