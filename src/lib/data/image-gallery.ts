/**
 * @file image-gallery.ts
 * @description Image gallery section copy and slideshow assets.
 */

import type { ImageGalleryContent } from "@/types";

export const imageGalleryContent = {
  title: "OUR VISUAL SHOWCASE",
  subtitle:
    "A quick carousel of recent creative frames. Use the left and right controls to explore each image.",
  images: [
    {
      id: "gallery-image-1",
      alt: "Paint-by-numbers floral still life with vases on a table",
      src: "/Images/image1.jpeg",
    },
    {
      id: "gallery-image-2",
      alt: "Colorful mini canvas paintings arranged on a gallery wall",
      src: "/Images/image2.jpeg",
    },
    {
      id: "gallery-image-3",
      alt: "Black and white photograph of a branded ceramic mug on wood",
      src: "/Images/image3.jpeg",
    },
    {
      id: "gallery-image-4",
      alt: "Waterfront walkway with mural architecture at golden hour",
      src: "/Images/image4.jpeg",
    },
    {
      id: "gallery-image-5",
      alt: "Developer workspace with laptop and external monitor displaying code",
      src: "/Images/image5.jpeg",
    },
    {
      id: "gallery-image-6",
      alt: "LEGO Batman minifigure on textured fabric",
      src: "/Images/image6.jpeg",
    },
  ],
} satisfies ImageGalleryContent;
