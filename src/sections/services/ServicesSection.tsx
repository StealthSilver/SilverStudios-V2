/**
 * @file ServicesSection.tsx
 * @description Services showcase — Studio Namma-style stacked list with Silver Studios styling.
 */

import Link from "next/link";

import { ScrollRevealWords } from "@/components/ui/ScrollRevealWords";
import { servicesContent } from "@/lib/data/services";
import { cn } from "@/lib/utils";

import { ServiceListItem } from "./ServiceListItem";
import {
  SERVICES_HEADLINE,
  SERVICES_HEADLINE_WRAP,
  SERVICES_INNER,
  SERVICES_LIST,
  SERVICES_SECTION,
  SERVICES_SEE_ALL,
  SERVICES_SEE_ALL_ARROW,
  SERVICES_SEE_ALL_HIDDEN,
  SERVICES_SEE_ALL_WRAP,
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

        {!SERVICES_SEE_ALL_HIDDEN && (
          <div className={cn(SERVICES_SEE_ALL_WRAP)}>
            <Link href={seeAllHref} className={cn(SERVICES_SEE_ALL)}>
              <span>{seeAllLabel}</span>
              <span className={cn(SERVICES_SEE_ALL_ARROW)} aria-hidden>
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
