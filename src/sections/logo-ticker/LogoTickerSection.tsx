/**
 * @file LogoTickerSection.tsx
 * @description Client logo marquee — placeholder shell below the hero.
 */

import { logoTickerContent } from "@/lib/data/logo-ticker";
import { cn } from "@/lib/utils";

// ——— Local sub-components ———

function LogoTickerHeadline({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "max-w-2xl font-display text-2xl font-normal leading-snug tracking-tight text-neutral-900 sm:max-w-3xl sm:text-3xl md:max-w-4xl md:text-4xl",
        className,
      )}
    >
      {logoTickerContent.headline}
    </p>
  );
}

// ——— Main section ———

export default function LogoTickerSection() {
  return (
    <section
      aria-label="Client logos"
      className={cn(
        "flex h-screen flex-col items-start justify-start bg-white px-4 pt-8 sm:px-6 sm:pt-10 md:px-9 md:pt-12",
      )}
    >
      <LogoTickerHeadline />
    </section>
  );
}
