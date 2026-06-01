/**
 * @file FeaturedNewsCarousel.tsx
 * @description Interactive image card carousel for Featured News.
 */

"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";

import { GlassSurface } from "@/components/ui/GlassSurface";
import { LetterWaveLink } from "@/components/ui/LetterWaveLink";
import { cn } from "@/lib/utils";
import type { FeaturedNewsSlide } from "@/types/featured-news";

import {
  FEATURED_NEWS_CARD,
  FEATURED_NEWS_CARD_IMAGE,
  FEATURED_NEWS_CARD_MEDIA_WRAP,
  FEATURED_NEWS_CARD_MIN_WIDTH,
  FEATURED_NEWS_CAROUSEL_LIST,
  FEATURED_NEWS_CAROUSEL_TRACK,
  FEATURED_NEWS_CONTROL,
  FEATURED_NEWS_CTA_BUTTON,
  FEATURED_NEWS_CTA_LABEL,
  FEATURED_NEWS_HEADLINE,
} from "./featured-news-styles";

// ——— Types ———

interface FeaturedNewsCarouselProps {
  slides: readonly FeaturedNewsSlide[];
  ctaHref: string;
  ctaLabel: string;
}

interface NewsCardLayout {
  flexGrow: number;
  inactiveDistance: number;
}

interface NewsCardProps {
  slide: FeaturedNewsSlide;
  index: number;
  isActive: boolean;
  isNextPreview: boolean;
  isHistory: boolean;
  layout: NewsCardLayout;
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
      className={cn(FEATURED_NEWS_CONTROL)}
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
  layout,
  onSelect,
}: NewsCardProps) {
  const imageOpacity = isActive ? 1 : isNextPreview ? 0.82 : isHistory ? 0.64 : 0.54;
  const { flexGrow, inactiveDistance } = layout;

  return (
    <li
      role="group"
      aria-roledescription="slide"
      aria-current={isActive ? "true" : undefined}
      aria-label={`${slide.headline}${isActive ? " (active)" : ""}`}
      className={cn(
        FEATURED_NEWS_CARD,
        !isActive &&
          (FEATURED_NEWS_CARD_MIN_WIDTH[inactiveDistance] ??
            FEATURED_NEWS_CARD_MIN_WIDTH[5]),
      )}
      style={{ flexGrow }}
    >
      <button
        type="button"
        onClick={() => onSelect(index)}
        className="group explore-cursor-target relative h-full w-full overflow-hidden rounded-xl border border-black/5 text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/25 focus-visible:ring-offset-2"
        data-explore-label="Explore"
      >
        <div
          className={cn(
            FEATURED_NEWS_CARD_MEDIA_WRAP,
            isActive ? "scale-105" : "scale-100",
          )}
          style={{ opacity: imageOpacity }}
          aria-hidden
        >
          <Image
            src={slide.imageSrc}
            alt=""
            fill
            className={cn(FEATURED_NEWS_CARD_IMAGE)}
            sizes="(max-width: 768px) 72vw, 36rem"
            priority={index < 2}
          />
        </div>
      </button>
    </li>
  );
}

// ——— Layout helpers ———

/** Dominant flex share for the expanded card. */
const ACTIVE_FLEX_GROW = 36;

/** Highest flex share among collapsed strips (immediate next). */
const INACTIVE_FLEX_GROW_MAX = 3;

/** Even flex step down per priority level (distance 2 → 2, 3 → 1, 4+ → 1). */
const INACTIVE_FLEX_GROW_STEP = 1;

/** Forward steps from the active slide (1 = immediate next, wraps around). */
function getInactiveDistance(
  index: number,
  activeIndex: number,
  slideCount: number,
): number {
  return (index - activeIndex + slideCount) % slideCount;
}

/**
 * Smaller, evenly stepped flex-grow for inactive cards (closer = wider strip).
 */
function getInactiveFlexGrow(distance: number): number {
  return Math.max(1, INACTIVE_FLEX_GROW_MAX - (distance - 1) * INACTIVE_FLEX_GROW_STEP);
}

function computeCardLayouts(
  slideCount: number,
  activeIndex: number,
): NewsCardLayout[] {
  if (slideCount <= 1) {
    return [{ flexGrow: 1, inactiveDistance: 0 }];
  }

  return Array.from({ length: slideCount }, (_, index) => {
    if (index === activeIndex) {
      return { flexGrow: ACTIVE_FLEX_GROW, inactiveDistance: 0 };
    }

    const inactiveDistance = getInactiveDistance(index, activeIndex, slideCount);

    return {
      flexGrow: getInactiveFlexGrow(inactiveDistance),
      inactiveDistance,
    };
  });
}

// ——— Main component ———

export function FeaturedNewsCarousel({
  slides,
  ctaHref,
  ctaLabel,
}: FeaturedNewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const id = useId();
  const slideCount = slides.length;

  const activeSlide = slides[currentIndex];

  const cardLayouts = useMemo(
    () => computeCardLayouts(slideCount, currentIndex),
    [currentIndex, slideCount],
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
        <GlassSurface className="inline-flex rounded-full bg-neutral-950">
          <LetterWaveLink
            href={ctaHref}
            label={ctaLabel}
            className={cn(FEATURED_NEWS_CTA_LABEL, FEATURED_NEWS_CTA_BUTTON)}
          />
        </GlassSurface>

        {slideCount > 1 && (
          <div
            className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3"
            role="group"
            aria-label="Featured news carousel navigation"
          >
            <CarouselControl direction="previous" onClick={goToPreviousSlide} />
            <CarouselControl direction="next" onClick={goToNextSlide} />
          </div>
        )}
      </div>

      <div className={cn(FEATURED_NEWS_CAROUSEL_TRACK)}>
        <ul className={cn(FEATURED_NEWS_CAROUSEL_LIST)}>
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            const layout = cardLayouts[index] ?? {
              flexGrow: 1,
              inactiveDistance: 0,
            };
            const isNextPreview =
              slideCount > 1 && !isActive && layout.inactiveDistance === 1;

            return (
              <NewsCard
                key={slide.id}
                slide={slide}
                index={index}
                isActive={isActive}
                isNextPreview={isNextPreview}
                isHistory={!isActive && layout.inactiveDistance > 1}
                layout={layout}
                onSelect={setCurrentIndex}
              />
            );
          })}
        </ul>
      </div>

      <p
        id={`featured-news-headline-${id}`}
        aria-live="polite"
        className={cn(FEATURED_NEWS_HEADLINE)}
      >
        {activeSlide?.headline}
      </p>
    </div>
  );
}
