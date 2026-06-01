/**
 * @file page.tsx
 * @description Workflow route.
 */

import { FooterSection, HeroNavbar } from "@/sections";
import { workflowPageContent } from "@/lib/data/workflow";

export default function WorkflowPage() {
  const { title, description } = workflowPageContent;

  return (
    <>
      <HeroNavbar />
      <section
        id="workflow"
        className="relative z-10 bg-white px-4 pb-16 pt-28 sm:px-6 md:px-9"
      >
        <div className="mx-auto w-full max-w-3xl">
          <h1 className="font-display text-4xl font-normal tracking-tight text-neutral-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            {description}
          </p>
        </div>
      </section>
      <FooterSection />
    </>
  );
}
