/**
 * @file useNavbarScrollProgress.ts
 * @description Navbar foreground mix — 0 at top (white), 1 after 100vh scroll (black).
 */

"use client";

import { useEffect, useRef, useState } from "react";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Returns 0 while at page top and 1 once the user has scrolled one viewport height.
 */
export function useNavbarScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const update = (): void => {
      rafId.current = null;
      const viewportHeight = window.innerHeight || 1;
      setProgress(clamp(window.scrollY / viewportHeight, 0, 1));
    };

    const scheduleUpdate = (): void => {
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    scheduleUpdate();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return progress;
}

/** Interpolate white → black for navbar foreground elements. */
export function mixNavbarForeground(progress: number): string {
  const channel = Math.round(255 * (1 - clamp(progress, 0, 1)));
  return `rgb(${channel} ${channel} ${channel})`;
}
