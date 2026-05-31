/**
 * @file FeaturedNewsSection.tsx
 * @description Featured news — full-viewport shell below Silver UI.
 */

import { featuredNewsContent } from "@/lib/data/featured-news";
import { cn } from "@/lib/utils";

const SECTION_SHELL =
  "flex h-screen flex-col items-start justify-start bg-white px-4 py-12 sm:px-6 sm:py-14 md:px-9 md:py-16";

const SECTION_INNER = "mx-auto w-full max-w-7xl";

const SECTION_TITLE =
  "font-display text-3xl font-normal tracking-tight text-neutral-900 sm:text-4xl md:text-5xl";

// ——— Main section ———

export default function FeaturedNewsSection() {
  return (
    <section
      id="featured-news"
      aria-labelledby="featured-news-title"
      className={cn(SECTION_SHELL)}
    >
      <div className={cn(SECTION_INNER)}>
        <h2 id="featured-news-title" className={cn(SECTION_TITLE)}>
          {featuredNewsContent.title}
        </h2>
      </div>
    </section>
  );
}
