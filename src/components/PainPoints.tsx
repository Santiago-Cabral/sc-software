import React, { useEffect, useRef } from "react";
import { MessageSquareOff, CalendarDays, FileX, ArrowRight, CornerRightDown } from "lucide-react";
import { animate, stagger } from "animejs";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function PainPointsSection() {
  const headerRef = useScrollReveal<HTMLDivElement>({ preset: "fadeUp", threshold: 0.2 });
  const cardsRef = useScrollReveal<HTMLDivElement>({
    preset: "staggerScaleIn",
    threshold: 0.1,
    childSelector: "[data-pain-card]",
    staggerDelay: 120,
    duration: 750,
  });
  const ctaRowRef = useScrollReveal<HTMLDivElement>({ preset: "fadeUp", delay: 100, threshold: 0.3 });

  // Red glow pulse on section blob
  const blobRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!blobRef.current) return;
    animate(blobRef.current, {
      scale: [1, 1.3, 1],
      opacity: [0.05, 0.12, 0.05],
      duration: 5000,
      loop: true,
      easing: "easeInOutSine",
    });
  }, []);

  const pains = [
    {
      icon: <MessageSquareOff className="text-red-400 group-hover:scale-110 transition-transform duration-300" size={32} />,
      title: "Pedidos perdidos en chats en espera",
      problem: "El cliente manda un WhatsApp a las 21:00 hs con hambre o apurado. Nadie responde en 15 minutos. Cancela el pedido y le compra a otro negocio en PedidosYa que atiende de inmediato.",
      metric: "Pérdida promedio",
      metricValue: "30% de consultas diarias",
      impact: "Alta fricción e improductividad",
    },
    {
      icon: <CalendarDays className="text-red-400 group-hover:scale-110 transition-transform duration-300" size={32} />,
      title: "Caos de turnos manuales y plantones",
      problem: "Tu recepcionista o estilista pasa horas respondiendo si hay lugar 'el sábado a las 16 hs'. Agendan a mano en un cuaderno. Cero avisos de recordatorio: el 20% de los clientes se olvida y no aparece.",
      metric: "Horas perdidas",
      metricValue: "15+ horas de chat/semana",
      impact: "Sillas vacías y fuga de dinero",
    },
    {
      icon: <FileX className="text-red-400 group-hover:scale-110 transition-transform duration-300" size={32} />,
      title: "Catálogos PDFs desactualizados",
      problem: "Mandar un PDF pesado que el cliente debe descargar para ver precios desactualizados por la inflación. El cliente pregunta '¿tenés stock de esto?' y tenés que revisar stock a mano cada vez.",
      metric: "Fuga de efectividad",
      metricValue: "Ventas frustradas al instante",
      impact: "Imagen amateur e informal",
    },
  ];

  return (
    <section id="problemas" className="py-24 border-t border-brand-border bg-[#0d0d0d] relative overflow-hidden">
      {/* Animated red blob */}
      <div
        ref={blobRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-950 rounded-full blur-3xl pointer-events-none"
        style={{ opacity: 0.05 }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-[#E56B6B] uppercase border border-red-500/20 bg-red-500/5 px-3 py-1 rounded-full">
            El Costo de Seguir Igual
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white mt-4 mb-6">
            Hojas de cuaderno y chats sin responder{" "}
            <span className="text-red-400">matan tus márgenes</span>
          </h2>
          <p className="text-gray-400 font-sans text-base md:text-lg">
            Tomar pedidos, coordinar entregas o agendar turnos de forma manual ya no es sostenible. Si tu negocio depende enteramente de que alguien responda un teléfono, tenés un cuello de botella financiero.
          </p>
          <div className="flex justify-center mt-6">
            <CornerRightDown className="text-brand-gold animate-bounce" size={20} />
          </div>
        </div>

        {/* Cards grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {pains.map((pain, idx) => (
            <div
              key={idx}
              data-pain-card
              className="group glass-card transition-all duration-300 p-8 rounded-xl flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_8px_40px_rgba(229,107,107,0.12)] relative cursor-default"
              style={{ opacity: 0 }}
            >
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-red-500/60 transition-all duration-500 rounded-t-xl" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-gray-500 text-xs font-mono font-bold uppercase">Problema #0{idx + 1}</div>
                  <div className="p-2 bg-red-500/5 border border-red-500/10 rounded-lg group-hover:border-red-500/30 transition-all duration-300">
                    {pain.icon}
                  </div>
                </div>
                <h3 className="text-lg font-extrabold text-[#E56B6B] uppercase tracking-tighter mb-4 group-hover:text-red-400 transition-colors duration-200">
                  {pain.title}
                </h3>
                <div className="h-px bg-brand-gold/20 mb-4" />
                <p className="text-sm text-gray-400 leading-relaxed font-sans font-light mb-8 italic">
                  {pain.problem}
                </p>
              </div>

              <div className="pt-6 border-t border-brand-border/40">
                <div className="text-[10px] font-mono uppercase text-gray-500 tracking-wider">{pain.metric}</div>
                <div className="text-2xl font-mono font-extrabold text-brand-gold mt-1 uppercase tracking-tighter">
                  {pain.metricValue}
                </div>
                <div className="text-[11px] font-sans text-gray-400 mt-2 font-medium">
                  Impacto:{" "}
                  <span className="text-red-400/90 font-bold uppercase">{pain.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div ref={ctaRowRef} className="mt-12 text-center">
          <p className="text-sm text-gray-500 font-sans">
            ¿Reconoces tu negocio en estas situaciones?{" "}
            <a href="#calculadora" className="text-brand-gold hover:underline inline-flex items-center gap-1 font-medium ml-1">
              Calcular tu fuga mensual exacta de ventas <ArrowRight size={12} />
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
