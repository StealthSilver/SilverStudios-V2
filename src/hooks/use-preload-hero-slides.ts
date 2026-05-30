/**
 * @file use-preload-hero-slides.ts
 * @description Tracks when every hero slideshow image has finished loading.
 */

"use client";

import { useCallback, useMemo, useState } from "react";

import { getHeroSlideUrl } from "@/lib/hero-slides";
import type { HeroBackgroundSlide } from "@/types";

interface UsePreloadHeroSlidesResult {
  allLoaded: boolean;
  markLoaded: (src: string) => void;
  slideUrls: readonly string[];
}

export function usePreloadHeroSlides(
  slides: readonly HeroBackgroundSlide[],
): UsePreloadHeroSlidesResult {
  const slideUrls = useMemo(
    () => slides.map((slide) => getHeroSlideUrl(slide)),
    [slides],
  );

  const [loadedSrcs, setLoadedSrcs] = useState<ReadonlySet<string>>(
    () => new Set(),
  );

  const markLoaded = useCallback((src: string) => {
    setLoadedSrcs((current) => {
      if (current.has(src)) {
        return current;
      }

      const next = new Set(current);
      next.add(src);
      return next;
    });
  }, []);

  const allLoaded =
    slideUrls.length === 0 || slideUrls.every((url) => loadedSrcs.has(url));

  return { allLoaded, markLoaded, slideUrls };
}
