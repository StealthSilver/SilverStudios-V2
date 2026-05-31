/**
 * @file HeroGradientBackground.tsx
 * @description Full-bleed hero background — time-of-day gradient, canvas grain, vertical hour scrubber.
 */

"use client";

import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";
import { getFractionalHour } from "@/lib/hero-time";

// ——— Types ———

interface Rgb {
  r: number;
  g: number;
  b: number;
}

interface GradientKeyframe {
  hour: number;
  label: string;
  stops: [string, string, string, string];
  textDark: boolean;
}

interface HeroTimeState {
  hour: number;
  label: string;
  textDark: boolean;
  gradient: string;
  setHour: (hour: number) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
}

interface HeroGradientBackgroundProps {
  className?: string;
  /** 0–1, defaults to 1 */
  opacity?: number;
  /** SSR snapshot — pass from a Server Component for hydration-safe first paint. */
  initialHour?: number;
}

interface HeroGradientTimeProviderProps {
  children: React.ReactNode;
  /** Fractional hour (0–23.99) for the first render; defaults to live browser time. */
  initialHour?: number;
}

// ——— Constants ———

const GRADIENT_KEYFRAMES: readonly GradientKeyframe[] = [
  {
    hour: 5,
    label: "Pre-dawn",
    stops: ["#1a1535", "#2e2050", "#3d2d6e", "#2a1f4a"],
    textDark: false,
  },
  {
    hour: 7,
    label: "Sunrise",
    stops: ["#c4785a", "#d9907a", "#a0b4cc", "#7898b8"],
    textDark: false,
  },
  {
    hour: 9,
    label: "Morning",
    stops: ["#8eb0f0", "#5278dc", "#2e52c8", "#122a94"],
    textDark: false,
  },
  {
    hour: 12,
    label: "Midday",
    stops: ["#c8ddf0", "#a8c8e8", "#d4e8f5", "#b0d0ea"],
    textDark: true,
  },
  {
    hour: 14,
    label: "Afternoon",
    stops: ["#b8b0d0", "#9a90be", "#7a88b0", "#6070a0"],
    textDark: false,
  },
  {
    hour: 17,
    label: "Golden hour",
    stops: ["#d4a882", "#c8907a", "#b07868", "#8a5848"],
    textDark: false,
  },
  {
    hour: 19,
    label: "Dusk",
    stops: ["#8a6070", "#6a5080", "#504070", "#3a2c5a"],
    textDark: false,
  },
  {
    hour: 22,
    label: "Night",
    stops: ["#141824", "#1a2030", "#1e1a2e", "#141020"],
    textDark: false,
  },
] as const;

const SCRUBBER_WIDTH_PX = 52;
const TRACK_INSET_PX = 60;
const SCRUBBER_HOUR_MAX = 23.99;
const GRAIN_INTERVAL_MS = 200;
const GRAIN_OPACITY = 0.06;
const TEXT_DARK_LUMINANCE_THRESHOLD = 160;
const HERO_RADIAL_BLOB_SIZE = "170vmax";
const HERO_RADIAL_BLUR = "220px";
const SHOW_HERO_TIME_SCRUBBER = true;
/** How often to sync scrubber + gradient to the live clock when not dragging. */
const LIVE_CLOCK_SYNC_MS = 1000;

// ——— Color helpers ———

function hexToRgb(hex: string): Rgb {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

function lerpColor(a: string, b: string, t: number): string {
  const from = hexToRgb(a);
  const to = hexToRgb(b);
  const clamped = Math.min(1, Math.max(0, t));

  const r = Math.round(from.r + (to.r - from.r) * clamped);
  const g = Math.round(from.g + (to.g - from.g) * clamped);
  const bChannel = Math.round(from.b + (to.b - from.b) * clamped);

  return `#${[r, g, bChannel]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
}

function stopLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function buildGradientString(stops: [string, string, string, string]): string {
  return `radial-gradient(circle at 50% 50%, ${stops[0]} 0%, ${stops[1]} 30%, ${stops[2]} 62%, ${stops[3]} 100%)`;
}

function getKeyframeBlend(hour: number): {
  label: string;
  stops: [string, string, string, string];
} {
  const keyframes = GRADIENT_KEYFRAMES;
  const count = keyframes.length;
  let normalizedHour = hour;

  for (let index = 0; index < count; index += 1) {
    const current = keyframes[index];
    const next = keyframes[(index + 1) % count];
    const startHour = current.hour;
    let endHour = next.hour;

    if (index === count - 1) {
      endHour += 24;
      if (normalizedHour < keyframes[0].hour) {
        normalizedHour += 24;
      }
    }

    if (normalizedHour >= startHour && normalizedHour < endHour) {
      const t = (normalizedHour - startHour) / (endHour - startHour);
      const stops = current.stops.map((stop, stopIndex) =>
        lerpColor(stop, next.stops[stopIndex], t),
      ) as [string, string, string, string];

      return {
        label: t < 0.5 ? current.label : next.label,
        stops,
      };
    }
  }

  const fallback = keyframes[0];
  return { label: fallback.label, stops: [...fallback.stops] };
}

function resolveHeroTime(
  hour: number,
): Omit<HeroTimeState, "setHour" | "isDragging" | "setIsDragging"> {
  const { label, stops } = getKeyframeBlend(hour);
  const luminance =
    stops.reduce((sum, stop) => sum + stopLuminance(stop), 0) / stops.length;

  return {
    hour,
    label,
    textDark: luminance > TEXT_DARK_LUMINANCE_THRESHOLD,
    gradient: buildGradientString(stops),
  };
}

function getCurrentBrowserHour(): number {
  return getFractionalHour();
}

/** Fractional hour (0–23.99) → `HH:MM` in 24-hour clock. */
function formatHour24(fractionalHour: number): string {
  const clamped = Math.min(SCRUBBER_HOUR_MAX, Math.max(0, fractionalHour));
  const hours = Math.floor(clamped);
  const minutes = Math.round((clamped % 1) * 60) % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function clampScrubberHour(hour: number): number {
  return Math.min(SCRUBBER_HOUR_MAX, Math.max(0, hour));
}

/** Imperative scrubber update — avoids React re-renders while dragging. */
function applyScrubberHourVisual(
  scrubber: HTMLDivElement | null,
  label: HTMLSpanElement | null,
  thumb: HTMLDivElement | null,
  hour: number,
): void {
  if (!scrubber) {
    return;
  }

  const clamped = clampScrubberHour(hour);
  const ratio = clamped / SCRUBBER_HOUR_MAX;
  const timeLabel = formatHour24(clamped);

  scrubber.style.setProperty("--scrubber-hour-ratio", String(ratio));

  if (label) {
    label.textContent = timeLabel;
  }

  if (thumb) {
    thumb.setAttribute("aria-valuenow", String(Math.round(clamped)));
    thumb.setAttribute("aria-valuetext", timeLabel);
  }
}

// ——— Context ———

const HeroTimeContext = createContext<HeroTimeState | null>(null);

function useHeroTimeState(initialHour: number): HeroTimeState {
  const [hour, setHourState] = useState(initialHour);
  const [isDragging, setDragging] = useState(false);
  const isDraggingRef = useRef(false);

  const syncToLiveClock = useCallback(() => {
    const liveHour = getCurrentBrowserHour();
    setHourState((current) =>
      Math.abs(current - liveHour) < 1 / 3600 ? current : liveHour,
    );
  }, []);

  useEffect(() => {
    const sync = () => {
      queueMicrotask(syncToLiveClock);
    };

    sync();

    const tick = () => {
      if (!isDraggingRef.current) {
        syncToLiveClock();
      }
    };

    const interval = window.setInterval(tick, LIVE_CLOCK_SYNC_MS);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        tick();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [syncToLiveClock]);

  const setHour = useCallback((nextHour: number) => {
    setHourState(clampScrubberHour(nextHour));
  }, []);

  const setIsDragging = useCallback(
    (dragging: boolean) => {
      isDraggingRef.current = dragging;
      setDragging(dragging);

      if (!dragging) {
        syncToLiveClock();
      }
    },
    [syncToLiveClock],
  );

  const resolved = useMemo(() => resolveHeroTime(hour), [hour]);

  return useMemo(
    () => ({
      ...resolved,
      hour,
      setHour,
      isDragging,
      setIsDragging,
    }),
    [hour, resolved, setHour, isDragging, setIsDragging],
  );
}

export function useHeroTime(): { hour: number; label: string; textDark: boolean } {
  const context = useContext(HeroTimeContext);

  if (!context) {
    throw new Error("useHeroTime must be used within HeroGradientTimeProvider");
  }

  return {
    hour: context.hour,
    label: context.label,
    textDark: context.textDark,
  };
}

export function HeroGradientTimeProvider({
  children,
  initialHour = 12,
}: HeroGradientTimeProviderProps) {
  const value = useHeroTimeState(initialHour);

  return (
    <HeroTimeContext.Provider value={value}>{children}</HeroTimeContext.Provider>
  );
}

// ——— Grain canvas ———

const HeroGrainCanvas = memo(function HeroGrainCanvas({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const paintNoise = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const { width, height } = canvas;
    const imageData = context.createImageData(width, height);
    const pixels = imageData.data;

    for (let index = 0; index < pixels.length; index += 4) {
      const gray = Math.floor(Math.random() * 256);
      pixels[index] = gray;
      pixels[index + 1] = gray;
      pixels[index + 2] = gray;
      pixels[index + 3] = Math.floor(Math.random() * 56);
    }

    context.putImageData(imageData, 0, 0);
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) {
      return;
    }

    const resize = () => {
      const rect = root.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      canvas.width = width;
      canvas.height = height;
      paintNoise();
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(root);

    const interval = window.setInterval(paintNoise, GRAIN_INTERVAL_MS);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
    };
  }, [containerRef, paintNoise]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity: GRAIN_OPACITY }}
    />
  );
});

// ——— Scrubber ———

function HeroTimeScrubber({
  hour,
  isDragging,
  onHourPreview,
  onHourCommit,
  onDragStart,
  onDragEnd,
}: {
  hour: number;
  isDragging: boolean;
  onHourPreview: (hour: number) => void;
  onHourCommit: (hour: number) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}) {
  const scrubberRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackMetricsRef = useRef({ top: TRACK_INSET_PX, height: 1 });
  const isDraggingRef = useRef(false);
  const dragHourRef = useRef(hour);
  const previewRafRef = useRef<number | null>(null);

  const updateTrackMetrics = useCallback(() => {
    const scrubber = scrubberRef.current;
    if (!scrubber) {
      return;
    }

    const height = scrubber.clientHeight;
    trackMetricsRef.current = {
      top: TRACK_INSET_PX,
      height: Math.max(1, height - TRACK_INSET_PX * 2),
    };
  }, []);

  const hourFromClientY = useCallback((clientY: number) => {
    const scrubber = scrubberRef.current;
    if (!scrubber) {
      return 0;
    }

    const rect = scrubber.getBoundingClientRect();
    const { top, height } = trackMetricsRef.current;
    const y = clientY - rect.top - top;
    const ratio = Math.min(1, Math.max(0, y / height));
    return ratio * SCRUBBER_HOUR_MAX;
  }, []);

  const onHourPreviewRef = useRef(onHourPreview);
  const onHourCommitRef = useRef(onHourCommit);
  const onDragEndRef = useRef(onDragEnd);

  useEffect(() => {
    onHourPreviewRef.current = onHourPreview;
    onHourCommitRef.current = onHourCommit;
    onDragEndRef.current = onDragEnd;
  }, [onDragEnd, onHourCommit, onHourPreview]);

  const applyLocalHour = useCallback((nextHour: number) => {
    const clamped = clampScrubberHour(nextHour);
    dragHourRef.current = clamped;
    applyScrubberHourVisual(
      scrubberRef.current,
      labelRef.current,
      thumbRef.current,
      clamped,
    );
  }, []);

  const cancelPreviewRaf = useCallback(() => {
    if (previewRafRef.current != null) {
      cancelAnimationFrame(previewRafRef.current);
      previewRafRef.current = null;
    }
  }, []);

  const scheduleGradientPreview = useCallback(() => {
    if (previewRafRef.current != null) {
      return;
    }

    previewRafRef.current = requestAnimationFrame(() => {
      previewRafRef.current = null;
      onHourPreviewRef.current(dragHourRef.current);
    });
  }, []);

  const updateDragHour = useCallback(
    (clientY: number) => {
      applyLocalHour(hourFromClientY(clientY));
      scheduleGradientPreview();
    },
    [applyLocalHour, hourFromClientY, scheduleGradientPreview],
  );

  useEffect(() => {
    if (!isDraggingRef.current) {
      dragHourRef.current = hour;
      applyScrubberHourVisual(
        scrubberRef.current,
        labelRef.current,
        thumbRef.current,
        hour,
      );
    }
  }, [hour]);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      updateDragHour(event.clientY);
    },
    [updateDragHour],
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) {
        updateDragHour(touch.clientY);
      }
    },
    [updateDragHour],
  );

  const endDragRef = useRef<() => void>(() => {});

  const handleMouseUp = useCallback(() => {
    endDragRef.current();
  }, []);

  const handleTouchEnd = useCallback(() => {
    endDragRef.current();
  }, []);

  const endDrag = useCallback(() => {
    if (!isDraggingRef.current) {
      return;
    }

    isDraggingRef.current = false;
    cancelPreviewRaf();
    onHourPreviewRef.current(dragHourRef.current);
    onHourCommitRef.current(dragHourRef.current);
    onDragEndRef.current();
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
  }, [
    cancelPreviewRaf,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  useEffect(() => {
    endDragRef.current = endDrag;
  }, [endDrag]);

  const startDrag = useCallback(
    (clientY: number) => {
      updateTrackMetrics();
      isDraggingRef.current = true;
      onDragStart();
      updateDragHour(clientY);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleTouchEnd);
    },
    [
      handleMouseMove,
      handleMouseUp,
      handleTouchEnd,
      handleTouchMove,
      onDragStart,
      updateDragHour,
      updateTrackMetrics,
    ],
  );

  useEffect(() => {
    updateTrackMetrics();
    const scrubber = scrubberRef.current;
    if (!scrubber) {
      return;
    }

    const observer = new ResizeObserver(updateTrackMetrics);
    observer.observe(scrubber);

    return () => {
      observer.disconnect();
      cancelPreviewRaf();
      handleMouseUp();
      handleTouchEnd();
    };
  }, [cancelPreviewRaf, handleMouseUp, handleTouchEnd, updateTrackMetrics]);

  const timeLabel = formatHour24(hour);
  const scrubberStyle = {
    width: SCRUBBER_WIDTH_PX,
    "--scrubber-hour-ratio": hour / SCRUBBER_HOUR_MAX,
  } as React.CSSProperties;

  return (
    <div
      ref={scrubberRef}
      suppressHydrationWarning
      className={cn(
        "hero-scrubber absolute top-0 bottom-0 left-0 z-30",
        isDragging && "hero-scrubber--dragging",
        isDragging ? "cursor-grabbing" : "cursor-grab",
      )}
      style={scrubberStyle}
      onMouseDown={(event) => {
        event.preventDefault();
        startDrag(event.clientY);
      }}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        if (touch) {
          startDrag(touch.clientY);
        }
      }}
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 w-px -translate-x-1/2"
        style={{
          top: TRACK_INSET_PX,
          bottom: TRACK_INSET_PX,
          backgroundColor: "rgba(255,255,255,0.2)",
        }}
      />

      {Array.from({ length: 24 }, (_, tickHour) => {
        const isMajor = tickHour % 6 === 0;

        return (
          <div
            key={tickHour}
            aria-hidden="true"
            className="hero-scrubber-tick absolute left-1/2 h-px -translate-x-1/2 -translate-y-1/2"
            style={
              {
                "--scrubber-tick-ratio": tickHour / 23,
                width: isMajor ? "14px" : "8px",
                backgroundColor: isMajor
                  ? "rgba(255,255,255,0.5)"
                  : "rgba(255,255,255,0.3)",
              } as React.CSSProperties
            }
          />
        );
      })}

      <div
        aria-hidden="true"
        className="hero-scrubber-thumb-indicator absolute left-1/2 w-0.5 -translate-x-1/2"
        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
      />

      <div
        ref={thumbRef}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={24}
        aria-valuenow={Math.round(hour)}
        aria-valuetext={timeLabel}
        aria-label="Time of day"
        className="hero-scrubber-thumb absolute left-1/2 h-0.5 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "20px",
          backgroundColor: "rgba(255,255,255,0.9)",
        }}
      />

      <span
        ref={labelRef}
        aria-hidden="true"
        suppressHydrationWarning
        className="hero-scrubber-time-label pointer-events-none absolute -translate-y-1/2 font-nav text-[10px] leading-none font-normal tracking-[0.04em] whitespace-nowrap text-white/90 tabular-nums sm:text-[11px]"
        style={{ left: "calc(50% + 14px)" }}
      >
        {timeLabel}
      </span>
    </div>
  );
}

// ——— Background layers ———

function HeroGradientBackgroundLayers({
  className,
  opacity = 1,
}: HeroGradientBackgroundProps) {
  const state = useContext(HeroTimeContext);

  if (!state) {
    throw new Error(
      "HeroGradientBackground requires HeroGradientTimeProvider or the default export wrapper",
    );
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const primaryBlobRef = useRef<HTMLDivElement>(null);
  const secondaryBlobRef = useRef<HTMLDivElement>(null);
  const { gradient, hour, setHour, isDragging, setIsDragging } = state;

  const previewGradient = useCallback((previewHour: number) => {
    const { gradient: nextGradient } = resolveHeroTime(previewHour);
    primaryBlobRef.current?.style.setProperty("background", nextGradient);
    secondaryBlobRef.current?.style.setProperty("background", nextGradient);
  }, []);

  useEffect(() => {
    if (isDragging) {
      return;
    }

    primaryBlobRef.current?.style.setProperty("background", gradient);
    secondaryBlobRef.current?.style.setProperty("background", gradient);
  }, [gradient, isDragging]);

  const gradientTransition = isDragging
    ? "none"
    : "background 0.8s ease, filter 0.8s ease";

  return (
    <>
      <div
        ref={containerRef}
        aria-hidden="true"
        className={cn("absolute inset-0 z-0 overflow-hidden", className)}
        style={{ opacity }}
      >
        <div className="absolute inset-0 bg-[#0f1533]" />
        <div
          ref={primaryBlobRef}
          suppressHydrationWarning
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: HERO_RADIAL_BLOB_SIZE,
            height: HERO_RADIAL_BLOB_SIZE,
            transform: "translate(-50%, -50%)",
            background: gradient,
            filter: `blur(${HERO_RADIAL_BLUR})`,
            transition: gradientTransition,
            opacity: 0.98,
          }}
        />
        <div
          ref={secondaryBlobRef}
          suppressHydrationWarning
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: HERO_RADIAL_BLOB_SIZE,
            height: HERO_RADIAL_BLOB_SIZE,
            transform: "translate(-50%, -50%) scale(1.12)",
            background: gradient,
            filter: "blur(280px)",
            transition: gradientTransition,
            opacity: 0.58,
          }}
        />
        <HeroGrainCanvas containerRef={containerRef} />
      </div>
      {SHOW_HERO_TIME_SCRUBBER && (
        <HeroTimeScrubber
          hour={hour}
          isDragging={isDragging}
          onHourPreview={previewGradient}
          onHourCommit={setHour}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        />
      )}
    </>
  );
}

export default function HeroGradientBackground({
  initialHour,
  ...props
}: HeroGradientBackgroundProps) {
  const context = useContext(HeroTimeContext);

  if (context) {
    return <HeroGradientBackgroundLayers {...props} />;
  }

  return (
    <HeroGradientTimeProvider initialHour={initialHour}>
      <HeroGradientBackgroundLayers {...props} />
    </HeroGradientTimeProvider>
  );
}
