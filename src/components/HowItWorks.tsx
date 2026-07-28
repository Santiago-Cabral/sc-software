/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

const STEPS = [
  {
    n: "01",
    title: "AGENDÁ TU DIAGNÓSTICO",
    desc: "Completá el formulario con tu negocio y qué querés resolver. Es gratis y sin compromiso.",
  },
  {
    n: "02",
    title: "TE LLAMAMOS EN 24-48HS",
    desc: "Analizamos tu caso y te proponemos la solución concreta: agente de IA, automatización o desarrollo a medida.",
  },
  {
    n: "03",
    title: "RECIBÍS TU COTIZACIÓN",
    desc: "Presupuesto claro, con alcance, tiempos y plan de pago. Vos decidís si avanzamos.",
  },
  {
    n: "04",
    title: "LO IMPLEMENTAMOS",
    desc: "Desarrollamos, probamos con vos y ponemos todo en marcha con seguimiento post-entrega.",
  },
];

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = containerRef.current?.querySelectorAll<HTMLElement>("[data-step]");
            if (cards) {
              animate(cards, {
                opacity: [0, 1],
                translateY: [30, 0],
                delay: stagger(120),
                duration: 600,
                easing: "easeOutBack",
              });
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="como-funciona" className="relative py-20 md:py-28 px-4 sm:px-6 z-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-gold uppercase">
            PROCESO
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tighter text-white">
            Así es <span className="text-brand-gold">cotizar con nosotros</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto font-light">
            Cuatro pasos, sin vueltas, desde que nos escribís hasta que tu sistema está funcionando.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step) => (
            <div
              key={step.n}
              data-step
              style={{ opacity: 0 }}
              className="relative p-6 bg-neutral-900/60 border border-brand-border rounded-xl hover:border-brand-gold/40 hover:bg-neutral-800/60 transition-all duration-300"
            >
              <div className="text-3xl font-mono font-bold text-brand-gold/30 mb-3">
                {step.n}
              </div>
              <h3 className="text-sm font-extrabold uppercase tracking-tight text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#agendar"
            className="inline-block px-7 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-black hover:brightness-110 transition-all duration-300 font-extrabold uppercase tracking-tighter rounded-xl text-sm"
          >
            Empezar Ahora — Es Gratis
          </a>
        </div>
      </div>
    </section>
  );
}