/**
 * @file projects.ts
 * @description Shared types for the projects showcase section.
 */

export interface Project {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  href?: string;
}

export interface ProjectsContent {
  title: string;
  projects: readonly Project[];
}
