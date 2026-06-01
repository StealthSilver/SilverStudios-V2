/**
 * @file ImageGalleryCarousel.tsx
 * @description Scroll-scrubbed bento collage — tiles enter one-by-one, settle, then scroll releases.
 */

"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import type { GalleryImage } from "@/types";

import {
  COLLAGE_DESKTOP_COLUMNS,
  COLLAGE_DESKTOP_ROWS,
  COLLAGE_DESKTOP_SLOT_AREAS,
  COLLAGE_MOBILE_COLUMNS,
  COLLAGE_MOBILE_ROWS,
  COLLAGE_MOBILE_SLOT_AREAS,
  COLLAGE_DESKTOP_TEMPLATE_AREAS,
  COLLAGE_MOBILE_TEMPLATE_AREAS,
} from "./image-gallery-layout";

// ——— Types ———

interface ImageGalleryCarouselProps {
  images: readonly GalleryImage[];
}

interface CollageTile extends GalleryImage {
  key: string;
}

const TARGET_CARD_COUNT = 12;
/** Stagger: each index starts this much later in reveal progress (0–1). */
const ENTRY_STEP = 0.06;
/** How long each tile takes to slide into its grid slot (reveal progress units). */
const TRAVEL_SPAN = 0.34;
const LAST_TILE_APPEAR_AT = (TARGET_CARD_COUNT - 1) * ENTRY_STEP;
/** Reveal progress when the final tile has fully settled. */
const ALL_TILES_SETTLED_REVEAL = LAST_TILE_APPEAR_AT + TRAVEL_SPAN;
const REVEAL_START_PROGRESS = -0.2;
/** Section progress (0–1) at which every tile is locked in the grid. */
const ANIMATION_END_PROGRESS = 0.72;
const SLIDE_UP_OFFSET_PX = 96;
const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

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

function sectionToRevealProgress(sectionProgress: number): number {
  const span = ANIMATION_END_PROGRESS - REVEAL_START_PROGRESS;
  if (span <= 0) {
    return ALL_TILES_SETTLED_REVEAL;
  }

  const normalized = clamp01((sectionProgress - REVEAL_START_PROGRESS) / span);
  return normalized * ALL_TILES_SETTLED_REVEAL;
}

/** Stable inline styles so SSR HTML matches the client on hydration. */
function collageTileMotionStyle(
  translateY: number,
  opacity: number,
  zIndex: number,
): { transform: string; opacity: number; zIndex: number } {
  return {
    transform: `translate3d(0, ${translateY.toFixed(4)}px, 0)`,
    opacity: Math.round(opacity * 1e5) / 1e5,
    zIndex: Math.round(zIndex),
  };
}

// ——— Main component ———

export function ImageGalleryCarousel({ images }: ImageGalleryCarouselProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const [sectionProgress, setSectionProgress] = useState(0);
  const isDesktopLayout = useMediaQuery(DESKTOP_MEDIA_QUERY);

  const slotAreas = isDesktopLayout
    ? COLLAGE_DESKTOP_SLOT_AREAS
    : COLLAGE_MOBILE_SLOT_AREAS;

  const collageTiles = useMemo<CollageTile[]>(() => {
    if (images.length === 0) {
      return [];
    }

    const tileCount = Math.min(TARGET_CARD_COUNT, images.length);

    return Array.from({ length: tileCount }, (_, index) => ({
      ...images[index],
      key: images[index].id,
    }));
  }, [images]);

  const gridTemplateAreas = isDesktopLayout
    ? COLLAGE_DESKTOP_TEMPLATE_AREAS
    : COLLAGE_MOBILE_TEMPLATE_AREAS;

  const gridTemplateColumns = isDesktopLayout
    ? COLLAGE_DESKTOP_COLUMNS
    : COLLAGE_MOBILE_COLUMNS;

  const gridTemplateRows = isDesktopLayout
    ? COLLAGE_DESKTOP_ROWS
    : COLLAGE_MOBILE_ROWS;

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

  if (collageTiles.length === 0) {
    return null;
  }

  const animationComplete = sectionProgress >= ANIMATION_END_PROGRESS;
  const revealProgress = animationComplete
    ? ALL_TILES_SETTLED_REVEAL
    : sectionToRevealProgress(sectionProgress);
  const sceneFade = animationComplete
    ? 1
    : clamp01((revealProgress / ALL_TILES_SETTLED_REVEAL - 0.02) / 0.18);

  return (
    <section
      ref={sectionRef}
      className="pointer-events-none relative z-30 -mt-[52vh] h-[255vh] bg-transparent sm:-mt-[54vh] md:-mt-[56vh]"
      aria-hidden
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-transparent px-4 sm:px-6">
        <div
          className="grid w-full max-w-7xl gap-2.5 sm:gap-3"
          style={{
            gridTemplateAreas,
            gridTemplateColumns,
            gridTemplateRows,
            height: isDesktopLayout
              ? "min(80vh, 54rem)"
              : "min(90vh, 46rem)",
          }}
        >
          {collageTiles.map((image, index) => {
            const appearAt = index * ENTRY_STEP;
            const phaseProgress = clamp01((revealProgress - appearAt) / TRAVEL_SPAN);

            if (!animationComplete && index > 0 && phaseProgress <= 0.001) {
              return null;
            }

            const eased = easeOutCubic(phaseProgress);
            const translateY = (1 - eased) * SLIDE_UP_OFFSET_PX;
            const fadeIn = clamp01(phaseProgress / 0.22);
            const opacity = fadeIn * sceneFade;
            const zIndex = 20 + index;
            const tileStyle = collageTileMotionStyle(translateY, opacity, zIndex);
            const areaName = slotAreas[index] ?? slotAreas[0];
            const isFeatureTile = areaName === "i" || areaName === "l" || areaName === "m";

            return (
              <div
                key={image.key}
                className="min-h-0 min-w-0"
                style={{ gridArea: areaName }}
              >
                <article
                  className="relative h-full w-full overflow-hidden rounded-sm border border-black/15 bg-neutral-900 shadow-[0_8px_26px_rgba(0,0,0,0.15)]"
                  style={tileStyle}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={
                      isFeatureTile
                        ? "(min-width: 768px) 42vw, 92vw"
                        : "(min-width: 768px) 22vw, 46vw"
                    }
                    className="object-cover object-center"
                    style={{
                      objectPosition: image.objectPosition ?? "center",
                    }}
                    priority={index < 4}
                  />
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
