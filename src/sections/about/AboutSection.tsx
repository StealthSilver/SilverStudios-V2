/**
 * @file AboutSection.tsx
 * @description Studio introduction — fantasy.co-style scroll-scrubbed word reveal.
 */

import Image from "next/image";

import { GlassSurface } from "@/components/ui/GlassSurface";
import { LetterWaveLink } from "@/components/ui/LetterWaveLink";
import { ScrollRevealWords } from "@/components/ui/ScrollRevealWords";
import { aboutContent } from "@/lib/data/about";
import { cn } from "@/lib/utils";

import {
  ABOUT_BODY,
  ABOUT_BODY_STACK,
  ABOUT_CTA_BUTTON,
  ABOUT_CTA_LABEL,
  ABOUT_CTA_WRAP,
  ABOUT_HEADLINE,
  ABOUT_INNER,
  ABOUT_LOGO_TICKER,
  ABOUT_LOGO_TICKER_IMAGE,
  ABOUT_LOGO_TICKER_ITEM,
  ABOUT_LOGO_TICKER_ROW,
  ABOUT_SECTION,
} from "./about-styles";

// ——— Main section ———

export default function AboutSection() {
  const { headline, paragraphs, logos, ctaLabel } = aboutContent;

  return (
    <section
      id="about"
      aria-labelledby="about-headline"
      className={cn(ABOUT_SECTION)}
    >
      <div className={cn(ABOUT_INNER)}>
        <ScrollRevealWords
          id="about-headline"
          text={headline}
          className={cn(ABOUT_HEADLINE)}
        />

        <div className={cn(ABOUT_BODY_STACK)}>
          {paragraphs.map((paragraph) => (
            <ScrollRevealWords
              key={paragraph}
              text={paragraph}
              className={cn(ABOUT_BODY)}
            />
          ))}
        </div>

        <div className={cn(ABOUT_LOGO_TICKER)}>
          <ul aria-label="Client logos" className={cn(ABOUT_LOGO_TICKER_ROW)}>
            {logos.map((logo) => (
              <li key={logo.name} className={cn(ABOUT_LOGO_TICKER_ITEM)}>
                <Image
                  alt={`${logo.name} logo`}
                  className={cn(ABOUT_LOGO_TICKER_IMAGE)}
                  height={logo.height}
                  src={logo.src}
                  width={logo.width}
                />
              </li>
            ))}
          </ul>

          <div className={cn(ABOUT_CTA_WRAP)}>
            <GlassSurface className="inline-flex rounded-full bg-neutral-950">
              <LetterWaveLink
                href="#"
                label={ctaLabel}
                className={cn(ABOUT_CTA_LABEL, ABOUT_CTA_BUTTON)}
              />
            </GlassSurface>
          </div>
        </div>
      </div>
    </section>
  );
}
