/**
 * @file HeroTickerScrollTransition.tsx
 * @description Hero with logo ticker in normal document flow below.
 */

import HeroSection from "../hero/HeroSection";
import { ImageGalleryCarousel } from "../image-gallery/ImageGalleryCarousel";
import LogoTickerSection from "../logo-ticker/LogoTickerSection";
import { LOGO_TICKER_SECTION_HIDDEN } from "../logo-ticker/logo-ticker-styles";
import { imageGalleryContent } from "@/lib/data";

// ——— Main section ———

interface HeroTickerScrollTransitionProps {
  initialHeroHour: number;
}

export default function HeroTickerScrollTransition({
  initialHeroHour,
}: HeroTickerScrollTransitionProps) {
  return (
    <>
      <HeroSection showNavbar={false} initialHeroHour={initialHeroHour} />
      <ImageGalleryCarousel images={imageGalleryContent.images} />
      {!LOGO_TICKER_SECTION_HIDDEN && (
        <section style={{ position: "relative", zIndex: 10 }}>
          <LogoTickerSection />
        </section>
      )}
    </>
  );
}
