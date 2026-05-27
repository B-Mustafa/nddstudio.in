"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    dot.style.opacity  = "1";
    ring.style.opacity = "1";

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "none" });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
    };

    const onEnterLink = () => {
      gsap.to(ring, { scale: 1.8, borderColor: "var(--orange)", duration: 0.25, ease: "power2.out" });
      gsap.to(dot,  { scale: 0,   duration: 0.2 });
    };

    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, borderColor: "rgba(232,99,10,0.5)", duration: 0.3, ease: "elastic.out(1,0.5)" });
      gsap.to(dot,  { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", moveCursor);
    document.querySelectorAll("a, button, [role='button']").forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: "50%",
          background: "var(--orange)",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: 0,
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 32, height: 32,
          borderRadius: "50%",
          border: "1.5px solid rgba(232,99,10,0.5)",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: 0,
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      />
    </>
  );
}
