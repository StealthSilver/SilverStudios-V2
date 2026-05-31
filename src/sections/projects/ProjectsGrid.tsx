/**
 * @file ProjectsGrid.tsx
 * @description Staggered two-column project grid with scroll reveal and parallax.
 */

"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useProjectCardsScroll } from "@/hooks/useProjectCardsScroll";
import { cn } from "@/lib/utils";

import type { Project } from "@/types/projects";

import { ProjectCard } from "./ProjectCard";
import {
  PROJECTS_COLUMN,
  PROJECTS_COLUMN_RIGHT,
  PROJECTS_GRID,
} from "./projects-styles";

// ——— Types ———

interface ProjectsGridProps {
  projects: readonly Project[];
}

interface ProjectColumns {
  left: Project[];
  right: Project[];
}

// ——— Helpers ———

function splitIntoColumns(projects: readonly Project[]): ProjectColumns {
  const left: Project[] = [];
  const right: Project[] = [];

  projects.forEach((project, index) => {
    if (index % 2 === 0) {
      left.push(project);
    } else {
      right.push(project);
    }
  });

  return { left, right };
}

// ——— Main component ———

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    setIsEnhanced(true);
  }, []);

  const scrollEnabled = isEnhanced && !prefersReducedMotion;
  useProjectCardsScroll(gridRef, scrollEnabled);

  const columns = useMemo(() => splitIntoColumns(projects), [projects]);

  return (
    <div ref={gridRef} className={cn(PROJECTS_GRID)}>
      <div className={cn(PROJECTS_COLUMN)}>
        {columns.left.map((project) => (
          <ProjectCard key={project.id} project={project} column="left" />
        ))}
      </div>

      <div className={cn(PROJECTS_COLUMN, PROJECTS_COLUMN_RIGHT)}>
        {columns.right.map((project) => (
          <ProjectCard key={project.id} project={project} column="right" />
        ))}
      </div>
    </div>
  );
}
