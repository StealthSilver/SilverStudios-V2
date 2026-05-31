/**
 * @file projects.ts
 * @description Shared types for the projects showcase section.
 */

/** Clay-style card width in the work grid. */
export type ProjectCardSize = "small" | "medium" | "large";

/** Vertical alignment when paired beside another card. */
export type ProjectCardAlign = "top" | "bottom";

export interface ProjectLayout {
  size: ProjectCardSize;
  align?: ProjectCardAlign;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  layout: ProjectLayout;
  href?: string;
}

export interface ProjectsContent {
  title: string;
  projects: readonly Project[];
}
