/**
 * @file ServiceListItem.tsx
 * @description Single service row — large primary label with secondary tag (Namma-style).
 */

"use client";

import { ScrollRevealWords } from "@/components/ui/ScrollRevealWords";
import { cn } from "@/lib/utils";
import type { ServiceItem } from "@/types/services";

import {
  SERVICES_ITEM,
  SERVICES_ITEM_INNER,
  SERVICES_ITEM_MEDIA,
  SERVICES_ITEM_MEDIA_GRADIENT,
  SERVICES_ITEM_MEDIA_HIDDEN,
  SERVICES_ITEM_PRIMARY,
  SERVICES_ITEM_SECONDARY,
  SERVICES_ITEM_SECONDARY_HIDDEN,
  SERVICES_ITEM_SECONDARY_MOBILE,
} from "./services-styles";

// ——— Types ———

interface ServiceListItemProps {
  item: ServiceItem;
}

// ——— Local sub-components ———

function ServiceHoverMedia({ id }: { id: string }) {
  return (
    <div
      className={cn(SERVICES_ITEM_MEDIA)}
      aria-hidden
      data-service-id={id}
    >
      <div className={cn(SERVICES_ITEM_MEDIA_GRADIENT)} />
    </div>
  );
}

// ——— Main component ———

export function ServiceListItem({ item }: ServiceListItemProps) {
  return (
    <li className={cn(SERVICES_ITEM)}>
      {!SERVICES_ITEM_MEDIA_HIDDEN && <ServiceHoverMedia id={item.id} />}

      <div className={cn(SERVICES_ITEM_INNER)}>
        <ScrollRevealWords
          text={item.primary}
          className={cn(SERVICES_ITEM_PRIMARY)}
        />
        {!SERVICES_ITEM_SECONDARY_HIDDEN && (
          <>
            <ScrollRevealWords
              text={item.secondary}
              className={cn(SERVICES_ITEM_SECONDARY_MOBILE)}
            />
            <ScrollRevealWords
              text={item.secondary}
              className={cn(SERVICES_ITEM_SECONDARY)}
              aria-hidden
            />
          </>
        )}
      </div>
    </li>
  );
}
