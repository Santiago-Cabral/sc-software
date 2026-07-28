/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

import React, { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import PainPointsSection from "./components/PainPoints";
import CalculatorSection from "./components/Calculator";
import SolutionsSection from "./components/Solutions";
import InteractivePlayground from "./components/InteractivePlayground";
import SchedulerSection from "./components/Scheduler";
import Footer from "./components/Footer";
import { animate, createTimeline, stagger } from "animejs";

export default function App() {
  const badgeRef    = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctasRef     = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const bgGlowRef   = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── 1. BG GLOW pulse (infinite) ──────────────────────────────────────────
    if (bgGlowRef.current) {
      animate(bgGlowRef.current, {
        scale: [1, 1.15, 1],
        opacity: [0.35, 0.65, 0.35],
        duration: 6000,
        loop: true,
        easing: "easeInOutSine",
      });
    }

    // ── 2. FLOATING PARTICLES (infinite) ─────────────────────────────────────
    if (particlesRef.current) {
      particlesRef.current.querySelectorAll<HTMLElement>(".particle").forEach((dot, i) => {
        animate(dot, {
          translateY: [0, -(15 + (i % 4) * 10), 0],
          translateX: [0, ((i % 3) - 1) * 12, 0],
          opacity: [0.12, 0.5, 0.12],
          duration: 3500 + (i * 400) % 2500,
          loop: true,
          delay: i * 180,
          easing: "easeInOutSine",
        });
      });
    }

    // ── 3. HERO ENTRANCE TIMELINE ────────────────────────────────────────────
    const tl = createTimeline();

    if (badgeRef.current) {
      tl.add(badgeRef.current, {
        opacity: [0, 1],
        translateY: [-28, 0],
        scale: [0.82, 1],
        duration: 650,
        delay: 200,
        easing: "easeOutExpo",
      });
    }

    // Headline: animate the words, NOT the parent h1 (parent stays visible)
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll<HTMLElement>(".word");
      tl.add(words, {
        opacity: [0, 1],
        translateY: [40, 0],
        rotateZ: ["-3deg", "0deg"],
        delay: stagger(70),
        duration: 580,
        easing: "easeOutBack",
      }, "-=380");
    }

    if (subRef.current) {
      tl.add(subRef.current, {
        opacity: [0, 1],
        translateY: [22, 0],
        duration: 580,
      }, "-=320");
    }

    if (ctasRef.current) {
      const btns = ctasRef.current.querySelectorAll<HTMLElement>("a");
      tl.add(btns, {
        opacity: [0, 1],
        scale: [0.82, 1],
        delay: stagger(110),
        duration: 520,
        easing: "spring(1, 90, 14, 0)",
      }, "-=280");
    }

    if (statsRef.current) {
      const cards = statsRef.current.querySelectorAll<HTMLElement>("[data-stat]");
      tl.add(cards, {
        opacity: [0, 1],
        translateY: [36, 0],
        scale: [0.9, 1],
        delay: stagger(85),
        duration: 580,
        easing: "easeOutBack",
      }, "-=200");
    }

    // ── 4. COUNT-UP on stats ─────────────────────────────────────────────────
    setTimeout(() => {
      if (!statsRef.current) return;
      statsRef.current.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = el.getAttribute("data-count") || "";
        const isPlus = target.startsWith("+");
        const isMinus = target.startsWith("-");
        const isPercent = target.includes("%");
        const num = parseInt(target.replace(/[^0-9]/g, ""), 10);
        if (isNaN(num)) return;
        const obj = { val: 0 };
        animate(obj, {
          val: num,
          duration: 1600,
          easing: "easeOutExpo",
          onUpdate: () => {
            const v = Math.round(obj.val);
            el.textContent = `${isMinus ? "-" : isPlus ? "+" : ""}${v}${isPercent ? "%" : ""}`;
          },
          onComplete: () => { el.textContent = target; },
        });
      });
    }, 1600);

    // ── 5. CTA shimmer (infinite) ─────────────────────────────────────────────
    setTimeout(() => {
      const cta = ctasRef.current?.querySelector<HTMLElement>("a:first-child");
      if (cta) {
        animate(cta, {
          boxShadow: [
            "0 0 0px 0px rgba(212,175,55,0)",
            "0 0 22px 5px rgba(212,175,55,0.4)",
            "0 0 0px 0px rgba(212,175,55,0)",
          ],
          duration: 2500,
          loop: true,
          easing: "easeInOutSine",
        });
      }
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans antialiased overflow-x-hidden selection:bg-brand-gold selection:text-brand-black industrial-grid">

      <CustomCursor />

      {/* Animated background glow */}
      <div
        ref={bgGlowRef}
        className="absolute inset-x-0 top-0 h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-gold/8 via-neutral-900/20 to-[#0A0A0A] pointer-events-none z-0"
        style={{ opacity: 0.35 }}
      />

      {/* Floating gold particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full bg-brand-gold"
            style={{
              width: i % 3 === 0 ? "3px" : "2px",
              height: i % 3 === 0 ? "3px" : "2px",
              left: `${5 + (i * 5.8) % 90}%`,
              top: `${6 + (i * 6.1) % 65}%`,
              opacity: 0.12,
            }}
          />
        ))}
      </div>

      <Navbar />

      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-20 md:pt-36 md:pb-32 px-4 sm:px-6 overflow-hidden z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center gap-8">

            {/* Badge */}
            <div
              ref={badgeRef}
              style={{ opacity: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-xs font-mono font-bold tracking-widest text-brand-gold uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping shrink-0" />
              ESTUDIO TÉCNICO EN TUCUMÁN
            </div>

            {/* Headline — parent always visible; only .word children animate */}
            <h1
              ref={headlineRef}
              className="w-full text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold leading-[1] tracking-tighter uppercase text-white text-center break-words"
            >
              <span className="word inline-block" style={{ opacity: 0 }}>MENOS</span>{" "}
              <span className="word inline-block" style={{ opacity: 0 }}>PROCESOS.</span>
              <br />
              <span className="word inline-block text-brand-gold" style={{ opacity: 0 }}>MÁS</span>{" "}
              <span className="word inline-block text-brand-gold" style={{ opacity: 0 }}>ESCALA.</span>
            </h1>

            {/* Sub */}
            <p
              ref={subRef}
              style={{ opacity: 0 }}
              className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed font-light"
            >
              Digitalizamos negocios en Tucumán con Agentes de IA, automatizaciones por WhatsApp,{" "}
              <strong className="text-gray-300 font-semibold">y además desarrollamos webs premium y sistemas a medida</strong>{" "}
              para escalar tu empresa al siguiente nivel.
            </p>

            {/* CTAs */}
            <div ref={ctasRef} className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm sm:max-w-md">
              <a
                href="#agendar"
                style={{ opacity: 0 }}
                className="px-7 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-black hover:brightness-110 transition-all duration-300 font-extrabold uppercase tracking-tighter text-center rounded-xl text-sm"
              >
                Agendá Diagnóstico Gratis
              </a>
              <a
                href="#casos"
                style={{ opacity: 0 }}
                className="px-7 py-4 border border-brand-gold text-brand-gold bg-transparent hover:bg-brand-gold hover:text-brand-black transition-all duration-300 font-extrabold uppercase tracking-tighter text-center rounded-xl text-sm"
              >
                Ver Casos de Éxito
              </a>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl pt-12 border-t border-brand-border/60"
            >
              {[
                { value: "-90%", count: "-90%", label: "TIEMPO DE CHAT MANUAL" },
                { value: "+45%", count: "+45%", label: "CONVERSIÓN DE PEDIDOS" },
                { value: "0%",   count: "0%",   label: "COMISIÓN DE APPS" },
                { value: "24/7", count: null,   label: "ATENCIÓN INMEDIATA" },
              ].map((stat, i) => (
                <div
                  key={i}
                  data-stat
                  style={{ opacity: 0 }}
                  className="p-4 bg-neutral-900/60 border border-brand-border text-center rounded-xl hover:border-brand-gold/40 hover:bg-neutral-800/60 transition-all duration-300 group"
                >
                  <div
                    className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-brand-gold group-hover:scale-110 transition-transform duration-300"
                    data-count={stat.count ?? undefined}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-gray-500 uppercase mt-1 tracking-wider leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <PainPointsSection />
      <SolutionsSection />
      <InteractivePlayground />
      <CalculatorSection />
      <SchedulerSection />
      <Footer />

    </div>
  );
}
