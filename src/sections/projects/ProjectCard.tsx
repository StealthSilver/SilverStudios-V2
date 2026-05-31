/**
 * @file ProjectCard.tsx
 * @description Single featured project card with Cuberto-style hover treatment.
 */

"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

import type { Project } from "@/types/projects";

import {
  PROJECT_CARD,
  PROJECT_CARD_CAPTION,
  PROJECT_CARD_DESCRIPTION,
  PROJECT_CARD_HARIT,
  PROJECT_CARD_MEDIA,
  PROJECT_CARD_NAME,
  PROJECTS_CARD_STACK,
} from "./projects-styles";

// ——— Types ———

interface ProjectCardProps {
  project: Project;
  column: "left" | "right";
}

// ——— Main component ———

export function ProjectCard({ project, column }: ProjectCardProps) {
  const content = (
    <>
      <div className={cn(PROJECT_CARD_MEDIA)}>
        <Image
          src={project.imageSrc}
          alt={`${project.name} project preview`}
          width={project.imageWidth}
          height={project.imageHeight}
          className="project-card__image h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, 44vw"
        />
        <span aria-hidden className="project-card__overlay" />
      </div>
      <p className={cn(PROJECT_CARD_CAPTION)}>
        <span className={cn(PROJECT_CARD_NAME)}>{project.name}</span>
        {" – "}
        <span className={cn(PROJECT_CARD_DESCRIPTION)}>
          {project.description}
        </span>
      </p>
    </>
  );

  const sharedProps = {
    className: cn(
      PROJECT_CARD,
      PROJECTS_CARD_STACK,
      project.id === "harit" && PROJECT_CARD_HARIT,
    ),
    "data-project-card": "",
    "data-project-column": column,
  };

  if (project.href) {
    return (
      <a href={project.href} {...sharedProps}>
        {content}
      </a>
    );
  }

  return (
    <article {...sharedProps}>
      {content}
    </article>
  );
}
