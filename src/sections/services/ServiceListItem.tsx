/**
 * @file ServiceListItem.tsx
 * @description Single service row — large primary label with secondary tag (Namma-style).
 */

import { cn } from "@/lib/utils";
import type { ServiceItem } from "@/types/services";

import {
  SERVICES_ITEM,
  SERVICES_ITEM_INNER,
  SERVICES_ITEM_MEDIA,
  SERVICES_ITEM_MEDIA_GRADIENT,
  SERVICES_ITEM_PRIMARY,
  SERVICES_ITEM_SECONDARY,
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
      <ServiceHoverMedia id={item.id} />

      <div className={cn(SERVICES_ITEM_INNER)}>
        <p className={cn(SERVICES_ITEM_PRIMARY)}>{item.primary}</p>
        <p className={cn(SERVICES_ITEM_SECONDARY_MOBILE)}>{item.secondary}</p>
        <p className={cn(SERVICES_ITEM_SECONDARY)} aria-hidden>
          {item.secondary}
        </p>
      </div>
    </li>
  );
}
