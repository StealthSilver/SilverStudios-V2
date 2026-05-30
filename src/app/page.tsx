/**
 * @file page.tsx
 * @description Root page — imports sections only, zero business logic.
 */

import { HeroNavbar, HeroTickerScrollTransition } from "@/sections";

export default function Home() {
  return (
    <>
      <HeroNavbar />
      <HeroTickerScrollTransition />
    </>
  );
}
