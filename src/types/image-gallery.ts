/**
 * @file image-gallery.ts
 * @description Shared types for the post-hero image gallery carousel.
 */

export interface GalleryImage {
  id: string;
  alt: string;
  src: string;
  width: number;
  height: number;
  /** CSS object-position for cover crops (default `center`). */
  objectPosition?: string;
}

export interface ImageGalleryContent {
  title: string;
  subtitle: string;
  images: readonly GalleryImage[];
}
