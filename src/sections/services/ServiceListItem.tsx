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
  SERVICES_ITEM_MEDIA_HIDDEN,
  SERVICES_ITEM_PRIMARY,
  SERVICES_ITEM_SECONDARY,
  SERVICES_ITEM_SECONDARY_HIDDEN,
  SERVICES_ITEM_SECONDARY_MOBILE,
} from "./services-styles";

// ——— Types ———

interface ServiceListItemProps {
  item: ServiceItem;
  scrollRevealIndex?: number;
  onHoverStart?: (id: string) => void;
  onTap?: (id: string) => void;
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

export function ServiceListItem({
  item,
  scrollRevealIndex,
  onHoverStart,
  onTap,
}: ServiceListItemProps) {
  const primaryLabel = (
    <span className={cn(SERVICES_ITEM_PRIMARY)}>{item.primary}</span>
  );

  return (
    <li className={cn(SERVICES_ITEM)}>
      {!SERVICES_ITEM_MEDIA_HIDDEN && <ServiceHoverMedia id={item.id} />}

      <div className={cn(SERVICES_ITEM_INNER)}>
        <button
          type="button"
          className="w-full cursor-pointer border-none bg-transparent p-0 text-left"
          onMouseEnter={() => onHoverStart?.(item.id)}
          onFocus={() => onHoverStart?.(item.id)}
          onClick={() => onTap?.(item.id)}
          aria-label={item.primary}
        >
          {scrollRevealIndex === undefined ? (
            primaryLabel
          ) : (
            <div
              className="scroll-reveal-word block w-full text-left"
              data-scroll-reveal-word=""
              data-scroll-reveal-index={scrollRevealIndex}
            >
              {primaryLabel}
            </div>
          )}
        </button>
        {!SERVICES_ITEM_SECONDARY_HIDDEN && (
          <>
            <span className={cn(SERVICES_ITEM_SECONDARY_MOBILE)}>
              {item.secondary}
            </span>
            <span
              className={cn(SERVICES_ITEM_SECONDARY)}
              aria-hidden
            >
              {item.secondary}
            </span>
          </>
        )}
      </div>
    </li>
  );
}
