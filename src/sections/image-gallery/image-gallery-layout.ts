/**
 * @file image-gallery-layout.ts
 * @description Fixed bento collage grid placements for the scroll-driven image gallery.
 */

/** Twelve unique grid areas — desktop template (reference-style bento). */
export const COLLAGE_DESKTOP_TEMPLATE_AREAS = `
  "a b c h"
  "a b c h"
  "a i i h"
  "a i i h"
  "e i i h"
  "e f g h"
  "e f j k"
  "l m j k"
`;

/** Twelve unique grid areas — simplified two-column mobile layout. */
export const COLLAGE_MOBILE_TEMPLATE_AREAS = `
  "a a"
  "b c"
  "d e"
  "f g"
  "h i"
  "j k"
  "l l"
`;

/** Maps each of the 12 stream indices to its `grid-area` name (desktop). */
export const COLLAGE_DESKTOP_SLOT_AREAS: readonly string[] = [
  "a",
  "b",
  "c",
  "h",
  "i",
  "e",
  "f",
  "g",
  "j",
  "k",
  "l",
  "m",
];

/** Maps each stream index to its `grid-area` name (mobile). */
export const COLLAGE_MOBILE_SLOT_AREAS: readonly string[] = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
];

export const COLLAGE_DESKTOP_COLUMNS = "repeat(4, minmax(0, 1fr))";
export const COLLAGE_DESKTOP_ROWS = "repeat(8, minmax(0, 1fr))";
export const COLLAGE_MOBILE_COLUMNS = "repeat(2, minmax(0, 1fr))";
export const COLLAGE_MOBILE_ROWS = "repeat(7, minmax(0, 1fr))";
