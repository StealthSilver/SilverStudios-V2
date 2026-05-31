/**
 * @file page.tsx
 * @description Root page — imports sections only, zero business logic.
 */

import {
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

export default function Home() {
  const initialHeroHour = getFractionalHour();

  return (
    <>
      <HeroNavbar />
      <HeroTickerScrollTransition initialHeroHour={initialHeroHour} />
      <ProjectsSection />
      <ServicesSection />
      <FeaturedNewsSection />
      <SilverUISection />
      <FooterInviteTransition />
      <FooterScrollSection />
    </>
  );
}
