/**
 * @file ProjectsSection.tsx
 * @description Featured projects — Clay-style asymmetric work grid on a light panel.
 */

import { GlassSurface } from "@/components/ui/GlassSurface";
import { LetterWaveLink } from "@/components/ui/LetterWaveLink";
import { ScrollRevealWords } from "@/components/ui/ScrollRevealWords";
import { projectsContent } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

import { ProjectsGrid } from "./ProjectsGrid";
import {
  PROJECTS_CTA_BUTTON,
  PROJECTS_CTA_LABEL,
  PROJECTS_CTA_WRAP,
  PROJECTS_INNER,
  PROJECTS_SECTION,
  PROJECTS_TITLE,
  PROJECTS_TITLE_WRAP,
} from "./projects-styles";

// ——— Main section ———

export default function ProjectsSection() {
  const { title, projects, ctaLabel, ctaHref } = projectsContent;

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
            text={title}
            className={cn(PROJECTS_TITLE)}
          />
        </div>

        <ProjectsGrid projects={projects} />

        <div className={cn(PROJECTS_CTA_WRAP)}>
          <GlassSurface className="inline-flex rounded-full bg-neutral-950">
            <LetterWaveLink
              href={ctaHref}
              label={ctaLabel}
              className={cn(PROJECTS_CTA_LABEL, PROJECTS_CTA_BUTTON)}
            />
          </GlassSurface>
        </div>
      </div>
    </section>
  );
}
