/**
 * @file HeroSectionGate.tsx
 * @description Holds the hero until every slideshow image is cached, then reveals content.
 */

"use client";

import type { ReactNode } from "react";

import { usePreloadHeroSlides } from "@/hooks/use-preload-hero-slides";
import { cn } from "@/lib/utils";
import type { HeroBackgroundSlide } from "@/types";

import { HERO_NAVBAR_FIXED_POSITION, HERO_VIDEO_CONTAINER_HIDDEN } from "./hero-styles";

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
      <div
        className={cn(
          HERO_NAVBAR_FIXED_POSITION,
          "h-10 rounded-xl bg-neutral-200/90 sm:h-11",
        )}
      />
      <div
        className={cn(
          "relative flex min-h-0 flex-1 overflow-hidden rounded-3xl bg-neutral-950",
          HERO_VIDEO_CONTAINER_HIDDEN && "hidden",
        )}
      >
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
      {HERO_VIDEO_CONTAINER_HIDDEN || allLoaded ? children : <HeroPreloadScreen />}
    </>
  );
}
