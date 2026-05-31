/**
 * @file image-gallery.ts
 * @description Shared types for the post-hero image gallery carousel.
 */

export interface GalleryImage {
  id: string;
  alt: string;
  src: string;
}

export interface ImageGalleryContent {
  title: string;
  subtitle: string;
  images: readonly GalleryImage[];
}
