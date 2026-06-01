/**
 * @file SilverUiCarousel.tsx
 * @description Controlled Silver UI image carousel with smooth transitions and progress pills.
 */

"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import type { SilverUiImage } from "@/types";

import {
  SILVER_UI_CAROUSEL_DOT_BUTTON,
  SILVER_UI_CAROUSEL_DOT_BUTTON_ACTIVE,
  SILVER_UI_CAROUSEL_DOT_PROGRESS,
  SILVER_UI_CAROUSEL_DOTS_LIST,
  SILVER_UI_CAROUSEL_IMAGE_LAYER,
  SILVER_UI_CAROUSEL_IMAGE_LAYER_ACTIVE,
  SILVER_UI_CAROUSEL_IMAGE_LAYER_INACTIVE,
  SILVER_UI_CAROUSEL_MAIN_FRAME,
  SILVER_UI_CAROUSEL_WRAP,
} from "./silver-ui-styles";

// ——— Types ———

interface SilverUiCarouselProps {
  images: readonly SilverUiImage[];
  activeIndex: number;
  progress: number;
  onSelect: (index: number) => void;
}

// ——— Main component ———

export function SilverUiCarousel({
  images,
  activeIndex,
  progress,
  onSelect,
}: SilverUiCarouselProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className={cn(SILVER_UI_CAROUSEL_WRAP)}>
      <div className={cn(SILVER_UI_CAROUSEL_MAIN_FRAME)}>
        {images.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <Image
              key={image.id}
              src={image.src}
              alt={isActive ? image.alt : ""}
              fill
              className={cn(
                SILVER_UI_CAROUSEL_IMAGE_LAYER,
                isActive
                  ? SILVER_UI_CAROUSEL_IMAGE_LAYER_ACTIVE
                  : SILVER_UI_CAROUSEL_IMAGE_LAYER_INACTIVE,
              )}
              priority={index < 2}
              sizes="(max-width: 768px) 92vw, (max-width: 1280px) 56rem, 64rem"
              aria-hidden={!isActive}
            />
          );
        })}
      </div>

      <ul className={cn(SILVER_UI_CAROUSEL_DOTS_LIST)}>
        {images.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <li key={image.id}>
              <button
                type="button"
                aria-label={`Show ${image.name}`}
                aria-pressed={isActive}
                onClick={() => onSelect(index)}
                className={cn(
                  SILVER_UI_CAROUSEL_DOT_BUTTON,
                  isActive && SILVER_UI_CAROUSEL_DOT_BUTTON_ACTIVE,
                )}
              >
                <span
                  aria-hidden
                  className={cn(SILVER_UI_CAROUSEL_DOT_PROGRESS)}
                  style={{
                    transform: `scaleX(${isActive ? progress : 0})`,
                    transition: isActive
                      ? "transform 80ms linear"
                      : "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
