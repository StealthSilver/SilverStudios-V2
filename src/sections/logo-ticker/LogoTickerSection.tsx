/**
 * @file LogoTickerSection.tsx
 * @description Client logo marquee — placeholder shell below the hero.
 */

import { ScrollRevealWords } from "@/components/ui/ScrollRevealWords";
import { logoTickerContent } from "@/lib/data/logo-ticker";
import { cn } from "@/lib/utils";

import { LogoTickerClientLogos } from "./LogoTickerClientLogos";
import {
  LOGO_TICKER_CTA,
  LOGO_TICKER_FOOTER,
  LOGO_TICKER_HEADLINE,
  LOGO_TICKER_HEADLINE_OFFSET,
  LOGO_TICKER_SECTION,
} from "./logo-ticker-styles";

// ——— Main section ———

export default function LogoTickerSection() {
  return (
    <section aria-label="Client partnerships" className={cn(LOGO_TICKER_SECTION)}>
      <ScrollRevealWords
        text={logoTickerContent.headline}
        className={cn(LOGO_TICKER_HEADLINE, LOGO_TICKER_HEADLINE_OFFSET)}
      />

      <div className={cn(LOGO_TICKER_FOOTER)}>
        <LogoTickerClientLogos logos={logoTickerContent.logos} />
        <ScrollRevealWords
          text={logoTickerContent.cta}
          className={cn(LOGO_TICKER_CTA)}
        />
      </div>
    </section>
  );
}
