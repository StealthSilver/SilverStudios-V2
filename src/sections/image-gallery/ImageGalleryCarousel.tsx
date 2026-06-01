/**
 * @file ImageGalleryCarousel.tsx
 * @description In-flow sticky gallery trail that reveals and then releases naturally.
 */

"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import type { GalleryImage } from "@/types";
import { cn } from "@/lib/utils";

// ——— Types ———

interface ImageGalleryCarouselProps {
  images: readonly GalleryImage[];
}

interface StreamImage extends GalleryImage {
  key: string;
  decorative: boolean;
}

const TARGET_CARD_COUNT = 12;
const ENTRY_STEP = 0.026;
const TRAVEL_SPAN = 0.86;
const REVEAL_START_PROGRESS = -0.2;
const REVEAL_END_PROGRESS = 0.88;

function clamp01(value: number): number {
  if (value < 0) {
    return 0;
  }
  if (value > 1) {
    return 1;
  }
  return value;
}

function easeOutCubic(value: number): number {
  const t = clamp01(value);
  return 1 - (1 - t) ** 3;
}

function seededNoise(seed: number): number {
  const raw = Math.sin(seed * 12.9898) * 43758.5453;
  return raw - Math.floor(raw);
}

interface ScatterTarget {
  x: number;
  y: number;
}

/** Stable inline styles so SSR HTML matches the client on hydration. */
function galleryCardStyle(
  x: number,
  y: number,
  opacity: number,
  zIndex: number,
): { transform: string; opacity: number; zIndex: number } {
  return {
    transform: `translate3d(${x.toFixed(4)}vw, ${y.toFixed(4)}vh, 0px)`,
    opacity: Math.round(opacity * 1e5) / 1e5,
    zIndex: Math.round(zIndex),
  };
}

function createScatterTargets(count: number): ScatterTarget[] {
  const targets: ScatterTarget[] = [];
  const columns = Math.max(3, Math.ceil(Math.sqrt(count)));
  const rows = Math.max(1, Math.ceil(count / columns));
  const minX = 2;
  const maxX = 82;
  const xSpan = maxX - minX;
  const minY = 20;
  const maxY = 80;
  const ySpan = maxY - minY;

  for (let index = 0; index < count; index += 1) {
    const column = index % columns;
    const row = Math.floor(index / columns);

    const baseX = minX + ((column + 0.5) / columns) * xSpan;
    const baseY = minY + ((row + 0.5) / rows) * ySpan;
    const jitterX = (seededNoise(index * 31 + 7) - 0.5) * 7;
    const jitterY = (seededNoise(index * 31 + 13) - 0.5) * 6;

    const x = Math.min(maxX, Math.max(minX, baseX + jitterX));
    const y = Math.min(maxY, Math.max(minY, baseY + jitterY));
    targets.push({ x, y });
  }

  return targets;
}

// ——— Main component ———

export function ImageGalleryCarousel({ images }: ImageGalleryCarouselProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const [sectionProgress, setSectionProgress] = useState(0);

  if (images.length === 0) {
    return null;
  }

  const streamImages = useMemo<StreamImage[]>(
    () => {
      const nextImages: StreamImage[] = [];

      for (let index = 0; index < TARGET_CARD_COUNT; index += 1) {
        const image = images[index % images.length];
        const cycle = Math.floor(index / images.length);

        nextImages.push({
          ...image,
          key: `${image.id}-${index}`,
          decorative: cycle > 0,
        });
      }

      return nextImages;
    },
    [images],
  );
  const scatterTargets = useMemo(
    () => createScatterTargets(streamImages.length),
    [streamImages.length],
  );

  const cardHeights = [
    "h-[128px] sm:h-[156px] md:h-[188px]",
    "h-[142px] sm:h-[176px] md:h-[212px]",
    "h-[158px] sm:h-[194px] md:h-[232px]",
    "h-[136px] sm:h-[168px] md:h-[204px]",
    "h-[170px] sm:h-[210px] md:h-[252px]",
    "h-[150px] sm:h-[186px] md:h-[224px]",
  ];
  const cardWidths = [
    "w-[148px] sm:w-[188px] md:w-[236px]",
    "w-[168px] sm:w-[212px] md:w-[266px]",
    "w-[186px] sm:w-[232px] md:w-[294px]",
    "w-[160px] sm:w-[202px] md:w-[258px]",
    "w-[206px] sm:w-[256px] md:w-[324px]",
    "w-[176px] sm:w-[220px] md:w-[280px]",
  ];
  const cardRotations = [
    "-rotate-5",
    "rotate-3",
    "-rotate-2",
    "rotate-4",
    "-rotate-4",
    "rotate-2",
  ];
  const cardScale = [
    "scale-[0.98]",
    "scale-[1.02]",
    "scale-[0.96]",
    "scale-[1.04]",
    "scale-[1]",
    "scale-[0.94]",
  ];

  useEffect(() => {
    const updateProgress = () => {
      const sectionElement = sectionRef.current;
      if (!sectionElement) {
        return;
      }

      const rect = sectionElement.getBoundingClientRect();
      const maxScrollableDistance = sectionElement.offsetHeight - window.innerHeight;
      const scrolledDistance = Math.min(Math.max(-rect.top, 0), maxScrollableDistance);
      const nextProgress =
        maxScrollableDistance > 0 ? scrolledDistance / maxScrollableDistance : 1;

      setSectionProgress(nextProgress);
    };

    const scheduleUpdate = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateProgress();
      });
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const revealProgress = clamp01(
    (sectionProgress - REVEAL_START_PROGRESS) /
      (REVEAL_END_PROGRESS - REVEAL_START_PROGRESS),
  );
  const sceneFade = clamp01((revealProgress - 0.02) / 0.2);

  return (
    <section
      ref={sectionRef}
      className="pointer-events-none relative z-30 -mt-[52vh] h-[255vh] bg-transparent sm:-mt-[54vh] md:-mt-[56vh]"
      aria-hidden
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {streamImages.map((image, index) => {
          const appearAt = index * ENTRY_STEP;
          const phaseProgress = clamp01((revealProgress - appearAt) / TRAVEL_SPAN);

          if (index > 0 && phaseProgress <= 0.001) {
            return null;
          }

          const eased = easeOutCubic(phaseProgress);
          const target = scatterTargets[index] ?? { x: 50, y: 50 };
          const targetX = target.x;
          const targetY = target.y;
          const startX = 30 + (index % 3) * 10.0;
          const startY = 50 - (index % 4) * 2.8;
          const x = startX + (targetX - startX) * eased;
          const y = startY + (targetY - startY) * eased;
          const fadeIn = clamp01(phaseProgress / 0.2);
          const opacity = fadeIn * sceneFade * 0.94;
          const zIndex = 20 + index;
          const cardStyle = galleryCardStyle(x, y, opacity, zIndex);

          return (
            <article
              key={image.key}
              className={cn(
                "absolute left-0 top-0 overflow-hidden rounded-md border border-black/10 bg-neutral-100 shadow-[0_8px_26px_rgba(0,0,0,0.15)]",
                cardHeights[index % cardHeights.length],
                cardWidths[index % cardWidths.length],
                cardRotations[index % cardRotations.length],
                cardScale[index % cardScale.length],
              )}
              style={cardStyle}
              aria-hidden={image.decorative}
            >
              <Image
                src={image.src}
                alt={image.decorative ? "" : image.alt}
                fill
                sizes="(min-width: 1280px) 320px, (min-width: 768px) 34vw, 52vw"
                className="object-cover"
                priority={index < images.length}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
