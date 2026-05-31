/**
 * @file ServicesSection.tsx
 * @description Services showcase — Studio Namma-style stacked list with Silver Studios styling.
 */

import { GlassSurface } from "@/components/ui/GlassSurface";
import { LetterWaveLink } from "@/components/ui/LetterWaveLink";
import { ScrollRevealWords } from "@/components/ui/ScrollRevealWords";
import { servicesContent } from "@/lib/data/services";
import { cn } from "@/lib/utils";

import { ServiceListItem } from "./ServiceListItem";
import {
  SERVICES_CTA_BUTTON,
  SERVICES_CTA_LABEL,
  SERVICES_CTA_WRAP,
  SERVICES_HEADLINE,
  SERVICES_HEADLINE_WRAP,
  SERVICES_INNER,
  SERVICES_LIST,
  SERVICES_SECTION,
} from "./services-styles";

// ——— Main section ———

export default function ServicesSection() {
  const { title, items, seeAllLabel, seeAllHref } = servicesContent;

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className={cn(SERVICES_SECTION)}
    >
      <div className={cn(SERVICES_INNER)}>
        <ScrollRevealWords
          id="services-title"
          text={title}
          className={cn(SERVICES_HEADLINE, SERVICES_HEADLINE_WRAP)}
        />

        <ul className={cn(SERVICES_LIST)}>
          {items.map((item) => (
            <ServiceListItem key={item.id} item={item} />
          ))}
        </ul>

        <div className={cn(SERVICES_CTA_WRAP)}>
          <GlassSurface className="inline-flex rounded-full bg-neutral-950">
            <LetterWaveLink
              href={seeAllHref}
              label={seeAllLabel}
              className={cn(SERVICES_CTA_LABEL, SERVICES_CTA_BUTTON)}
            />
          </GlassSurface>
        </div>
      </div>
    </section>
  );
}
