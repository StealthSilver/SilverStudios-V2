/**
 * @file HeroMediaFrame.tsx
 * @description Rounded hero slideshow container — project mockups with dark overlay.
 */

"use client";

import { cn } from "@/lib/utils";
import type { HeroBackgroundSlide } from "@/types";

import { HeroBackgroundSlideshow } from "./HeroBackgroundSlideshow";
import { HERO_MEDIA_FRAME } from "./hero-styles";

// ——— Types ———

export interface HeroMediaFrameProps {
  slides: readonly HeroBackgroundSlide[];
  className?: string;
}

// ——— Local sub-components ———

function HeroMediaOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] bg-black/55"
    />
  );
}

// ——— Component ———

export function HeroMediaFrame({ slides, className }: HeroMediaFrameProps) {
  return (
    <div className={cn(HERO_MEDIA_FRAME, className)}>
      <HeroBackgroundSlideshow slides={slides} className="absolute inset-0" />
      <HeroMediaOverlay />
    </div>
  );
}
