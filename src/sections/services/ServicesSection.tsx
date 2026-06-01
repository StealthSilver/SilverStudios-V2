/**
 * @file ServicesSection.tsx
 * @description Services showcase — Studio Namma-style stacked list with Silver Studios styling.
 */

import { servicesContent } from "@/lib/data/services";
import { cn } from "@/lib/utils";

import { ServicesSectionReveal } from "./ServicesSectionReveal";
import { SERVICES_SECTION } from "./services-styles";

// ——— Main section ———

export default function ServicesSection() {
  const { title, defaultImageSrc, items, seeAllLabel, seeAllHref } =
    servicesContent;

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className={cn(SERVICES_SECTION)}
    >
      <ServicesSectionReveal
        title={title}
        defaultImageSrc={defaultImageSrc}
        items={items}
        seeAllLabel={seeAllLabel}
        seeAllHref={seeAllHref}
      />
    </section>
  );
}
