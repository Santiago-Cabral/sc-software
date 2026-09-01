import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { animate, createTimeline, stagger } from "animejs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: "Problemas", href: "#problemas" },
    { label: "Fuga Financiera", href: "#calculadora" },
  ];

  useEffect(() => {
    if (!navRef.current) return;

    // Timeline encadenada de entrada
    const tl = createTimeline({ defaults: { duration: 600 } });

    // 1. Navbar baja desde arriba
    tl.add(navRef.current, {
      translateY: [-60, 0],
      opacity: [0, 1],
      duration: 700,
    });

    // 2. Logo desliza desde la izquierda
    if (logoRef.current) {
      tl.add(logoRef.current, {
        opacity: [0, 1],
        translateX: [-20, 0],
        scale: [0.88, 1],
        duration: 550,
      }, "-=400");
    }

    // 3. Links aparecen en cascada
    const linkEls = linksRef.current?.querySelectorAll("a");
    if (linkEls && linkEls.length > 0) {
      tl.add(linkEls, {
        opacity: [0, 1],
        translateY: [-10, 0],
        delay: stagger(70),
        duration: 450,
      }, "-=320");
    }

    // 4. Botón CTA entra desde la derecha
    if (ctaRef.current) {
      tl.add(ctaRef.current, {
        opacity: [0, 1],
        translateX: [20, 0],
        scale: [0.9, 1],
        duration: 500,
      }, "-=300");
    }

    // 5. Pulso dorado infinito en el botón CTA
    const ctaBtn = ctaRef.current?.querySelector("a");
    if (ctaBtn) {
      animate(ctaBtn, {
        boxShadow: [
          "0 0 0px 0px rgba(212,175,55,0)",
          "0 0 16px 5px rgba(212,175,55,0.4)",
          "0 0 0px 0px rgba(212,175,55,0)",
        ],
        duration: 2400,
        loop: true,
        easing: "easeInOutSine",
        delay: 1400,
      });
    }
  }, []);

  return (
    <nav
      ref={navRef}
      style={{ opacity: 0 }}
      className="border-b border-brand-border/80 bg-[#0A0A0A]/95 sticky top-0 z-50 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <a ref={logoRef} href="#" style={{ opacity: 0 }} className="flex items-center gap-2 group">
          <img src="/logo.webp" alt="SC Software Logo" className="h-8 w-auto object-contain rounded-sm" />
          <span className="font-sans font-black text-lg tracking-wider text-white">
            SOFTWARE<span className="text-brand-gold">.</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div ref={linksRef} className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{ opacity: 0 }}
              className="text-xs font-sans font-bold uppercase tracking-wider text-gray-400 hover:text-brand-gold transition duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div ref={ctaRef} style={{ opacity: 0 }} className="hidden md:block">
          <a
            href="#agendar"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-black transition-all duration-300 font-sans font-bold text-[11px] uppercase tracking-wider rounded-xl"
          >
            Diagnóstico Sin Cargo
            <ArrowRight size={12} />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-brand-gold cursor-pointer"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-brand-border bg-[#0d0d0d] px-6 py-6 space-y-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-xs font-sans font-bold uppercase tracking-wider text-gray-400 hover:text-brand-gold transition duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#agendar"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-3 bg-brand-gold text-brand-black text-xs font-sans font-bold uppercase tracking-widest rounded-xl block"
            >
              Diagnóstico Sin Cargo
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
