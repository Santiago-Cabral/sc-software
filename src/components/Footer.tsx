import React from "react";
import { ShieldCheck, Mail, MapPin, Phone } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const gridRef = useScrollReveal<HTMLDivElement>({
    preset: "staggerFadeUp",
    threshold: 0.15,
    childSelector: "[data-footer-col]",
    staggerDelay: 100,
    duration: 650,
  });
  const bottomRef = useScrollReveal<HTMLDivElement>({ preset: "fadeUp", delay: 300, duration: 500, threshold: 0.2 });

  return (
    <footer className="border-t border-brand-border bg-black py-16 text-gray-500 font-sans">
      <div className="max-w-6xl mx-auto px-6">

        {/* Main Footer grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Logo & Info */}
          <div data-footer-col className="space-y-4 md:col-span-2" style={{ opacity: 0 }}>
            <div className="flex items-center gap-2">
              <img src="/logo.webp" alt="SC Software Logo" className="h-7 w-auto object-contain rounded-sm" />
              <span className="font-sans font-black text-sm tracking-wider text-white">
                SOFTWARE<span className="text-brand-gold">.</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
              Automatizaciones express, catálogos interactivos, desarrollo de sitios web premium y sistemas a medida para empresas y negocios en Tucumán.
            </p>
            <div className="text-[10px] font-mono text-brand-gold/80 bg-brand-gold/5 border border-brand-gold/20 px-3 py-1 rounded-xl w-fit">
              ● PRODUCIDO EN TUCUMÁN, ARGENTINA
            </div>
          </div>

          {/* Contact Details */}
          <div data-footer-col className="space-y-3" style={{ opacity: 0 }}>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white">Contacto Directo</h4>
            <div className="space-y-2 text-xs">
              <a href="mailto:s1c.softwares@gmail.com" className="flex items-center gap-2 hover:text-brand-gold transition duration-200">
                <Mail size={12} className="text-brand-gold" />
                s1c.softwares@gmail.com
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-brand-gold" />
                S. M. de Tucumán, Argentina
              </div>
              <a href="https://wa.me/543815502176" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-brand-gold transition duration-200">
                <Phone size={12} className="text-brand-gold" />
                +54 381 550-2176
              </a>
            </div>
          </div>

          {/* Guarantee */}
          <div data-footer-col className="space-y-3" style={{ opacity: 0 }}>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white">Garantía</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Todos nuestros sistemas incluyen garantía de soporte técnico de 60 días tras el lanzamiento en producción.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-green-400 font-medium">
              <ShieldCheck size={14} /> Sello de Calidad SC
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div ref={bottomRef} className="pt-8 border-t border-brand-border/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <div>© {currentYear} SC Software. Todos los derechos reservados.</div>
          <div className="flex items-center gap-4 text-[10px] font-mono">
            <span>PLATFORM: REACT + TAILWIND CSS v4</span>
            <span>|</span>
            <span>TIME: 2026 UTC</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
