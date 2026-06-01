/**
 * @file image-gallery-layout.ts
 * @description Bento collage grid — slot shapes tuned so `object-cover` crops look natural.
 */

/** Desktop bento (4×8) — tall side columns, wide center feature, square accents. */
export const COLLAGE_DESKTOP_TEMPLATE_AREAS = `
  "a   b   c   h"
  "a   b   c   h"
  "a   i   i   h"
  "a   i   i   h"
  "e   i   i   h"
  "e   f   g   h"
  "e   f   j   k"
  "l   m   j   k"
`;

/** Mobile — twelve even tiles (2×6) for consistent full-bleed crops. */
export const COLLAGE_MOBILE_TEMPLATE_AREAS = `
  "a   b"
  "c   d"
  "e   f"
  "g   h"
  "i   j"
  "k   l"
`;

/**
 * Maps collage index → desktop grid area.
 * Keep in sync with `imageGalleryContent.images` order.
 */
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
export const COLLAGE_MOBILE_ROWS = "repeat(6, minmax(0, 1fr))";
