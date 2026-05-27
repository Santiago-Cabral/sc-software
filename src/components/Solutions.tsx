import React, { useEffect, useRef } from "react";
import { MessageSquareCode, ShoppingBag, CalendarCheck, ShieldCheck, Zap, Code2 } from "lucide-react";
import { animate } from "animejs";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function SolutionsSection() {
  const headerRef = useScrollReveal<HTMLDivElement>({ preset: "slideInLeft", threshold: 0.2, duration: 700 });
  const cardsRef = useScrollReveal<HTMLDivElement>({
    preset: "staggerFadeUp",
    threshold: 0.1,
    childSelector: "[data-sol-card]",
    staggerDelay: 130,
    duration: 700,
  });
  const bannerRef = useScrollReveal<HTMLDivElement>({ preset: "glowIn", threshold: 0.3, duration: 900 });

  // Gold glow orb animation
  const orbRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!orbRef.current) return;
    animate(orbRef.current, {
      scale: [1, 1.4, 1],
      opacity: [0.04, 0.1, 0.04],
      duration: 7000,
      loop: true,
      easing: "easeInOutSine",
    });
  }, []);

  const solutions = [
    {
      icon: <ShoppingBag className="text-brand-gold" size={28} />,
      title: "Catálogos Inteligentes de Pedidos",
      sub: "Reemplazo de E-commerce pesado",
      description: "Una web ultraveloz optimizada para móviles donde tus clientes eligen, arman su combo y confirman el pedido. Genera un link directo a tu WhatsApp con el detalle estructurado (ítems, envío, método de pago, cliente), reduciendo la charla manual a 1 solo toque.",
      metric: "Conversión de ventas",
      metricValue: "+40% de efectividad",
      benefit: "Optimizado para gastronómicos y locales minoristas",
    },
    {
      icon: <MessageSquareCode className="text-brand-gold" size={28} />,
      title: "Agentes de Atención de WhatsApp",
      sub: "Atención comercial automatizada",
      description: "Asistentes virtuales entrenados específicamente con la información de tu negocio. No son bots rígidos de opciones: entienden frases naturales, envían fotos, cotizan presupuestos automáticos, sugieren productos complementarios y cierran la venta las 24 horas.",
      metric: "Atención al instante",
      metricValue: "0% chats olvidados",
      benefit: "Disponibilidad 24/7 sin costo fijos de recepcionistas",
    },
    {
      icon: <CalendarCheck className="text-brand-gold" size={28} />,
      title: "Agendadores de Turnos Autónomos",
      sub: "Planificación comercial integrada",
      description: "Un link interactivo de reserva que muestra tus disponibilidades reales integradas a tu calendario. Los clientes seleccionan el servicio, eligen el profesional, pagan la seña por MercadoPago y reservan. El sistema envía recordatorios automáticos por WhatsApp reduciendo ausencias a cero.",
      metric: "Ausentismo de clientes",
      metricValue: "Reducción del 95%",
      benefit: "Perfecto para barberías, estéticas, médicos y canchas de deportes",
    },
    {
      icon: <Code2 className="text-brand-gold" size={28} />,
      title: "Sitios Web & Sistemas a Medida",
      sub: "Desarrollo de Software Custom",
      description: "Diseñamos y programamos desde landing pages corporativas de alto impacto hasta sistemas de gestión (ERPs) y plataformas personalizadas complejas. Traducimos las necesidades únicas de tu negocio en software escalable, seguro y estéticamente premium.",
      metric: "Escalabilidad",
      metricValue: "100% Personalizado",
      benefit: "Desarrollos únicos para lógicas de negocio complejas",
    },
  ];

  return (
    <section id="soluciones" className="py-24 border-t border-brand-border bg-[#0A0A0A] relative overflow-hidden">
      {/* Animated gold orb */}
      <div
        ref={orbRef}
        className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-brand-gold rounded-full blur-3xl pointer-events-none"
        style={{ opacity: 0.04 }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div ref={headerRef} className="text-center md:text-left mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-gold/20 bg-brand-gold/5 rounded-full text-xs text-brand-gold font-mono uppercase tracking-wider mb-4">
            <Zap size={12} className="animate-pulse" />
            Infraestructura Comercial
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white mb-6">
            Sistemas a la medida de tu caja diaria. <br />
            <span className="text-brand-gold">Cero complicaciones técnicas.</span>
          </h2>
          <p className="text-gray-400 font-sans text-base md:text-lg leading-relaxed">
            No vendemos software genérico ni te enredamos con términos de programación. Te instalamos motores que aumentan tu facturación, te liberan del teléfono y te reportan ganancias todos los días.
          </p>
        </div>

        {/* Solutions Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {solutions.map((sol, index) => (
            <div
              key={index}
              data-sol-card
              className="glass-card hover:border-brand-gold/50 transition-all duration-400 p-8 rounded-xl flex flex-col justify-between group relative hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(212,175,55,0.1)]"
              style={{ opacity: 0 }}
            >
              {/* Index tag */}
              <div className="absolute top-0 right-0 text-[10px] font-mono font-bold text-gray-500 bg-neutral-900 border-l border-b border-brand-border px-3 py-1 rounded-bl-lg">
                SOL-0{index + 1}
              </div>

              {/* Hover top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-brand-gold/50 transition-all duration-500 rounded-t-xl" />

              <div>
                <div className="mb-6 p-4 bg-brand-gold/5 border border-brand-gold/10 w-fit rounded-xl group-hover:border-brand-gold/40 group-hover:bg-brand-gold/10 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-400">
                  {sol.icon}
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-brand-gold">
                  {sol.sub}
                </span>
                <h3 className="text-xl font-sans font-extrabold text-white mt-1 mb-4 uppercase tracking-tighter group-hover:text-brand-gold transition-colors duration-200">
                  {sol.title}
                </h3>
                <p className="text-sm text-gray-400 font-sans leading-relaxed font-light mb-8 italic">
                  {sol.description}
                </p>
              </div>

              <div className="pt-6 border-t border-brand-border/40">
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Impacto medido</div>
                <div className="text-2xl font-mono font-extrabold text-white mt-1 uppercase tracking-tighter group-hover:text-brand-gold transition-colors duration-300">
                  {sol.metricValue}
                </div>
                <div className="text-xs text-brand-gold mt-1 font-sans font-medium">{sol.benefit}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner */}
        <div ref={bannerRef} className="mt-16 glass-card p-8 flex flex-col md:flex-row justify-between items-center gap-6 rounded-xl border-t-2 border-t-brand-gold">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold rounded-xl hidden sm:block">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-lg font-sans font-bold text-white uppercase tracking-tighter">
                ¿Por qué SC Software en Tucumán?
              </h4>
              <p className="text-sm text-gray-400 font-sans mt-0.5">
                Adaptamos nuestros sistemas 100% a la idiosincrasia de compra tucumana por WhatsApp. Instalación limpia y soporte post-lanzamiento.
              </p>
            </div>
          </div>
          <a
            href="#agendar"
            className="w-full md:w-auto px-6 py-3 bg-brand-gold hover:bg-brand-gold-hover text-brand-black hover:brightness-110 transition-all duration-300 font-sans font-extrabold text-xs uppercase tracking-tighter text-center shrink-0 rounded-xl"
          >
            Ver demo en vivo
          </a>
        </div>

      </div>
    </section>
  );
}
