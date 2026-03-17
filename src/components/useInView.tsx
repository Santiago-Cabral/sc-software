import { useEffect, useRef, useState } from "react";
import type React from "react";

export default function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIntersecting(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // cast necesario en React 19 donde useRef<T>(null) retorna RefObject<T | null>
  return { ref: ref as unknown as React.RefObject<T>, isIntersecting };
}