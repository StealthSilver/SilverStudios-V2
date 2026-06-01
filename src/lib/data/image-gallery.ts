/**
 * @file image-gallery.ts
 * @description Image gallery section copy and slideshow assets.
 */

import type { ImageGalleryContent } from "@/types";

/**
 * Twelve images in desktop slot order (`COLLAGE_DESKTOP_SLOT_AREAS`).
 * Each tile uses object-cover; slots are sized to limit harsh cropping.
 */
export const imageGalleryContent = {
  title: "OUR VISUAL SHOWCASE",
  subtitle:
    "A quick carousel of recent creative frames. Use the left and right controls to explore each image.",
  images: [
    {
      id: "gallery-image-4",
      alt: "Waterfront walkway with mural architecture at golden hour",
      src: "/Images/image4.jpeg",
      width: 736,
      height: 1308,
      objectPosition: "center 35%",
    },
    {
      id: "gallery-image-9",
      alt: "Square creative frame",
      src: "/Images/image9.png",
      width: 1254,
      height: 1254,
    },
    {
      id: "gallery-image-12",
      alt: "Square creative frame",
      src: "/Images/image12.png",
      width: 1200,
      height: 1200,
    },
    {
      id: "gallery-image-7",
      alt: "Creative studio visual",
      src: "/Images/image7.png",
      width: 1149,
      height: 1369,
      objectPosition: "center 30%",
    },
    {
      id: "gallery-image-6",
      alt: "Black backpack with minimalist logo on a white desk",
      src: "/Images/image6.png",
      width: 1200,
      height: 670,
      objectPosition: "center 45%",
    },
    {
      id: "gallery-image-1",
      alt: "Paint-by-numbers floral still life with vases on a table",
      src: "/Images/image1.jpeg",
      width: 1133,
      height: 1339,
      objectPosition: "center 40%",
    },
    {
      id: "gallery-image-8",
      alt: "Technical clock face with Arabic numerals and Roman numerals on blue",
      src: "/Images/image8.png",
      width: 317,
      height: 311,
    },
    {
      id: "gallery-image-5",
      alt: "Developer workspace with laptop and external monitor displaying code",
      src: "/Images/image5.jpeg",
      width: 736,
      height: 981,
      objectPosition: "center 35%",
    },
    {
      id: "gallery-image-2",
      alt: "Colorful mini canvas paintings arranged on a gallery wall",
      src: "/Images/image2.jpeg",
      width: 736,
      height: 981,
      objectPosition: "center 35%",
    },
    {
      id: "gallery-image-3",
      alt: "Black and white photograph of a branded ceramic mug on wood",
      src: "/Images/image3.jpeg",
      width: 1316,
      height: 1195,
    },
    {
      id: "gallery-image-10",
      alt: "Creative studio visual",
      src: "/Images/image10.png",
      width: 1466,
      height: 970,
      objectPosition: "center 50%",
    },
    {
      id: "gallery-image-11",
      alt: "Creative studio visual",
      src: "/Images/image11.png",
      width: 1200,
      height: 904,
      objectPosition: "center 45%",
    },
  ],
} satisfies ImageGalleryContent;
