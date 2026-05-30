/**
 * @file page.tsx
 * @description Root page — imports sections only, zero business logic.
 */

import { HeroNavbar, HeroTickerScrollTransition } from "@/sections";
import { getFractionalHour } from "@/lib/hero-time";

export default function Home() {
  const initialHeroHour = getFractionalHour();

  return (
    <>
      <HeroNavbar />
      <HeroTickerScrollTransition initialHeroHour={initialHeroHour} />
    </>
  );
}
