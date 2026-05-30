/**
 * @file ProjectsSection.tsx
 * @description Projects showcase — full-viewport shell below the logo ticker.
 */

import { projectsContent } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

// ——— Main section ———

export default function ProjectsSection() {
  return (
    <section
      aria-labelledby="projects-title"
      className={cn(
        "flex h-screen flex-col items-start justify-start bg-white px-4 py-12 sm:px-6 sm:py-14 md:px-9 md:py-16",
      )}
    >
      <h2
        id="projects-title"
        className={cn(
          "font-display text-3xl font-normal tracking-tight text-neutral-900 sm:text-4xl md:text-5xl",
        )}
      >
        {projectsContent.title}
      </h2>
    </section>
  );
}
