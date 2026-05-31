/**
 * @file FeaturedNewsCarousel.tsx
 * @description Interactive gradient card carousel for Featured News.
 */

"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type { FeaturedNewsSlide } from "@/types/featured-news";

import { FEATURED_NEWS_CTA } from "./featured-news-styles";

// ——— Types ———

interface FeaturedNewsCarouselProps {
  slides: readonly FeaturedNewsSlide[];
  ctaHref: string;
  ctaLabel: string;
}

interface NewsCardProps {
  slide: FeaturedNewsSlide;
  index: number;
  isActive: boolean;
  isNextPreview: boolean;
  isHistory: boolean;
  widthPct: number;
  onSelect: (index: number) => void;
}

// ——— Local sub-components ———

function CarouselControl({
  direction,
  onClick,
}: {
  direction: "previous" | "next";
  onClick: () => void;
}) {
  const isPrevious = direction === "previous";

  return (
    <button
      type="button"
      onClick={onClick}
      title={isPrevious ? "Go to previous slide" : "Go to next slide"}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white text-lg text-neutral-800 transition-colors duration-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/25 focus-visible:ring-offset-2"
    >
      <span aria-hidden>{isPrevious ? "←" : "→"}</span>
    </button>
  );
}

function NewsCard({
  slide,
  index,
  isActive,
  isNextPreview,
  isHistory,
  widthPct,
  onSelect,
}: NewsCardProps) {
  const imageOpacity = isActive ? 1 : isNextPreview ? 0.82 : isHistory ? 0.64 : 0.54;

  return (
    <li
      role="group"
      aria-roledescription="slide"
      aria-current={isActive ? "true" : undefined}
      aria-label={`${index + 1}: ${slide.title}${isActive ? " (active)" : ""}`}
      className="h-[350px] min-w-0 shrink-0 transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:h-[390px] md:h-[440px]"
      style={{ width: `${widthPct}%` }}
    >
      <button
        type="button"
        onClick={() => onSelect(index)}
        className="group relative h-full w-full overflow-hidden rounded-xl border border-black/5 text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/25 focus-visible:ring-offset-2"
      >
        <div
          className={cn(
            "absolute inset-0 bg-linear-to-br transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            slide.gradientClassName,
            isActive ? "scale-105" : "scale-100",
          )}
          style={{ opacity: imageOpacity }}
          aria-hidden
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/35",
            !isActive && "to-black/45",
          )}
          aria-hidden
        />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="font-sans text-sm font-semibold tracking-tight text-white drop-shadow-sm sm:text-base">
            {slide.title}
          </p>
        </div>
      </button>
    </li>
  );
}

// ——— Main component ———

const ACTIVE_PCT = 72;
const INACTIVE_TOTAL_PCT = 100 - ACTIVE_PCT;

export function FeaturedNewsCarousel({
  slides,
  ctaHref,
  ctaLabel,
}: FeaturedNewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const id = useId();
  const slideCount = slides.length;

  const inactiveCount = slideCount > 1 ? slideCount - 1 : 0;
  const squishedWidthPct =
    inactiveCount > 0 ? INACTIVE_TOTAL_PCT / inactiveCount : 0;

  const activeSlide = slides[currentIndex];

  const cardWidths = useMemo(
    () =>
      slides.map((_, index) => {
        if (slideCount <= 1) {
          return 100;
        }

        return index === currentIndex ? ACTIVE_PCT : squishedWidthPct;
      }),
    [currentIndex, slideCount, slides, squishedWidthPct],
  );

  const goToPreviousSlide = () => {
    setCurrentIndex((index) => (index === 0 ? slideCount - 1 : index - 1));
  };

  const goToNextSlide = () => {
    setCurrentIndex((index) => (index + 1 === slideCount ? 0 : index + 1));
  };

  if (slideCount === 0) {
    return null;
  }

  return (
    <div aria-labelledby={`featured-news-carousel-${id}`} className="flex w-full flex-col">
      <h3 id={`featured-news-carousel-${id}`} className="sr-only">
        Featured news carousel
      </h3>

      <div className="mb-5 flex w-full items-center justify-between gap-4 sm:mb-6">
        <Link href={ctaHref} className={cn(FEATURED_NEWS_CTA)}>
          {ctaLabel}
        </Link>

        {slideCount > 1 && (
          <div
            className="ml-auto flex items-center gap-2 sm:gap-3"
            role="group"
            aria-label="Featured news carousel navigation"
          >
            <CarouselControl direction="previous" onClick={goToPreviousSlide} />
            <CarouselControl direction="next" onClick={goToNextSlide} />
          </div>
        )}
      </div>

      <div className="w-full overflow-hidden">
        <ul className="flex w-full max-w-full flex-row gap-2 sm:gap-3">
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            const isNextPreview =
              slideCount > 1 && !isActive && index === (currentIndex + 1) % slideCount;

            return (
              <NewsCard
                key={slide.id}
                slide={slide}
                index={index}
                isActive={isActive}
                isNextPreview={isNextPreview}
                isHistory={index < currentIndex}
                widthPct={cardWidths[index] ?? 0}
                onSelect={setCurrentIndex}
              />
            );
          })}
        </ul>
      </div>

      <p
        id={`featured-news-headline-${id}`}
        aria-live="polite"
        className="mt-6 max-w-[min(100%,54rem)] font-sans text-base font-medium leading-snug tracking-tight text-neutral-700 sm:mt-8 sm:text-lg md:mt-9 md:text-xl"
      >
        {activeSlide?.headline}
      </p>
    </div>
  );
}
