/**
 * @file footer-overscroll.ts
 * @description Shared constants and helpers for the footer rebound overscroll effect.
 */

/** Sui primary blue — matches sui.io footer rebound blocks. */
export const FOOTER_REBOUND_BLUE = "#298dff";

/** In-flow runway below footer (matches sui.io custom_scroll). */
export const FOOTER_OVERSCROLL_RUNWAY_VH = 20;

/** Pull distance (px) required to fully expand the rebound graphic. */
export const FOOTER_OVERSCROLL_MAX_PULL_PX = 180;

/** Compressed scale when the rebound graphic is at rest. */
export const FOOTER_OVERSCROLL_MIN_SCALE = 0.055;

/** Fully expanded scale at max overscroll. */
export const FOOTER_OVERSCROLL_MAX_SCALE = 1;

/** Wheel delta multiplier. */
export const FOOTER_OVERSCROLL_WHEEL_GAIN = 0.95;

/** Touch pull multiplier. */
export const FOOTER_OVERSCROLL_TOUCH_GAIN = 1.05;

/** Spring stiffness used for rebound release. */
export const FOOTER_OVERSCROLL_RELEASE_STIFFNESS = 132;

/** Spring damping used for rebound release. */
export const FOOTER_OVERSCROLL_RELEASE_DAMPING = 27;

/** Velocity cutoff to stop the spring frame loop. */
export const FOOTER_OVERSCROLL_RELEASE_VELOCITY_EPSILON = 0.18;

/** Position cutoff to stop the spring frame loop. */
export const FOOTER_OVERSCROLL_RELEASE_POSITION_EPSILON = 0.16;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function getScrollTop(): number {
  return (
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

export function getMaxScrollTop(): number {
  const scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
  );
  return Math.max(0, scrollHeight - window.innerHeight);
}

/** Ease-out curve for the rebound expansion (sui-style deceleration). */
export function easeOutRebound(progress: number): number {
  const t = clamp(progress, 0, 1);
  return 1 - (1 - t) ** 2.4;
}

export function pullToProgress(pullPx: number): number {
  return easeOutRebound(
    clamp(pullPx, 0, FOOTER_OVERSCROLL_MAX_PULL_PX) /
      FOOTER_OVERSCROLL_MAX_PULL_PX,
  );
}

/**
 * Add resistance as pull increases so overscroll feels elastic
 * instead of linear.
 */
export function applyPullResistance(currentPullPx: number, deltaPx: number): number {
  const normalized = clamp(currentPullPx / FOOTER_OVERSCROLL_MAX_PULL_PX, 0, 1);
  const resistance = 1 - normalized ** 1.6 * 0.72;
  return currentPullPx + deltaPx * clamp(resistance, 0.2, 1);
}

export function progressToScale(progress: number): number {
  const eased = clamp(progress, 0, 1);
  return (
    FOOTER_OVERSCROLL_MIN_SCALE +
    (FOOTER_OVERSCROLL_MAX_SCALE - FOOTER_OVERSCROLL_MIN_SCALE) * eased
  );
}

/** True when the page is scrolled to the bottom. */
export function isDocumentAtBottom(thresholdPx = 24): boolean {
  return getScrollTop() >= getMaxScrollTop() - thresholdPx;
}

/** True when the footer is on screen and the page is at (or near) the end. */
export function isFooterReadyForOverscroll(
  container: HTMLElement | null,
  thresholdPx = 24,
): boolean {
  if (!isDocumentAtBottom(thresholdPx)) {
    return false;
  }

  if (!container) {
    return true;
  }

  const rect = container.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

/** Normalize wheel delta to pixels across deltaMode values. */
export function getWheelDeltaPx(event: WheelEvent): number {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * 16;
  }
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * window.innerHeight;
  }
  return event.deltaY;
}
