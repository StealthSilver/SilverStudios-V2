/**
 * @file HeroSlidesPreloader.tsx
 * @description Off-screen Next/Image preload pass — same URLs and sizes as the slideshow.
 */

"use client";

import Image from "next/image";

import {
  getHeroSlideUrl,
  HERO_SLIDE_IMAGE_QUALITY,
  HERO_SLIDE_IMAGE_SIZES,
} from "@/lib/hero-slides";
import type { HeroBackgroundSlide } from "@/types";

// ——— Types ———

interface HeroSlidesPreloaderProps {
  slides: readonly HeroBackgroundSlide[];
  onSlideLoaded: (src: string) => void;
}

// ——— Component ———

export function HeroSlidesPreloader({
  slides,
  onSlideLoaded,
}: HeroSlidesPreloaderProps) {
  if (slides.length === 0) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed h-0 w-0 overflow-hidden opacity-0"
    >
      {slides.map((slide) => {
        const src = getHeroSlideUrl(slide);

        return (
          <div key={src} className="relative h-[900px] w-[1600px]">
            <Image
              src={src}
              alt=""
              fill
              sizes={HERO_SLIDE_IMAGE_SIZES}
              quality={HERO_SLIDE_IMAGE_QUALITY}
              priority
              className="object-cover"
              onLoad={() => onSlideLoaded(src)}
              onError={() => onSlideLoaded(src)}
            />
          </div>
        );
      })}
    </div>
  );
}
