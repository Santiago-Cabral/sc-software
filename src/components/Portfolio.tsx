import { useState } from "react";

const projects = [
  {
    title: "Forrajería Jovita",
    tag: "E-commerce",
    desc: "Tienda online completa con catálogo de productos, carrito y pagos con tarjeta.",
    color: "#00E5FF",
    url: "https://www.jovita.store",
    img: "https://images.unsplash.com/photo-1601598851547-4302969d0614?q=80&w=900",
    tech: ["React", ".NET", "SQL Server"],
  },
  {
    title: "Sole Costilla Group",
    tag: "Web Corporativa",
    desc: "Sitio profesional para inmobiliaria. Diseño moderno y presentación de servicios.",
    color: "#7B61FF",
    url: "https://solecostillagroup.com",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=900",
    tech: ["Vite", "Tailwind", "Framer Motion"],
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-white mb-4">Proyectos destacados</h2>
          <p className="text-muted">Soluciones reales para problemas reales.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p) => (
            <div key={p.title} className="group relative bg-surface border border-white/5 rounded-3xl overflow-hidden hover:border-[#00E5FF44] transition-all">
              <img src={p.img} alt={p.title} className="w-full h-64 object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="p-8">
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 mb-4 inline-block" style={{color: p.color}}>
                  {p.tag}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">{p.title}</h3>
                <p className="text-muted mb-6">{p.desc}</p>
                <div className="flex gap-2 mb-6">
                  {p.tech.map(t => <span key={t} className="text-[10px] bg-white/5 px-2 py-1 rounded text-white/50">{t}</span>)}
                </div>
                <a href={p.url} target="_blank" className="text-white font-bold flex items-center gap-2 hover:gap-4 transition-all">
                  Ver sitio live <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}