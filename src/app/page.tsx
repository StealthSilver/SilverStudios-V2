/**
 * @file page.tsx
 * @description Root page — imports sections only, zero business logic.
 */

import { HeroSection } from "@/sections";

export default function Home() {
  return (
    <>
      <HeroSection />
    </>
  );
}
