/**
 * @file SmoothScrollEnhancer.tsx
 * @description Enables smooth in-page scrolling for navbar and other hash links.
 */

"use client";

import { useEffect } from "react";

import {
  parseSamePageHash,
  scrollToHash,
} from "@/lib/smooth-scroll";

function shouldHandleClick(event: MouseEvent): boolean {
  if (event.defaultPrevented) {
    return false;
  }

  if (event.button !== 0) {
    return false;
  }

  return !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

// ——— Component ———

export function SmoothScrollEnhancer() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!shouldHandleClick(event)) {
        return;
      }

      const anchor = (event.target as HTMLElement).closest("a");

      if (!anchor || anchor.target === "_blank") {
        return;
      }

      const href = anchor.getAttribute("href");

      if (!href) {
        return;
      }

      const hash = parseSamePageHash(href);

      if (!hash || !scrollToHash(hash)) {
        return;
      }

      event.preventDefault();
      window.history.pushState(null, "", hash);
    };

    document.addEventListener("click", onClick);

    const scrollInitialHash = () => {
      const { hash } = window.location;

      if (hash) {
        scrollToHash(hash);
      }
    };

    scrollInitialHash();

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
