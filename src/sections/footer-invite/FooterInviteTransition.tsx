/**
 * @file FooterInviteTransition.tsx
 * @description Pinned scroll transition — white (projects) to black (footer) with inverted type.
 */

"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { FooterInviteCta } from "./FooterInviteCta";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePinnedScrollProgress } from "@/hooks/usePinnedScrollProgress";
import {
  FOOTER_INVITE_MIN_CONTENT_SCALE,
  FOOTER_INVITE_MIN_CTA_SCALE,
  FOOTER_INVITE_SCROLL_RUNWAY_VH,
  footerInviteContent,
} from "@/lib/data/footer-invite";
import {
  easeOutCubic,
  FOOTER_INVITE_SECTION_ID,
  lerp,
} from "@/lib/footer-invite-scroll";
import { cn } from "@/lib/utils";

import { HeroRotatingTagline } from "../hero/HeroRotatingTagline";
import { HERO_HEADLINE_FONT, HERO_TAGLINE_FONT_FAMILY } from "../hero/hero-styles";
import {
  FOOTER_INVITE_CONTENT,
  FOOTER_INVITE_CTA_WRAP,
  FOOTER_INVITE_HEADLINE_SIZE,
  FOOTER_INVITE_STICKY,
  FOOTER_INVITE_TAGLINE_SIZE,
} from "./footer-invite-styles";

// ——— Helpers ———

function mixChannel(progress: number, from: number, to: number): number {
  return Math.round(from + (to - from) * progress);
}

function mixRgb(
  progress: number,
  from: readonly [number, number, number],
  to: readonly [number, number, number],
): string {
  const r = mixChannel(progress, from[0], to[0]);
  const g = mixChannel(progress, from[1], to[1]);
  const b = mixChannel(progress, from[2], to[2]);
  return `rgb(${r} ${g} ${b})`;
}

const WHITE: readonly [number, number, number] = [255, 255, 255];
const BLACK: readonly [number, number, number] = [0, 0, 0];

// ——— Main section ———

export default function FooterInviteTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    setIsEnhanced(true);
  }, []);

  const scrollEnabled = isEnhanced && !prefersReducedMotion;
  const progress = usePinnedScrollProgress(containerRef, scrollEnabled);
  const resolvedProgress = prefersReducedMotion ? 1 : progress;
  const easedProgress = easeOutCubic(resolvedProgress);

  const containerHeight = prefersReducedMotion
    ? "100vh"
    : `calc(100vh + ${FOOTER_INVITE_SCROLL_RUNWAY_VH}vh)`;

  const styles = useMemo(() => {
    const backgroundColor = mixRgb(resolvedProgress, WHITE, BLACK);
    const foregroundColor = mixRgb(resolvedProgress, BLACK, WHITE);
    const ctaRing = mixRgb(resolvedProgress, BLACK, WHITE);
    const contentScale = lerp(
      FOOTER_INVITE_MIN_CONTENT_SCALE,
      1,
      easedProgress,
    );
    const ctaScale = lerp(FOOTER_INVITE_MIN_CTA_SCALE, 1, easedProgress);

    return {
      backgroundColor,
      foregroundColor,
      ctaRing,
      contentScale,
      ctaScale,
    };
  }, [easedProgress, resolvedProgress]);

  const { intro, pillars, cta } = footerInviteContent;
  const textStyle = useMemo(
    () => ({ color: styles.foregroundColor }),
    [styles.foregroundColor],
  );

  const contentTransform = useMemo(
    () => ({
      transform: `scale(${styles.contentScale})`,
      transformOrigin: "center bottom",
    }),
    [styles.contentScale],
  );

  const ctaTransform = useMemo(
    () => ({
      transform: `scale(${styles.ctaScale})`,
      transformOrigin: "center bottom",
    }),
    [styles.ctaScale],
  );

  return (
    <section
      ref={containerRef}
      id={FOOTER_INVITE_SECTION_ID}
      aria-label="Project inquiry"
      className="relative w-full"
      style={{ height: containerHeight }}
    >
      <div
        className={cn(FOOTER_INVITE_STICKY)}
        style={{ backgroundColor: styles.backgroundColor }}
      >
        <div className={cn(FOOTER_INVITE_CONTENT)}>
          <div
            className="flex w-full flex-col items-center gap-1 sm:gap-1.5"
            style={contentTransform}
          >
            <h2
              className={cn(
                "shrink-0 whitespace-nowrap",
                HERO_HEADLINE_FONT,
                FOOTER_INVITE_HEADLINE_SIZE,
              )}
              style={textStyle}
            >
              {intro}
            </h2>

            <HeroRotatingTagline
              lines={pillars}
              fontClassName={HERO_TAGLINE_FONT_FAMILY}
              textStyle={textStyle}
              className={FOOTER_INVITE_TAGLINE_SIZE}
            />
          </div>

          <div className={cn(FOOTER_INVITE_CTA_WRAP)} style={ctaTransform}>
            <FooterInviteCta
              href={cta.href}
              label={cta.label}
              outlineColor={styles.ctaRing}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
