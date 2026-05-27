"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationType = "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scaleUp" | "stagger";

interface UseScrollAnimationOptions {
  type?: AnimationType;
  delay?: number;
  duration?: number;
  staggerChildren?: string; // CSS selector for stagger targets
  start?: string;
  once?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    type = "fadeUp",
    delay = 0,
    duration = 0.8,
    staggerChildren,
    start = "top 88%",
    once = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = staggerChildren ? el.querySelectorAll(staggerChildren) : [el];

    const getFromVars = (): gsap.TweenVars => {
      switch (type) {
        case "fadeUp":       return { opacity: 0, y: 40 };
        case "fadeIn":       return { opacity: 0 };
        case "slideLeft":    return { opacity: 0, x: 60 };
        case "slideRight":   return { opacity: 0, x: -60 };
        case "scaleUp":      return { opacity: 0, scale: 0.92 };
        case "stagger":      return { opacity: 0, y: 32 };
        default:             return { opacity: 0, y: 40 };
      }
    };

    const ctx = gsap.context(() => {
      if (type === "stagger" && staggerChildren) {
        gsap.from(targets, {
          ...getFromVars(),
          duration,
          delay,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            once,
          },
        });
      } else {
        gsap.from(el, {
          ...getFromVars(),
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            once,
          },
        });
      }
    });

    return () => ctx.revert();
  }, [type, delay, duration, staggerChildren, start, once]);

  return ref;
}
