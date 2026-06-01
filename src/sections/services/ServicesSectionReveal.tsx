/**
 * @file ServicesSectionReveal.tsx
 * @description Services block with unified section scroll reveal (headline, list, CTA).
 */

"use client";

import { GlassSurface } from "@/components/ui/GlassSurface";
import { LetterWaveLink } from "@/components/ui/LetterWaveLink";
import { ScrollRevealGroup } from "@/components/ui/ScrollRevealGroup";
import { cn } from "@/lib/utils";
import type { ServiceItem } from "@/types/services";

import { ServiceListItem } from "./ServiceListItem";
import {
  SERVICES_CTA_BUTTON,
  SERVICES_CTA_LABEL,
  SERVICES_CTA_WRAP,
  SERVICES_HEADLINE,
  SERVICES_HEADLINE_WRAP,
  SERVICES_INNER,
  SERVICES_LIST,
  SERVICES_SCROLL_REVEAL_END_RATIO,
  SERVICES_SCROLL_REVEAL_START_RATIO,
} from "./services-styles";

const SERVICES_SCROLL_REVEAL_ITEM =
  "scroll-reveal-word flex h-full w-full items-center justify-center";

const SERVICES_TITLE_WORD =
  "scroll-reveal-word inline-block";

function splitWordTokens(text: string): string[] {
  return text.split(/(\s+)/).filter((token) => token.length > 0);
}

function isWhitespace(token: string): boolean {
  return /^\s+$/.test(token);
}

interface ServicesSectionRevealProps {
  title: string;
  items: readonly ServiceItem[];
  seeAllLabel: string;
  seeAllHref: string;
}

export function ServicesSectionReveal({
  title,
  items,
  seeAllLabel,
  seeAllHref,
}: ServicesSectionRevealProps) {
  const titleTokens = splitWordTokens(title);
  let titleWordIndex = 0;
  const listRevealStart = titleTokens.filter((token) => !isWhitespace(token)).length;
  const ctaRevealIndex = listRevealStart + items.length;

  return (
    <ScrollRevealGroup
      className={cn(SERVICES_INNER)}
      revealMode="section"
      revealStartRatio={SERVICES_SCROLL_REVEAL_START_RATIO}
      revealEndRatio={SERVICES_SCROLL_REVEAL_END_RATIO}
    >
      <p
        id="services-title"
        className={cn(SERVICES_HEADLINE, SERVICES_HEADLINE_WRAP)}
      >
        {titleTokens.map((token, index) => {
          if (isWhitespace(token)) {
            return token;
          }

          const revealIndex = titleWordIndex;
          titleWordIndex += 1;

          return (
            <span
              key={`${token}-${index}`}
              className={SERVICES_TITLE_WORD}
              data-scroll-reveal-word=""
              data-scroll-reveal-index={revealIndex}
            >
              {token}
            </span>
          );
        })}
      </p>

      <ul className={cn(SERVICES_LIST)}>
        {items.map((item, index) => (
          <ServiceListItem
            key={item.id}
            item={item}
            scrollRevealIndex={listRevealStart + index}
          />
        ))}
      </ul>

      <div className={cn(SERVICES_CTA_WRAP)}>
        <div
          className={SERVICES_SCROLL_REVEAL_ITEM}
          data-scroll-reveal-word=""
          data-scroll-reveal-index={ctaRevealIndex}
        >
          <GlassSurface className="inline-flex rounded-full bg-neutral-950">
            <LetterWaveLink
              href={seeAllHref}
              label={seeAllLabel}
              className={cn(SERVICES_CTA_LABEL, SERVICES_CTA_BUTTON)}
            />
          </GlassSurface>
        </div>
      </div>
    </ScrollRevealGroup>
  );
}
