/**
 * @file page.tsx
 * @description Blog route.
 */

import { FeaturedNewsSection, FooterSection, HeroNavbar } from "@/sections";

export default function BlogPage() {
  return (
    <>
      <HeroNavbar />
      <div className="relative z-10 bg-white pt-20">
        <FeaturedNewsSection />
      </div>
      <FooterSection />
    </>
  );
}
