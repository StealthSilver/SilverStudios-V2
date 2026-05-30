/**
 * @file useScrollProgress.ts
 * @description Returns scroll progress 0–1 as the hero scrolls out of view.
 */

"use client";

import { useEffect, useRef, useState } from "react";

import type { RefObject } from "react";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * progress = 0 while the hero fills the viewport.
 * progress = 1 when the hero bottom reaches the viewport top.
 */
export function useScrollProgress(
  heroRef: RefObject<HTMLElement | null>,
  enabled = true,
): number {
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const hero = heroRef.current;
    if (!hero) return;

    const update = (): void => {
      rafId.current = null;
      const rawProgress =
        1 - hero.getBoundingClientRect().bottom / window.innerHeight;
      setProgress(clamp(rawProgress, 0, 1));
    };

    const scheduleUpdate = (): void => {
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(update);
      }
    };

    const observer = new IntersectionObserver(scheduleUpdate, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });
    observer.observe(hero);

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
  }, [heroRef, enabled]);

  return enabled ? progress : 0;
}
