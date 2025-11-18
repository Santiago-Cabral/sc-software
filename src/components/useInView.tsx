// src/components/useInView.ts
import { useEffect, useRef, useState, RefObject } from "react";

export default function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIntersecting(true);
            // si querés que solo aparezca una vez, desconectamos
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, options]);

  return { ref: ref as RefObject<T>, isIntersecting };
}
