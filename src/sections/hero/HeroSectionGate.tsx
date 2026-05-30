/**
 * @file HeroSectionGate.tsx
 * @description Holds the hero until every slideshow image is cached, then reveals content.
 */

"use client";

import type { ReactNode } from "react";

import { usePreloadHeroSlides } from "@/hooks/use-preload-hero-slides";
import type { HeroBackgroundSlide } from "@/types";

import { HeroSlidesPreloader } from "./HeroSlidesPreloader";

// ——— Types ———

interface HeroSectionGateProps {
  slides: readonly HeroBackgroundSlide[];
  children: ReactNode;
}

// ——— Local sub-components ———

function HeroPreloadScreen() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading hero"
      className="box-border flex h-dvh p-6 sm:p-8 md:p-9"
    >
      <div className="relative flex min-h-0 flex-1 overflow-hidden rounded-3xl bg-neutral-950">
        <div className="absolute inset-x-4 top-3 h-10 rounded-xl bg-white/10 sm:inset-x-6 sm:top-4 sm:h-11 md:inset-x-9 md:top-6" />
        <div className="flex flex-1 animate-pulse bg-neutral-900/40" />
      </div>
    </div>
  );
}

// ——— Component ———

export function HeroSectionGate({ slides, children }: HeroSectionGateProps) {
  const { allLoaded, markLoaded } = usePreloadHeroSlides(slides);

  return (
    <>
      <HeroSlidesPreloader slides={slides} onSlideLoaded={markLoaded} />
      {allLoaded ? children : <HeroPreloadScreen />}
    </>
  );
}
