/**
 * @file page.tsx
 * @description Root page — imports sections only, zero business logic.
 */

import {
  FooterInviteTransition,
  FooterSection,
  HeroNavbar,
  HeroTickerScrollTransition,
  ProjectsSection,
} from "@/sections";
import { getFractionalHour } from "@/lib/hero-time";

export default function Home() {
  const initialHeroHour = getFractionalHour();

  return (
    <>
      <HeroNavbar />
      <HeroTickerScrollTransition initialHeroHour={initialHeroHour} />
      <ProjectsSection />
      <FooterInviteTransition />
      <FooterSection />
    </>
  );
}
