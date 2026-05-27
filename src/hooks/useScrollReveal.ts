import { useEffect, useRef, RefObject } from "react";
import { animate, stagger } from "animejs";

type RevealPreset =
  | "fadeUp"
  | "fadeLeft"
  | "fadeRight"
  | "scaleIn"
  | "staggerFadeUp"
  | "staggerScaleIn"
  | "slideInLeft"
  | "slideInRight"
  | "flipIn"
  | "glowIn";

interface UseScrollRevealOptions {
  preset?: RevealPreset;
  threshold?: number;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  childSelector?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: UseScrollRevealOptions = {}
): RefObject<T | null> {
  const {
    preset = "fadeUp",
    threshold = 0.15,
    delay = 0,
    duration = 700,
    staggerDelay = 100,
    childSelector,
    once = true,
  } = options;

  const ref = useRef<T | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial hidden state
    const applyInitial = (targets: Element | NodeListOf<Element>) => {
      const els = targets instanceof Element ? [targets] : Array.from(targets);
      els.forEach((e) => {
        const htmlEl = e as HTMLElement;
        switch (preset) {
          case "fadeUp":
          case "staggerFadeUp":
            htmlEl.style.opacity = "0";
            htmlEl.style.transform = "translateY(48px)";
            break;
          case "fadeLeft":
          case "slideInLeft":
            htmlEl.style.opacity = "0";
            htmlEl.style.transform = "translateX(-60px)";
            break;
          case "fadeRight":
          case "slideInRight":
            htmlEl.style.opacity = "0";
            htmlEl.style.transform = "translateX(60px)";
            break;
          case "scaleIn":
          case "staggerScaleIn":
            htmlEl.style.opacity = "0";
            htmlEl.style.transform = "scale(0.75)";
            break;
          case "flipIn":
            htmlEl.style.opacity = "0";
            htmlEl.style.transform = "rotateX(-45deg) translateY(40px)";
            htmlEl.style.transformOrigin = "top center";
            break;
          case "glowIn":
            htmlEl.style.opacity = "0";
            htmlEl.style.transform = "scale(0.9)";
            htmlEl.style.filter = "blur(8px)";
            break;
        }
      });
    };

    const targets = childSelector ? el.querySelectorAll(childSelector) : el;
    applyInitial(targets);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (once && hasAnimated.current) return;
          hasAnimated.current = true;

          const animTargets = childSelector ? el.querySelectorAll(childSelector) : el;

          const shared = {
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration,
            delay: childSelector ? stagger(staggerDelay, { start: delay }) : delay,
          };

          switch (preset) {
            case "fadeUp":
            case "staggerFadeUp":
              animate(animTargets, {
                ...shared,
                translateY: ["48px", "0px"],
              });
              break;
            case "fadeLeft":
            case "slideInLeft":
              animate(animTargets, {
                ...shared,
                translateX: ["-60px", "0px"],
              });
              break;
            case "fadeRight":
            case "slideInRight":
              animate(animTargets, {
                ...shared,
                translateX: ["60px", "0px"],
              });
              break;
            case "scaleIn":
            case "staggerScaleIn":
              animate(animTargets, {
                ...shared,
                scale: [0.75, 1],
                easing: "spring(1, 80, 12, 0)",
              });
              break;
            case "flipIn":
              animate(animTargets, {
                ...shared,
                opacity: [0, 1],
                translateY: ["40px", "0px"],
                rotateX: ["-45deg", "0deg"],
                easing: "easeOutBack",
              });
              break;
            case "glowIn":
              animate(animTargets, {
                ...shared,
                scale: [0.9, 1],
                filter: ["blur(8px)", "blur(0px)"],
                easing: "easeOutExpo",
              });
              break;
          }

          if (once) observer.disconnect();
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [preset, threshold, delay, duration, staggerDelay, childSelector, once]);

  return ref;
}
