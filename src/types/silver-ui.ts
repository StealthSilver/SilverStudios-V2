/**
 * @file silver-ui.ts
 * @description Shared types for the Silver UI section.
 */

export interface SilverUiImage {
  id: string;
  name: string;
  src: string;
  alt: string;
  line: string;
  width: number;
  height: number;
}

export interface SilverUiContent {
  title: string;
  autoplayIntervalMs: number;
  ctaLabel: string;
  ctaHref: string;
  images: readonly SilverUiImage[];
}
