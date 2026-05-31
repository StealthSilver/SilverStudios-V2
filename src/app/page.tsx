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
import { getFractionalHour } from "@/lib/hero-time";

export const dynamic = "force-dynamic";

export default function Home() {
  // Round to the nearest minute so SSR HTML matches the client hydration snapshot.
  const initialHeroHour = Math.round(getFractionalHour() * 60) / 60;

  return (
    <>
      <HeroNavbar />
      <div className="overflow-x-clip">
        <HeroTickerScrollTransition initialHeroHour={initialHeroHour} />
        <div className="relative z-10 bg-white">
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />
          <FeaturedNewsSection />
          <SilverUISection />
          <FooterInviteTransition />
          <FooterScrollSection />
        </div>
      </div>
    </>
  );
}
