/**
 * @file ImageGallerySection.tsx
 * @description Post-hero image gallery carousel on a clean white backdrop.
 */

import { imageGalleryContent } from "@/lib/data";
import { cn } from "@/lib/utils";

import { ImageGalleryCarousel } from "./ImageGalleryCarousel";
import {
  IMAGE_GALLERY_CAROUSEL_WRAP,
  IMAGE_GALLERY_INNER,
  IMAGE_GALLERY_SECTION,
} from "./image-gallery-styles";

// ——— Main section ———

export default function ImageGallerySection() {
  return (
    <section
      id="image-gallery"
      aria-labelledby="image-gallery-title"
      className={cn(IMAGE_GALLERY_SECTION)}
    >
      <div className={cn(IMAGE_GALLERY_INNER)}>
        <h2 id="image-gallery-title" className="sr-only">
          {imageGalleryContent.title}
        </h2>

        <div className={cn(IMAGE_GALLERY_CAROUSEL_WRAP)}>
          <ImageGalleryCarousel images={imageGalleryContent.images} />
        </div>
      </div>
    </section>
  );
}
