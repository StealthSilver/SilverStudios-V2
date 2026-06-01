/**
 * @file AboutLogoTickerReveal.tsx
 * @description About client logos + CTA with scroll-scrubbed fade-in (staggered).
 */

"use client";

import Image from "next/image";

import { GlassSurface } from "@/components/ui/GlassSurface";
import { LetterWaveLink } from "@/components/ui/LetterWaveLink";
import { ScrollRevealGroup } from "@/components/ui/ScrollRevealGroup";
import { cn } from "@/lib/utils";

import type { ClientLogo } from "@/types";

import {
  ABOUT_CTA_BUTTON,
  ABOUT_CTA_LABEL,
  ABOUT_CTA_WRAP,
  ABOUT_LOGO_TICKER,
  ABOUT_LOGO_TICKER_IMAGE,
  ABOUT_LOGO_TICKER_ITEM,
  ABOUT_LOGO_TICKER_ROW,
} from "./about-styles";

const ABOUT_SCROLL_REVEAL_ITEM =
  "scroll-reveal-word flex h-full w-full items-center justify-center";

interface AboutLogoTickerRevealProps {
  logos: readonly ClientLogo[];
  ctaLabel: string;
  ctaHref: string;
}

export function AboutLogoTickerReveal({
  logos,
  ctaLabel,
  ctaHref,
}: AboutLogoTickerRevealProps) {
  return (
    <ScrollRevealGroup className={cn(ABOUT_LOGO_TICKER)}>
      <ul aria-label="Client logos" className={cn(ABOUT_LOGO_TICKER_ROW)}>
        {logos.map((logo, index) => (
          <li key={logo.name} className={cn(ABOUT_LOGO_TICKER_ITEM)}>
            <div
              className={ABOUT_SCROLL_REVEAL_ITEM}
              data-scroll-reveal-word=""
              data-scroll-reveal-index={index}
            >
              <Image
                alt={`${logo.name} logo`}
                className={cn(ABOUT_LOGO_TICKER_IMAGE)}
                height={logo.height}
                src={logo.src}
                width={logo.width}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className={cn(ABOUT_CTA_WRAP)}>
        <div
          className={ABOUT_SCROLL_REVEAL_ITEM}
          data-scroll-reveal-word=""
          data-scroll-reveal-index={logos.length}
        >
          <GlassSurface className="inline-flex rounded-full bg-neutral-950">
            <LetterWaveLink
              href={ctaHref}
              label={ctaLabel}
              className={cn(ABOUT_CTA_LABEL, ABOUT_CTA_BUTTON)}
            />
          </GlassSurface>
        </div>
      </div>
    </ScrollRevealGroup>
  );
}
