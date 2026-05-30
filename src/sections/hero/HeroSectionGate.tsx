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
      className="box-border flex h-dvh bg-[#D8D8D8] p-6 sm:p-8 md:p-9"
    >
      <div className="flex min-h-0 flex-1 animate-pulse rounded-3xl bg-neutral-950" />
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
