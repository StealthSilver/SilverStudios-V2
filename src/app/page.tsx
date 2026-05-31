/**
 * @file page.tsx
 * @description Root page — imports sections only, zero business logic.
 */

import {
  AboutSection,
  FooterInviteTransition,
  FooterScrollSection,
  HeroNavbar,
  HeroTickerScrollTransition,
  ProjectsSection,
  ServicesSection,
  SilverUISection,
  FeaturedNewsSection,
} from "@/sections";
import { FEATURED_NEWS_SECTION_HIDDEN } from "@/sections/featured-news/featured-news-styles";
import { SILVER_UI_SECTION_HIDDEN } from "@/sections/silver-ui/silver-ui-styles";
import { getFractionalHour } from "@/lib/hero-time";

export const dynamic = "force-dynamic";

export default function Home() {
  // Round to the nearest minute so SSR HTML matches the client hydration snapshot.
  const initialHeroHour = Math.round(getFractionalHour() * 60) / 60;

  return (
    <>
      <HeroNavbar />
      <HeroTickerScrollTransition initialHeroHour={initialHeroHour} />
      <div className="relative z-10 bg-white">
        <AboutSection />
        <ProjectsSection />
        <ServicesSection />
        {!FEATURED_NEWS_SECTION_HIDDEN && <FeaturedNewsSection />}
        {!SILVER_UI_SECTION_HIDDEN && <SilverUISection />}
        <FooterInviteTransition />
        <FooterScrollSection />
      </div>
    </>
  );
}
