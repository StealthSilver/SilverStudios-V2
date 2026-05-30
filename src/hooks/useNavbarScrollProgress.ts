/**
 * @file useNavbarScrollProgress.ts
 * @description Navbar foreground — hero, light sections, footer-invite scrub, and footer.
 */

"use client";

import { useEffect, useRef, useState } from "react";

import {
  FOOTER_INVITE_SECTION_ID,
  getPinnedSectionProgress,
  isPinnedSectionScrubbing,
} from "@/lib/footer-invite-scroll";

const FOOTER_SECTION_ID = "contact";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Interpolate white → black for navbar foreground (progress 0 = white, 1 = black). */
export function mixNavbarForeground(progress: number): string {
  const channel = Math.round(255 * (1 - clamp(progress, 0, 1)));
  return `rgb(${channel} ${channel} ${channel})`;
}

function resolveNavbarForeground(): string {
  const viewportHeight = window.innerHeight || 1;
  const scrollY = window.scrollY;

  const footerInvite = document.getElementById(FOOTER_INVITE_SECTION_ID);
  if (footerInvite && isPinnedSectionScrubbing(footerInvite)) {
    const inviteProgress = getPinnedSectionProgress(footerInvite);
    return mixNavbarForeground(1 - inviteProgress);
  }

  const footer = document.getElementById(FOOTER_SECTION_ID);
  if (footer) {
    const footerTop = footer.getBoundingClientRect().top;
    if (footerTop <= viewportHeight * 0.85) {
      return mixNavbarForeground(0);
    }
  }

  if (footerInvite) {
    const inviteRect = footerInvite.getBoundingClientRect();
    const inviteEnd =
      inviteRect.top <= 0 && inviteRect.bottom <= viewportHeight;
    if (inviteEnd) {
      return mixNavbarForeground(0);
    }
  }

  const heroProgress = clamp(scrollY / viewportHeight, 0, 1);
  if (scrollY < viewportHeight) {
    return mixNavbarForeground(heroProgress);
  }

  return mixNavbarForeground(1);
}

/** True when foreground reads as light (show dark logo asset). */
export function isNavbarForegroundLight(foreground: string): boolean {
  const match = /rgb\((\d+)\s+(\d+)\s+(\d+)\)/.exec(foreground);
  if (!match) {
    return true;
  }
  const r = Number(match[1]);
  const g = Number(match[2]);
  const b = Number(match[3]);
  return (r + g + b) / 3 > 127;
}

/**
 * Returns 0 while at page top and 1 once the user has scrolled one viewport height.
 * @deprecated Prefer {@link useNavbarForegroundColor} for full-page navbar mixing.
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

/** Zone-aware navbar text/icon color (white on dark, black on light, scrubs on footer invite). */
export function useNavbarForegroundColor(): string {
  const [foreground, setForeground] = useState(() => mixNavbarForeground(0));
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const update = (): void => {
      rafId.current = null;
      setForeground(resolveNavbarForeground());
    };

    const scheduleUpdate = (): void => {
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(update);
      }
    };

    const footerInvite = document.getElementById(FOOTER_INVITE_SECTION_ID);
    const footer = document.getElementById(FOOTER_SECTION_ID);
    const observer = new IntersectionObserver(scheduleUpdate, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    if (footerInvite) {
      observer.observe(footerInvite);
    }
    if (footer) {
      observer.observe(footer);
    }

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
  }, []);

  return foreground;
}
