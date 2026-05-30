/**
 * @file HeroBackgroundSlideshow.tsx
 * @description Loops hero background slides — gentle zoom, then current exits downward
 *   while the next enters from above with no gap between frames.
 */

"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import {
  getHeroSlideUrl,
  HERO_SLIDE_IMAGE_QUALITY,
  HERO_SLIDE_IMAGE_SIZES,
} from "@/lib/hero-slides";
import { cn } from "@/lib/utils";
import type { HeroBackgroundSlide } from "@/types";

// ——— Types ———

type SlidePhase = "display" | "transition";

interface HeroBackgroundSlideshowProps {
  slides: readonly HeroBackgroundSlide[];
  className?: string;
}

interface HeroSlideProps {
  slide: HeroBackgroundSlide;
  slideClassName?: string;
  zoomClassName?: string;
  priority?: boolean;
  zIndexClassName?: string;
  hidden?: boolean;
}

const TRANSITION_MS = 1000;
const ZOOM_MS = 2800;

// ——— Local sub-components ———

function HeroSlide({
  slide,
  slideClassName,
  zoomClassName,
  priority = false,
  zIndexClassName,
  hidden = false,
}: HeroSlideProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 will-change-transform",
        zIndexClassName,
        slideClassName,
        hidden && "pointer-events-none invisible",
      )}
      aria-hidden={hidden}
    >
      <div
        className={cn("h-full w-full origin-center will-change-transform", zoomClassName)}
      >
        <Image
          src={getHeroSlideUrl(slide)}
          alt={slide.alt}
          fill
          priority={priority}
          sizes={HERO_SLIDE_IMAGE_SIZES}
          quality={HERO_SLIDE_IMAGE_QUALITY}
          className="object-cover"
        />
      </div>
    </div>
  );
}

// ——— Component ———

export function HeroBackgroundSlideshow({
  slides,
  className,
}: HeroBackgroundSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<SlidePhase>("display");

  const slideCount = slides.length;
  const nextIndex = slideCount > 0 ? (index + 1) % slideCount : 0;

  const beginTransition = useCallback(() => {
    if (slideCount <= 1) {
      return;
    }
    setPhase((current) => (current === "display" ? "transition" : current));
  }, [slideCount]);

  useEffect(() => {
    if (slideCount <= 1 || phase !== "display") {
      return;
    }

    const timer = window.setTimeout(beginTransition, ZOOM_MS);
    return () => window.clearTimeout(timer);
  }, [phase, slideCount, index, beginTransition]);

  useEffect(() => {
    if (slideCount <= 1 || phase !== "transition") {
      return;
    }

    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % slideCount);
      setPhase("display");
    }, TRANSITION_MS);

    return () => window.clearTimeout(timer);
  }, [phase, slideCount]);

  if (slideCount === 0) {
    return null;
  }

  if (slideCount === 1) {
    return (
      <div
        aria-hidden="true"
        className={cn("absolute inset-0 z-0 overflow-hidden", className)}
      >
        <HeroSlide slide={slides[0]} priority />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 z-0 overflow-hidden", className)}
    >
      {slides.map((slide, slideIndex) => {
        const isCurrent = slideIndex === index;
        const isIncoming = phase === "transition" && slideIndex === nextIndex;
        const isActive = isCurrent || isIncoming;

        let slideClassName: string | undefined;
        let zoomClassName: string | undefined;
        let zIndexClassName = "z-0";

        if (isIncoming) {
          slideClassName = "animate-hero-slide-in";
          zIndexClassName = "z-[1]";
        } else if (isCurrent && phase === "transition") {
          slideClassName = "animate-hero-slide-out";
        } else if (isCurrent && phase === "display") {
          zoomClassName = "animate-hero-slide-zoom";
        }

        return (
          <HeroSlide
            key={getHeroSlideUrl(slide)}
            slide={slide}
            slideClassName={slideClassName}
            zoomClassName={zoomClassName}
            zIndexClassName={zIndexClassName}
            hidden={!isActive}
            priority={slideIndex === 0}
          />
        );
      })}
    </div>
  );
}
