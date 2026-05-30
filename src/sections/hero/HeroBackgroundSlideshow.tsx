/**
 * @file HeroBackgroundSlideshow.tsx
 * @description Loops hero background slides — gentle zoom, then current exits downward
 *   while the next enters from above with no gap between frames.
 */

"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

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
}

const TRANSITION_MS = 1000;
const ZOOM_MS = 2800;

function slideSrc(slide: HeroBackgroundSlide): string {
  if (slide.version === undefined) {
    return slide.src;
  }

  return `${slide.src}?v=${slide.version}`;
}

// ——— Local sub-components ———

function HeroSlide({
  slide,
  slideClassName,
  zoomClassName,
  priority = false,
  zIndexClassName,
}: HeroSlideProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 will-change-transform",
        zIndexClassName,
        slideClassName,
      )}
    >
      <div
        className={cn("h-full w-full origin-center will-change-transform", zoomClassName)}
      >
        <Image
          src={slideSrc(slide)}
          alt={slide.alt}
          fill
          priority={priority}
          unoptimized
          sizes="100vw"
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
      {phase === "transition" ? (
        <HeroSlide
          slide={slides[nextIndex]}
          slideClassName="animate-hero-slide-in"
          zIndexClassName="z-[1]"
          priority={nextIndex === 0}
        />
      ) : null}
      <HeroSlide
        key={index}
        slide={slides[index]}
        slideClassName={phase === "transition" ? "animate-hero-slide-out" : undefined}
        zoomClassName="animate-hero-slide-zoom"
        zIndexClassName="z-0"
        priority={index === 0}
      />
    </div>
  );
}
