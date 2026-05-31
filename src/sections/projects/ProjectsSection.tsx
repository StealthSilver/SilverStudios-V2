/**
 * @file ProjectsSection.tsx
 * @description Cuberto-style featured projects — staggered grid on a light panel.
 */

import { projectsContent } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

import { ProjectsGrid } from "./ProjectsGrid";
import { PROJECTS_INNER, PROJECTS_SECTION, PROJECTS_TITLE } from "./projects-styles";

// ——— Main section ———

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className={cn(PROJECTS_SECTION)}
    >
      <div className={cn(PROJECTS_INNER)}>
        <h2 id="projects-title" className={cn(PROJECTS_TITLE)}>
          {projectsContent.title}
        </h2>

        <ProjectsGrid projects={projectsContent.projects} />
      </div>
    </section>
  );
}
