/**
 * @file page.tsx
 * @description Projects route.
 */

import { FooterSection, HeroNavbar, ProjectsSection } from "@/sections";

export default function ProjectsPage() {
  return (
    <>
      <HeroNavbar />
      <div className="relative z-10 bg-white pt-20">
        <ProjectsSection />
      </div>
      <FooterSection />
    </>
  );
}
