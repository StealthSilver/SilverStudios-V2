/**
 * @file useFooterOverscroll.ts
 * @description Tracks bottom overscroll pull and drives the footer rebound graphic scale.
 */

"use client";

import { type RefObject, useCallback, useEffect, useRef, useState } from "react";

import {
  applyPullResistance,
  FOOTER_OVERSCROLL_MAX_PULL_PX,
  FOOTER_OVERSCROLL_RELEASE_DAMPING,
  FOOTER_OVERSCROLL_RELEASE_POSITION_EPSILON,
  FOOTER_OVERSCROLL_RELEASE_STIFFNESS,
  FOOTER_OVERSCROLL_RELEASE_VELOCITY_EPSILON,
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
  const releaseLastTsRef = useRef<number | undefined>(undefined);
  const releaseVelocityRef = useRef(0);
  const wheelIdleTimerRef = useRef<number | undefined>(undefined);
  const touchStartYRef = useRef<number | null>(null);
  const isTouchPullingRef = useRef(false);

  const cancelRelease = useCallback(() => {
    if (releaseFrameRef.current !== undefined) {
      cancelAnimationFrame(releaseFrameRef.current);
      releaseFrameRef.current = undefined;
    }
    releaseLastTsRef.current = undefined;
    releaseVelocityRef.current = 0;
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

  const startRelease = useCallback(
    (seedVelocity = 0) => {
      if (pullRef.current <= 0) {
        applyPull(0);
        return;
      }

      cancelRelease();
      releaseVelocityRef.current = seedVelocity;

      const tick = (now: number) => {
        const previousTs = releaseLastTsRef.current ?? now;
        const dt = Math.min((now - previousTs) / 1000, 1 / 20);
        releaseLastTsRef.current = now;

        const currentPull = pullRef.current;
        const acceleration =
          -FOOTER_OVERSCROLL_RELEASE_STIFFNESS * currentPull -
          FOOTER_OVERSCROLL_RELEASE_DAMPING * releaseVelocityRef.current;

        const nextVelocity = releaseVelocityRef.current + acceleration * dt;
        const nextPull = Math.max(0, currentPull + nextVelocity * dt);

        releaseVelocityRef.current = nextPull <= 0 ? 0 : nextVelocity;
        pullRef.current = nextPull;
        setState(buildState(nextPull));

        const shouldStop =
          nextPull <= FOOTER_OVERSCROLL_RELEASE_POSITION_EPSILON &&
          Math.abs(releaseVelocityRef.current) <=
            FOOTER_OVERSCROLL_RELEASE_VELOCITY_EPSILON;

        if (shouldStop) {
          pullRef.current = 0;
          setState(buildState(0));
          releaseFrameRef.current = undefined;
          releaseLastTsRef.current = undefined;
          return;
        }

        releaseFrameRef.current = requestAnimationFrame(tick);
      };

      releaseFrameRef.current = requestAnimationFrame(tick);
    },
    [applyPull, cancelRelease],
  );

  const scheduleRelease = useCallback(() => {
    window.clearTimeout(wheelIdleTimerRef.current);
    wheelIdleTimerRef.current = window.setTimeout(() => {
      startRelease(releaseVelocityRef.current);
    }, 95);
  }, [startRelease]);

  const canOverscroll = useCallback(() => {
    return isFooterReadyForOverscroll(shellRef.current);
  }, [shellRef]);

  useEffect(() => {
    if (!enabled) {
      pullRef.current = 0;
      window.clearTimeout(wheelIdleTimerRef.current);
      cancelRelease();
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
        const deltaPull = delta * FOOTER_OVERSCROLL_WHEEL_GAIN;
        const nextPull = applyPullResistance(pullRef.current, deltaPull);
        releaseVelocityRef.current = deltaPull * 0.018;
        applyPull(nextPull);
        scheduleRelease();
        return;
      }

      if (delta < 0 && pullRef.current > 0) {
        event.preventDefault();
        const deltaPull = delta * FOOTER_OVERSCROLL_WHEEL_GAIN;
        const nextPull = pullRef.current + deltaPull;
        releaseVelocityRef.current = deltaPull * 0.016;
        applyPull(nextPull);
        if (nextPull <= 0) {
          startRelease(0);
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
        const deltaPull = delta * FOOTER_OVERSCROLL_TOUCH_GAIN;
        const nextPull = applyPullResistance(pullRef.current, deltaPull);
        releaseVelocityRef.current = deltaPull * 0.024;
        applyPull(nextPull);
        return;
      }

      if (delta < 0 && pullRef.current > 0) {
        event.preventDefault();
        const deltaPull = delta * FOOTER_OVERSCROLL_TOUCH_GAIN;
        const nextPull = pullRef.current + deltaPull;
        releaseVelocityRef.current = deltaPull * 0.02;
        applyPull(nextPull);
      }
    };

    const onTouchEnd = () => {
      touchStartYRef.current = null;
      if (isTouchPullingRef.current) {
        isTouchPullingRef.current = false;
        startRelease(releaseVelocityRef.current);
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
    startRelease,
  ]);

  return enabled ? state : INITIAL_STATE;
}
