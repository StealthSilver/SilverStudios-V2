/**
 * @file ProjectsSection.tsx
 * @description Featured projects — Clay-style asymmetric work grid on a light panel.
 */

import { ScrollRevealWords } from "@/components/ui/ScrollRevealWords";
import { projectsContent } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

import { ProjectsGrid } from "./ProjectsGrid";
import {
  PROJECTS_INNER,
  PROJECTS_SECTION,
  PROJECTS_TITLE,
  PROJECTS_TITLE_WRAP,
} from "./projects-styles";

// ——— Main section ———

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className={cn(PROJECTS_SECTION)}
    >
      <div className={cn(PROJECTS_INNER)}>
        <div className={cn(PROJECTS_TITLE_WRAP)}>
          <ScrollRevealWords
            id="projects-title"
            text={projectsContent.title}
            className={cn(PROJECTS_TITLE)}
          />
        </div>

        <ProjectsGrid projects={projectsContent.projects} />
      </div>
    </section>
  );
}
