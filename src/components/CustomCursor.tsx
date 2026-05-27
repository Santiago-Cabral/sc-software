import { useEffect, useRef } from "react";
import { animate } from "animejs";

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!dot || !ring || !glow) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX  = mouseX;
    let ringY  = mouseY;
    let glowX  = mouseX;
    let glowY  = mouseY;
    let raf: number;

    // ── Smooth trailing ring + glow via rAF ──────────────────────────────────
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      glowX = lerp(glowX, mouseX, 0.06);
      glowY = lerp(glowY, mouseY, 0.06);

      dot.style.transform  = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // ── Mouse move ─────────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Spawn a trail particle
      spawnTrail(e.clientX, e.clientY);
    };

    // ── Trail particles ────────────────────────────────────────────────────
    let lastTrailTime = 0;
    const spawnTrail = (x: number, y: number) => {
      const now = Date.now();
      if (now - lastTrailTime < 40) return; // throttle ~25fps
      lastTrailTime = now;

      const trail = document.createElement("div");
      trail.style.cssText = `
        position: fixed;
        left: 0; top: 0;
        width: 5px; height: 5px;
        border-radius: 50%;
        background: #D4AF37;
        pointer-events: none;
        z-index: 9998;
        transform: translate(${x}px, ${y}px) translate(-50%, -50%);
      `;
      document.body.appendChild(trail);

      animate(trail, {
        opacity: [0.55, 0],
        scale: [1, 0.1],
        translateX: [(Math.random() - 0.5) * 18],
        translateY: [(Math.random() - 0.5) * 18 - 8],
        duration: 520,
        easing: "easeOutExpo",
        onComplete: () => trail.remove(),
      });
    };

    // ── Hover effect on interactive elements ──────────────────────────────
    const onEnter = () => {
      animate(ring, {
        scale: [1, 2.2],
        opacity: [0.7, 0.3],
        borderColor: ["rgba(212,175,55,0.7)", "rgba(212,175,55,1)"],
        duration: 300,
        easing: "easeOutExpo",
      });
      animate(dot, {
        scale: [1, 0.4],
        duration: 250,
        easing: "easeOutExpo",
      });
      animate(glow, {
        scale: [1, 2],
        opacity: [0.12, 0.28],
        duration: 300,
        easing: "easeOutExpo",
      });
    };

    const onLeave = () => {
      animate(ring, {
        scale: [null, 1],
        opacity: [null, 0.7],
        borderColor: ["rgba(212,175,55,1)", "rgba(212,175,55,0.7)"],
        duration: 350,
        easing: "easeOutElastic(1, 0.5)",
      });
      animate(dot, {
        scale: [null, 1],
        duration: 300,
        easing: "easeOutElastic(1, 0.5)",
      });
      animate(glow, {
        scale: [null, 1],
        opacity: [null, 0.12],
        duration: 350,
        easing: "easeOutExpo",
      });
    };

    // ── Click burst ────────────────────────────────────────────────────────
    const onClick = () => {
      animate(ring, {
        scale: [1, 2.8, 1],
        opacity: [0.7, 0, 0.7],
        duration: 480,
        easing: "easeOutExpo",
      });
      animate(dot, {
        scale: [1, 1.8, 1],
        duration: 350,
        easing: "easeOutExpo",
      });
    };

    // Attach hover listeners to all interactive elements
    const selectors = "a, button, [role='button'], input, textarea, select, label";
    const interactives = document.querySelectorAll<HTMLElement>(selectors);
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Watch for new DOM nodes (e.g., dynamically added buttons)
    const observer = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>(selectors).forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);

    // Hide on mouse leave window
    const onOut = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; glow.style.opacity = "0"; };
    const onIn  = () => { dot.style.opacity = "1"; ring.style.opacity = "0.7"; glow.style.opacity = "0.12"; };
    document.addEventListener("mouseleave", onOut);
    document.addEventListener("mouseenter", onIn);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      document.removeEventListener("mouseleave", onOut);
      document.removeEventListener("mouseenter", onIn);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Outer trailing ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(212,175,55,0.7)",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          mixBlendMode: "screen",
        }}
      />

      {/* Center dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "#D4AF37",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
        }}
      />

      {/* Soft glow behind */}
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 9997,
          willChange: "transform",
          opacity: 0.12,
        }}
      />
    </>
  );
}
