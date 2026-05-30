/**
 * @file GlassScrollbar.tsx
 * @description Overlay glass scrollbar — replaces the native gutter so content shows through.
 */

"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollMetrics {
  thumbHeight: number;
  thumbTop: number;
  scrollable: boolean;
}

const MIN_THUMB_HEIGHT = 48;
const TRACK_INSET = 8;

function measureScrollMetrics(): ScrollMetrics {
  const root = document.documentElement;
  const scrollHeight = root.scrollHeight;
  const clientHeight = root.clientHeight;
  const scrollTop = root.scrollTop;
  const scrollable = scrollHeight > clientHeight + 1;

  if (!scrollable) {
    return { thumbHeight: 0, thumbTop: 0, scrollable: false };
  }

  const viewportRatio = clientHeight / scrollHeight;
  const thumbHeight = Math.max(clientHeight * viewportRatio, MIN_THUMB_HEIGHT);
  const maxScrollTop = scrollHeight - clientHeight;
  const thumbTravel = clientHeight - thumbHeight - TRACK_INSET * 2;
  const thumbTop =
    maxScrollTop <= 0
      ? TRACK_INSET
      : TRACK_INSET + (scrollTop / maxScrollTop) * thumbTravel;

  return { thumbHeight, thumbTop, scrollable: true };
}

export function GlassScrollbar() {
  const [metrics, setMetrics] = useState<ScrollMetrics>({
    thumbHeight: 0,
    thumbTop: 0,
    scrollable: false,
  });
  const [visible, setVisible] = useState(false);
  const hideTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const update = () => {
      setMetrics(measureScrollMetrics());
    };

    const reveal = () => {
      update();
      setVisible(true);
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = window.setTimeout(() => {
        setVisible(false);
      }, 900);
    };

    update();
    reveal();

    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("resize", update);

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("resize", update);
      resizeObserver.disconnect();
      window.clearTimeout(hideTimerRef.current);
    };
  }, []);

  if (!metrics.scrollable) {
    return null;
  }

  return (
    <div aria-hidden className="glass-scrollbar" data-visible={visible}>
      <div
        className="glass-scrollbar__thumb"
        style={{
          height: `${metrics.thumbHeight}px`,
          transform: `translateY(${metrics.thumbTop}px)`,
        }}
      />
    </div>
  );
}
