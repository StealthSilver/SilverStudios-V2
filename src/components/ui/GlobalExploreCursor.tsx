"use client";

/**
 * @file GlobalExploreCursor.tsx
 * @description Cuberto-style global follower cursor with Explore hover bubble.
 */

import { useEffect, useRef, useState } from "react";

export type GlobalExploreCursorProps = Record<string, never>;

interface CursorPoint {
  x: number;
  y: number;
}

const DOT_OFFSET_X = 11;
const DOT_OFFSET_Y = 11;
const DOT_LERP = 0.24;
const BUBBLE_LERP = 0.18;

function lerp(current: number, target: number, factor: number): number {
  return current + (target - current) * factor;
}

export function GlobalExploreCursor(_props: GlobalExploreCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef<CursorPoint>({ x: 0, y: 0 });
  const dotPositionRef = useRef<CursorPoint>({ x: 0, y: 0 });
  const bubblePositionRef = useRef<CursorPoint>({ x: 0, y: 0 });
  const isPointerActiveRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isBubbleActive, setIsBubbleActive] = useState(false);
  const [label, setLabel] = useState("Explore");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) {
      return;
    }

    const updateBodyClass = (active: boolean) => {
      document.body.classList.toggle("cursor-bubble-active", active);
    };

    const updateHoverState = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        setIsBubbleActive(false);
        return;
      }

      const hoverTarget = target.closest<HTMLElement>(".explore-cursor-target");
      if (!hoverTarget) {
        setIsBubbleActive(false);
        return;
      }

      setLabel(hoverTarget.dataset.exploreLabel || "Explore");
      setIsBubbleActive(true);
    };

    const animate = () => {
      const pointer = pointerRef.current;
      const nextDotX = lerp(
        dotPositionRef.current.x,
        pointer.x - DOT_OFFSET_X,
        DOT_LERP,
      );
      const nextDotY = lerp(
        dotPositionRef.current.y,
        pointer.y - DOT_OFFSET_Y,
        DOT_LERP,
      );
      dotPositionRef.current = { x: nextDotX, y: nextDotY };
      bubblePositionRef.current = {
        x: lerp(bubblePositionRef.current.x, pointer.x, BUBBLE_LERP),
        y: lerp(bubblePositionRef.current.y, pointer.y, BUBBLE_LERP),
      };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${nextDotX}px, ${nextDotY}px, 0)`;
      }
      if (bubbleRef.current) {
        bubbleRef.current.style.transform = `translate3d(${bubblePositionRef.current.x}px, ${bubblePositionRef.current.y}px, 0)`;
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      updateHoverState(event.target);

      if (!isPointerActiveRef.current) {
        isPointerActiveRef.current = true;
        setIsVisible(true);
        dotPositionRef.current = {
          x: event.clientX - DOT_OFFSET_X,
          y: event.clientY - DOT_OFFSET_Y,
        };
        bubblePositionRef.current = { x: event.clientX, y: event.clientY };

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${dotPositionRef.current.x}px, ${dotPositionRef.current.y}px, 0)`;
        }
        if (bubbleRef.current) {
          bubbleRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        }
      }
    };

    const handlePointerLeaveWindow = () => {
      setIsVisible(false);
      setIsBubbleActive(false);
      isPointerActiveRef.current = false;
    };

    const handlePointerDown = () => {
      document.body.classList.add("cursor-pointer-down");
    };

    const handlePointerUp = () => {
      document.body.classList.remove("cursor-pointer-down");
    };

    frameRef.current = window.requestAnimationFrame(animate);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeaveWindow, {
      passive: true,
    });
    window.addEventListener("blur", handlePointerLeaveWindow);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeaveWindow);
      window.removeEventListener("blur", handlePointerLeaveWindow);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.body.classList.remove("cursor-bubble-active");
      document.body.classList.remove("cursor-pointer-down");
      updateBodyClass(false);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("cursor-bubble-active", isBubbleActive);
    return () => {
      document.body.classList.remove("cursor-bubble-active");
    };
  }, [isBubbleActive]);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="global-explore-cursor__dot"
        data-visible={isVisible ? "true" : "false"}
      />
      <div
        ref={bubbleRef}
        aria-hidden
        className="global-explore-cursor__bubble"
        data-active={isBubbleActive ? "true" : "false"}
      >
        <span className="global-explore-cursor__label">{label}</span>
      </div>
    </>
  );
}
