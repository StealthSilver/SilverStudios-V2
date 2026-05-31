/**
 * @file ProjectsGrid.tsx
 * @description Clay-style flex-wrap project grid with scroll reveal.
 */

"use client";

import { useEffect, useRef, useState } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useProjectCardsScroll } from "@/hooks/useProjectCardsScroll";
import { cn } from "@/lib/utils";

import type { Project } from "@/types/projects";

import { ProjectCard } from "./ProjectCard";
import { PROJECTS_GRID } from "./projects-styles";

// ——— Types ———

interface ProjectsGridProps {
  projects: readonly Project[];
}

// ——— Main component ———

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const gridRef = useRef<HTMLUListElement>(null);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    setIsEnhanced(true);
  }, []);

  const scrollEnabled = isEnhanced && !prefersReducedMotion;
  useProjectCardsScroll(gridRef, scrollEnabled);

  return (
    <ul ref={gridRef} className={cn(PROJECTS_GRID)}>
      {projects.map((project) => (
        <li key={project.id} className="contents">
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
