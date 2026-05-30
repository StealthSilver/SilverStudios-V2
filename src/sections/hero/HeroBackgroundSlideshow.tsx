/**
 * @file HeroBackgroundSlideshow.tsx
 * @description Loops hero background slides — current exits upward, next enters from below.
 */

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import type { HeroBackgroundSlide } from "@/types";

// ——— Types ———

type SlidePhase = "hold" | "transition";

interface HeroBackgroundSlideshowProps {
  slides: readonly HeroBackgroundSlide[];
  className?: string;
}

interface HeroSlideProps {
  slide: HeroBackgroundSlide;
  animationClassName?: string;
  priority?: boolean;
}

const HOLD_MS = 4500;
const TRANSITION_MS = 900;

function slideSrc(slide: HeroBackgroundSlide): string {
  if (slide.version === undefined) {
    return slide.src;
  }

  return `${slide.src}?v=${slide.version}`;
}

// ——— Local sub-components ———

function HeroSlide({ slide, animationClassName, priority = false }: HeroSlideProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 will-change-transform",
        animationClassName,
      )}
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
  );
}

// ——— Component ———

export function HeroBackgroundSlideshow({
  slides,
  className,
}: HeroBackgroundSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<SlidePhase>("hold");

  const slideCount = slides.length;
  const nextIndex = slideCount > 0 ? (index + 1) % slideCount : 0;

  useEffect(() => {
    if (slideCount <= 1) {
      return;
    }

    if (phase === "hold") {
      const timer = window.setTimeout(() => setPhase("transition"), HOLD_MS);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % slideCount);
      setPhase("hold");
    }, TRANSITION_MS);

    return () => window.clearTimeout(timer);
  }, [phase, slideCount]);

  if (slideCount === 0) {
    return null;
  }

  if (slideCount === 1) {
    return (
      <div aria-hidden="true" className={cn("absolute inset-0", className)}>
        <HeroSlide slide={slides[0]} priority />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={cn("absolute inset-0", className)}>
      {phase === "transition" ? (
        <>
          <HeroSlide
            slide={slides[index]}
            animationClassName="animate-hero-slide-out"
          />
          <HeroSlide
            slide={slides[nextIndex]}
            animationClassName="animate-hero-slide-in"
            priority={nextIndex === 0}
          />
        </>
      ) : (
        <HeroSlide slide={slides[index]} priority={index === 0} />
      )}
    </div>
  );
}
