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
  const { scale } = useFooterOverscroll(shellRef, enabled);

  return (
    <div
      ref={shellRef}
      className={cn(FOOTER_SCROLL_SHELL)}
      data-footer-scroll-shell
    >
      <FooterSection />

      {enabled ? (
        <div
          className={cn(FOOTER_OVERSCROLL_RUNWAY)}
          style={{ height: `${FOOTER_OVERSCROLL_RUNWAY_VH}vh` }}
          aria-hidden
        >
          <div className={cn(FOOTER_OVERSCROLL_EXPander)}>
            <FooterReboundGraphic scale={scale} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
