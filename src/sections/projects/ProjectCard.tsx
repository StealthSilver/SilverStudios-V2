/**
 * @file ProjectCard.tsx
 * @description Single featured project card — Clay-style variable sizing and copy stack.
 */

"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

import type { Project, ProjectCardSize } from "@/types/projects";

import {
  PROJECT_CARD,
  PROJECT_CARD_ALIGN_BOTTOM,
  PROJECT_CARD_COPY,
  PROJECT_CARD_DESCRIPTION,
  PROJECT_CARD_MEDIA,
  PROJECT_CARD_MEDIA_LARGE,
  PROJECT_CARD_MEDIA_MEDIUM,
  PROJECT_CARD_MEDIA_SMALL,
  PROJECT_CARD_NAME,
  PROJECT_CARD_WIDTH_LARGE,
  PROJECT_CARD_WIDTH_MEDIUM,
  PROJECT_CARD_WIDTH_SMALL,
} from "./projects-styles";

// ——— Types ———

interface ProjectCardProps {
  project: Project;
}

// ——— Helpers ———

const PROJECT_CARD_MEDIA_BY_SIZE: Record<ProjectCardSize, string> = {
  small: PROJECT_CARD_MEDIA_SMALL,
  medium: PROJECT_CARD_MEDIA_MEDIUM,
  large: PROJECT_CARD_MEDIA_LARGE,
};

const PROJECT_CARD_WIDTH_BY_SIZE: Record<ProjectCardSize, string> = {
  small: PROJECT_CARD_WIDTH_SMALL,
  medium: PROJECT_CARD_WIDTH_MEDIUM,
  large: PROJECT_CARD_WIDTH_LARGE,
};

// ——— Main component ———

export function ProjectCard({ project }: ProjectCardProps) {
  const { size, align = "top" } = project.layout;

  const content = (
    <>
      <div
        className={cn(
          PROJECT_CARD_MEDIA,
          PROJECT_CARD_MEDIA_BY_SIZE[size],
        )}
      >
        <Image
          src={project.imageSrc}
          alt={`${project.name} project preview`}
          width={project.imageWidth}
          height={project.imageHeight}
          className="project-card__image h-full w-full object-cover"
          sizes={
            size === "large"
              ? "(max-width: 768px) 100vw, 80vw"
              : "(max-width: 768px) 100vw, 44vw"
          }
        />
        <span aria-hidden className="project-card__overlay" />
      </div>
      <div className={cn(PROJECT_CARD_COPY)}>
        <h3 className={cn(PROJECT_CARD_NAME)}>{project.name}</h3>
        <p className={cn(PROJECT_CARD_DESCRIPTION)}>{project.description}</p>
      </div>
    </>
  );

  const sharedProps = {
    className: cn(
      PROJECT_CARD,
      PROJECT_CARD_WIDTH_BY_SIZE[size],
      align === "bottom" && PROJECT_CARD_ALIGN_BOTTOM,
    ),
    "data-project-card": "",
    "data-project-size": size,
  };

  if (project.href) {
    return (
      <a href={project.href} {...sharedProps}>
        {content}
      </a>
    );
  }

  return <article {...sharedProps}>{content}</article>;
}
