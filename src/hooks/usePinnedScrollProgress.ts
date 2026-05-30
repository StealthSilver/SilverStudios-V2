/**
 * @file usePinnedScrollProgress.ts
 * @description Scroll progress 0–1 through a tall container with a sticky viewport child.
 */

"use client";

import { useEffect, useRef, useState } from "react";

import type { RefObject } from "react";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Returns 0 when the container top reaches the viewport top.
 * Returns 1 after scrolling through `containerHeight - viewportHeight`.
 */
export function usePinnedScrollProgress(
  containerRef: RefObject<HTMLElement | null>,
  enabled = true,
): number {
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    const update = (): void => {
      rafId.current = null;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = container.offsetHeight - viewportHeight;

      if (scrollableDistance <= 0) {
        setProgress(1);
        return;
      }

      const scrolled = -container.getBoundingClientRect().top;
      setProgress(clamp(scrolled / scrollableDistance, 0, 1));
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

  return enabled ? progress : 0;
}
