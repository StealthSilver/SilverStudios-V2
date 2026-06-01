/**
 * @file LogoTickerClientLogos.tsx
 * @description Client logo grid — muted by default, full color on hover.
 */

"use client";

import Image from "next/image";

import { LetterWaveLink } from "@/components/ui/LetterWaveLink";
import { ScrollRevealGroup } from "@/components/ui/ScrollRevealGroup";
import { heroContent } from "@/lib/data/hero";
import { cn } from "@/lib/utils";

import type { ClientLogo } from "@/types";

import { HERO_NAV_LINK_TYPOGRAPHY } from "../hero/hero-styles";
import {
  LOGO_TICKER_LOGO_CELL,
  LOGO_TICKER_LOGO_HEIGHT,
  LOGO_TICKER_LOGO_MAX_WIDTH,
  LOGO_TICKER_LOGO_ROW,
  LOGO_TICKER_LOGO_ROWS,
  LOGO_TICKER_LOGO_ROW_TWO_BRILLIANT,
  LOGO_TICKER_LOGO_ROW_TWO_BUTTON,
  LOGO_TICKER_LOGO_ROW_TWO_SPARDHA,
  LOGO_TICKER_PRIMARY_CTA,
} from "./logo-ticker-styles";

const LOGO_TICKER_SCROLL_REVEAL_ITEM =
  "scroll-reveal-word flex w-full justify-center";

// ——— Types ———

interface LogoTickerClientLogosProps {
  logos: readonly ClientLogo[];
  className?: string;
}

// ——— Local sub-components ———

function ClientLogoMark({ logo }: { logo: ClientLogo }) {
  return (
    <div
      className={cn(
        "logo-ticker-logo flex w-full items-center justify-center",
        LOGO_TICKER_LOGO_HEIGHT,
      )}
    >
      <Image
        alt={`${logo.name} logo`}
        className={cn(
          "logo-ticker-logo__image h-full w-auto max-w-full object-contain object-center",
          LOGO_TICKER_LOGO_MAX_WIDTH,
        )}
        height={logo.height}
        src={logo.src}
        width={logo.width}
      />
    </div>
  );
}

function LogoTickerPrimaryCta() {
  const { primaryCta } = heroContent;

  return (
    <LetterWaveLink
      href={primaryCta.href}
      label={primaryCta.label}
      className={cn(HERO_NAV_LINK_TYPOGRAPHY, LOGO_TICKER_PRIMARY_CTA)}
    />
  );
}

// ——— Main component ———

export function LogoTickerClientLogos({
  logos,
  className,
}: LogoTickerClientLogosProps) {
  const rowOneLogos = logos.slice(0, 4);
  const brilliantLogo = logos[4];
  const spardhaLogo = logos[5];

  if (!brilliantLogo || !spardhaLogo) {
    return null;
  }

  return (
    <ScrollRevealGroup className={cn(LOGO_TICKER_LOGO_ROWS, className)}>
      <ul aria-label="Client logos" className={cn(LOGO_TICKER_LOGO_ROW)}>
        {rowOneLogos.map((logo, index) => (
          <li key={logo.name} className={cn(LOGO_TICKER_LOGO_CELL)}>
            <div
              className={LOGO_TICKER_SCROLL_REVEAL_ITEM}
              data-scroll-reveal-word=""
              data-scroll-reveal-index={index}
            >
              <ClientLogoMark logo={logo} />
            </div>
          </li>
        ))}
      </ul>

      <div className={cn(LOGO_TICKER_LOGO_ROW)}>
        <div className={cn(LOGO_TICKER_LOGO_CELL, LOGO_TICKER_LOGO_ROW_TWO_BRILLIANT)}>
          <div
            className={LOGO_TICKER_SCROLL_REVEAL_ITEM}
            data-scroll-reveal-word=""
            data-scroll-reveal-index={4}
          >
            <ClientLogoMark logo={brilliantLogo} />
          </div>
        </div>

        <div className={cn(LOGO_TICKER_LOGO_CELL, LOGO_TICKER_LOGO_ROW_TWO_SPARDHA)}>
          <div
            className={LOGO_TICKER_SCROLL_REVEAL_ITEM}
            data-scroll-reveal-word=""
            data-scroll-reveal-index={5}
          >
            <ClientLogoMark logo={spardhaLogo} />
          </div>
        </div>

        <div className={cn(LOGO_TICKER_LOGO_ROW_TWO_BUTTON)}>
          <div
            className={LOGO_TICKER_SCROLL_REVEAL_ITEM}
            data-scroll-reveal-word=""
            data-scroll-reveal-index={6}
          >
            <LogoTickerPrimaryCta />
          </div>
        </div>
      </div>
    </ScrollRevealGroup>
  );
}
