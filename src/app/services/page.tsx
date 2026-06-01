/**
 * @file page.tsx
 * @description Services route.
 */

import { FooterSection, HeroNavbar, ServicesSection } from "@/sections";

export default function ServicesPage() {
  return (
    <>
      <HeroNavbar />
      <div className="relative z-10 bg-white pt-20">
        <ServicesSection />
      </div>
      <FooterSection />
    </>
  );
}
