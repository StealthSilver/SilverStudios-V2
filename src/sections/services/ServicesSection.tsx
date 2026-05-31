/**
 * @file ServicesSection.tsx
 * @description Services showcase — full-viewport shell below projects.
 */

import { servicesContent } from "@/lib/data/services";
import { cn } from "@/lib/utils";

const SECTION_SHELL =
  "flex h-screen flex-col items-start justify-start bg-white px-4 py-12 sm:px-6 sm:py-14 md:px-9 md:py-16";

const SECTION_TITLE =
  "font-display text-3xl font-normal tracking-tight text-neutral-900 sm:text-4xl md:text-5xl";

// ——— Main section ———

export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className={cn(SECTION_SHELL)}
    >
      <h2 id="services-title" className={cn(SECTION_TITLE)}>
        {servicesContent.title}
      </h2>
    </section>
  );
}
