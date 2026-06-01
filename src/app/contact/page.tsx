/**
 * @file page.tsx
 * @description Contact route.
 */

import { FooterSection, HeroNavbar } from "@/sections";

export default function ContactPage() {
  return (
    <>
      <HeroNavbar />
      <div className="min-h-[50vh] bg-white pt-20" aria-hidden />
      <FooterSection />
    </>
  );
}
