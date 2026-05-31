/**
 * @file SilverUISection.tsx
 * @description Silver UI showcase — full-viewport shell below services.
 */

import { silverUiContent } from "@/lib/data/silver-ui";
import { cn } from "@/lib/utils";

const SECTION_SHELL =
  "flex h-screen flex-col items-start justify-start bg-white px-4 py-12 sm:px-6 sm:py-14 md:px-9 md:py-16";

const SECTION_TITLE =
  "font-display text-3xl font-normal tracking-tight text-neutral-900 sm:text-4xl md:text-5xl";

// ——— Main section ———

export default function SilverUISection() {
  return (
    <section
      id="silver-ui"
      aria-labelledby="silver-ui-title"
      className={cn(SECTION_SHELL)}
    >
      <h2 id="silver-ui-title" className={cn(SECTION_TITLE)}>
        {silverUiContent.title}
      </h2>
    </section>
  );
}
