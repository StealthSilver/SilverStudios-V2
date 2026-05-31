/**
 * @file about.ts
 * @description Shared types for the about section.
 */

import type { ClientLogo } from "./logo-ticker";

export interface AboutContent {
  headline: string;
  paragraphs: readonly string[];
  logos: readonly ClientLogo[];
  ctaLabel: string;
}
