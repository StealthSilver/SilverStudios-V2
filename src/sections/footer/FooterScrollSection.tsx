/**
 * @file FooterScrollSection.tsx
 * @description Footer shell with sui.io-style bottom overscroll rebound reveal.
 */

"use client";

import { useRef } from "react";

import { useFooterOverscroll } from "@/hooks/useFooterOverscroll";
import { useMediaQuery } from "@/hooks/use-media-query";
import { FOOTER_OVERSCROLL_RUNWAY_VH } from "@/lib/footer-overscroll";
import { cn } from "@/lib/utils";

import FooterReboundGraphic from "./FooterReboundGraphic";
import FooterSection from "./FooterSection";
import {
  FOOTER_OVERSCROLL_EXPander,
  FOOTER_OVERSCROLL_RUNWAY,
  FOOTER_SCROLL_SHELL,
} from "./footer-styles";

export default function FooterScrollSection() {
  const shellRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isMobile = useMediaQuery("(max-width: 479px)");
  const enabled = !prefersReducedMotion && !isMobile;
  const { pullPx, progress, scale } = useFooterOverscroll(shellRef, enabled);
  const contentReboundOffset = Math.min(pullPx * 0.24, 28);
  const maxRunwayPx = FOOTER_OVERSCROLL_RUNWAY_VH * 10;
  const runwayHeightPx = enabled
    ? Math.min(maxRunwayPx, Math.max(0, pullPx - 2) * 1.08)
    : 0;

  return (
    <div
      ref={shellRef}
      className={cn(FOOTER_SCROLL_SHELL)}
      data-footer-scroll-shell
    >
      <div
        className="relative will-change-transform"
        style={
          enabled
            ? { transform: `translate3d(0, ${-contentReboundOffset}px, 0)` }
            : undefined
        }
      >
        <FooterSection />

        {enabled ? (
          <div
            className={cn(FOOTER_OVERSCROLL_RUNWAY)}
            style={{ height: `${runwayHeightPx}px` }}
            aria-hidden
          >
            <div className={cn(FOOTER_OVERSCROLL_EXPander)}>
              <FooterReboundGraphic scale={scale} progress={progress} pullPx={pullPx} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
