/**
 * @file SilverUiShowcase.tsx
 * @description Silver UI carousel with synced right-aligned copy and CTA.
 */

"use client";

import { useEffect, useState } from "react";

import { GlassSurface } from "@/components/ui/GlassSurface";
import { LetterWaveLink } from "@/components/ui/LetterWaveLink";
import { cn } from "@/lib/utils";
import type { SilverUiContent } from "@/types";

import { SilverUiCarousel } from "./SilverUiCarousel";
import {
  SILVER_UI_COPY_LINE,
  SILVER_UI_COPY_LINE_ACTIVE,
  SILVER_UI_COPY_LINE_INACTIVE,
  SILVER_UI_COPY_LINE_STAGE,
  SILVER_UI_COPY_WRAP,
  SILVER_UI_CTA_BUTTON,
  SILVER_UI_CTA_LABEL,
  SILVER_UI_CTA_WRAP,
  SILVER_UI_SHOWCASE_GRID,
} from "./silver-ui-styles";

// ——— Types ———

interface SilverUiShowcaseProps {
  content: SilverUiContent;
}

// ——— Main component ———

export function SilverUiShowcase({ content }: SilverUiShowcaseProps) {
  const { images, autoplayIntervalMs, ctaHref, ctaLabel } = content;
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const safeAutoplayMs = Math.max(1200, autoplayIntervalMs);

  useEffect(() => {
    if (images.length <= 1) {
      setProgress(0);
      return;
    }

    let frameId = 0;
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const nextProgress = Math.min(elapsed / safeAutoplayMs, 1);
      setProgress(nextProgress);

      if (nextProgress >= 1) {
        setProgress(0);
        setActiveIndex((previous) => (previous + 1) % images.length);
        return;
      }

      frameId = window.requestAnimationFrame(step);
    };

    frameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [activeIndex, images.length, safeAutoplayMs]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className={cn(SILVER_UI_SHOWCASE_GRID)}>
      <SilverUiCarousel
        images={images}
        activeIndex={activeIndex}
        progress={progress}
        onSelect={(index) => {
          if (index === activeIndex) {
            setProgress(0);
            return;
          }
          setProgress(0);
          setActiveIndex(index);
        }}
      />

      <div className={cn(SILVER_UI_COPY_WRAP)}>
        <div className={cn(SILVER_UI_COPY_LINE_STAGE)} aria-live="polite">
          {images.map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <p
                key={image.id}
                className={cn(
                  SILVER_UI_COPY_LINE,
                  isActive
                    ? SILVER_UI_COPY_LINE_ACTIVE
                    : SILVER_UI_COPY_LINE_INACTIVE,
                )}
                aria-hidden={!isActive}
              >
                {image.line}
              </p>
            );
          })}
        </div>

        <div className={cn(SILVER_UI_CTA_WRAP)}>
          <GlassSurface className="inline-flex rounded-full bg-neutral-950">
            <LetterWaveLink
              href={ctaHref}
              label={ctaLabel}
              className={cn(SILVER_UI_CTA_LABEL, SILVER_UI_CTA_BUTTON)}
            />
          </GlassSurface>
        </div>
      </div>
    </div>
  );
}
