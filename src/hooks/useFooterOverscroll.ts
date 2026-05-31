/**
 * @file useFooterOverscroll.ts
 * @description Tracks bottom overscroll pull and drives the footer rebound graphic scale.
 */

"use client";

import { type RefObject, useCallback, useEffect, useRef, useState } from "react";

import {
  FOOTER_OVERSCROLL_MAX_PULL_PX,
  FOOTER_OVERSCROLL_RELEASE_MS,
  FOOTER_OVERSCROLL_TOUCH_GAIN,
  FOOTER_OVERSCROLL_WHEEL_GAIN,
  getWheelDeltaPx,
  isFooterReadyForOverscroll,
  progressToScale,
  pullToProgress,
} from "@/lib/footer-overscroll";

interface FooterOverscrollState {
  pullPx: number;
  progress: number;
  scale: number;
}

const INITIAL_STATE: FooterOverscrollState = {
  pullPx: 0,
  progress: 0,
  scale: progressToScale(0),
};

function clampPull(pullPx: number): number {
  return Math.min(Math.max(pullPx, 0), FOOTER_OVERSCROLL_MAX_PULL_PX);
}

function buildState(pullPx: number): FooterOverscrollState {
  const clampedPull = clampPull(pullPx);
  const progress = pullToProgress(clampedPull);
  return {
    pullPx: clampedPull,
    progress,
    scale: progressToScale(progress),
  };
}

export function useFooterOverscroll(
  shellRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  const [state, setState] = useState<FooterOverscrollState>(INITIAL_STATE);
  const pullRef = useRef(0);
  const releaseFrameRef = useRef<number | undefined>(undefined);
  const releaseStartRef = useRef(0);
  const releaseFromRef = useRef(0);
  const wheelIdleTimerRef = useRef<number | undefined>(undefined);
  const touchStartYRef = useRef<number | null>(null);
  const isTouchPullingRef = useRef(false);

  const cancelRelease = useCallback(() => {
    if (releaseFrameRef.current !== undefined) {
      cancelAnimationFrame(releaseFrameRef.current);
      releaseFrameRef.current = undefined;
    }
  }, []);

  const applyPull = useCallback(
    (nextPull: number) => {
      cancelRelease();
      const clamped = clampPull(nextPull);
      pullRef.current = clamped;
      setState(buildState(clamped));
    },
    [cancelRelease],
  );

  const startRelease = useCallback(() => {
    if (pullRef.current <= 0) {
      applyPull(0);
      return;
    }

    cancelRelease();
    releaseStartRef.current = performance.now();
    releaseFromRef.current = pullRef.current;

    const tick = (now: number) => {
      const elapsed = now - releaseStartRef.current;
      const t = Math.min(elapsed / FOOTER_OVERSCROLL_RELEASE_MS, 1);
      const eased = 1 - (1 - t) ** 3;
      const nextPull = releaseFromRef.current * (1 - eased);
      pullRef.current = nextPull;
      setState(buildState(nextPull));

      if (t < 1) {
        releaseFrameRef.current = requestAnimationFrame(tick);
      } else {
        pullRef.current = 0;
        setState(buildState(0));
        releaseFrameRef.current = undefined;
      }
    };

    releaseFrameRef.current = requestAnimationFrame(tick);
  }, [applyPull, cancelRelease]);

  const scheduleRelease = useCallback(() => {
    window.clearTimeout(wheelIdleTimerRef.current);
    wheelIdleTimerRef.current = window.setTimeout(startRelease, 80);
  }, [startRelease]);

  const canOverscroll = useCallback(() => {
    return isFooterReadyForOverscroll(shellRef.current);
  }, [shellRef]);

  useEffect(() => {
    if (!enabled) {
      pullRef.current = 0;
      setState(INITIAL_STATE);
      return undefined;
    }

    const onWheel = (event: WheelEvent) => {
      if (!canOverscroll()) {
        if (pullRef.current > 0) {
          startRelease();
        }
        return;
      }

      const delta = getWheelDeltaPx(event);

      if (delta > 0) {
        event.preventDefault();
        applyPull(pullRef.current + delta * FOOTER_OVERSCROLL_WHEEL_GAIN);
        scheduleRelease();
        return;
      }

      if (delta < 0 && pullRef.current > 0) {
        event.preventDefault();
        const nextPull = pullRef.current + delta * FOOTER_OVERSCROLL_WHEEL_GAIN;
        applyPull(nextPull);
        if (nextPull <= 0) {
          startRelease();
        } else {
          scheduleRelease();
        }
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (!canOverscroll()) {
        touchStartYRef.current = null;
        isTouchPullingRef.current = false;
        return;
      }
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
      isTouchPullingRef.current = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (touchStartYRef.current === null) {
        return;
      }

      const currentY = event.touches[0]?.clientY;
      if (currentY === undefined) {
        return;
      }

      const delta = touchStartYRef.current - currentY;
      touchStartYRef.current = currentY;

      if (!canOverscroll() && !isTouchPullingRef.current) {
        return;
      }

      if (delta > 0) {
        isTouchPullingRef.current = true;
        event.preventDefault();
        applyPull(pullRef.current + delta * FOOTER_OVERSCROLL_TOUCH_GAIN);
        return;
      }

      if (delta < 0 && pullRef.current > 0) {
        event.preventDefault();
        applyPull(pullRef.current + delta * FOOTER_OVERSCROLL_TOUCH_GAIN);
      }
    };

    const onTouchEnd = () => {
      touchStartYRef.current = null;
      if (isTouchPullingRef.current) {
        isTouchPullingRef.current = false;
        startRelease();
      }
    };

    const onScroll = () => {
      if (!canOverscroll() && pullRef.current > 0) {
        startRelease();
      }
    };

    document.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.clearTimeout(wheelIdleTimerRef.current);
      cancelRelease();
    };
  }, [
    applyPull,
    cancelRelease,
    canOverscroll,
    enabled,
    scheduleRelease,
    shellRef,
    startRelease,
  ]);

  return state;
}
