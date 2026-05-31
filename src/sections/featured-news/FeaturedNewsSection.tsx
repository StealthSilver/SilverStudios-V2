/**
 * @file FeaturedNewsSection.tsx
 * @description Featured news section with interactive gradient-card carousel.
 */

import { featuredNewsContent } from "@/lib/data/featured-news";
import { cn } from "@/lib/utils";

import { FeaturedNewsCarousel } from "./FeaturedNewsCarousel";
import {
  FEATURED_NEWS_CAROUSEL_WRAP,
  FEATURED_NEWS_INNER,
  FEATURED_NEWS_SECTION,
  FEATURED_NEWS_TITLE,
} from "./featured-news-styles";

// ——— Main section ———

export default function FeaturedNewsSection() {
  return (
    <section
      id="featured-news"
      aria-labelledby="featured-news-title"
      className={cn(FEATURED_NEWS_SECTION)}
    >
      <div className={cn(FEATURED_NEWS_INNER)}>
        <h2 id="featured-news-title" className={cn(FEATURED_NEWS_TITLE)}>
          {featuredNewsContent.title}
        </h2>

        <div className={cn(FEATURED_NEWS_CAROUSEL_WRAP)}>
          <FeaturedNewsCarousel
            slides={featuredNewsContent.slides}
            ctaHref={featuredNewsContent.ctaHref}
            ctaLabel={featuredNewsContent.ctaLabel}
          />
        </div>
      </div>
    </section>
  );
}
