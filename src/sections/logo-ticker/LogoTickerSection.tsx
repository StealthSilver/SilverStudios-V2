/**
 * @file LogoTickerSection.tsx
 * @description Client logo marquee — placeholder shell below the hero.
 */

import { logoTickerContent } from "@/lib/data/logo-ticker";
import { cn } from "@/lib/utils";

// ——— Main section ———

export default function LogoTickerSection() {
  return (
    <section
      aria-label="Client logos"
      className={cn("flex h-screen items-center justify-center bg-white")}
    >
      <p className="text-lg font-medium text-neutral-900">
        {logoTickerContent.placeholderLabel}
      </p>
    </section>
  );
}
