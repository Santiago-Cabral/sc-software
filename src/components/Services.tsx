import useInView from "./useInView";

type Service = {
  id: string;
  title: string;
  desc: string;
  features: string[];
  icon: string;
  color: string;
  bg: string;
};

const SERVICES: Service[] = [
  {
    id: "web",
    title: "Páginas Web",
    desc: "Landing pages, tiendas online y sitios corporativos optimizados para convertir visitantes en clientes.",
    features: ["100% Responsive", "SEO básico incluido", "Integración WhatsApp", "Panel de administración"],
    icon: "🌐",
    color: "#00E5FF",
    bg: "rgba(0,229,255,0.08)",
  },
  {
    id: "mobile",
    title: "Apps Mobile",
    desc: "Aplicaciones Android + iOS con panel administrativo, notificaciones push y conectadas a tu negocio.",
    features: ["React Native", "Publicación en stores", "Push Notifications", "APIs REST"],
    icon: "📱",
    color: "#7B61FF",
    bg: "rgba(123,97,255,0.08)",
  },
  {
    id: "system",
    title: "Sistemas a Medida",
    desc: "Gestión de ventas, stock, turnos, facturación y automatizaciones diseñadas para tu operación.",
    features: ["Reportes y métricas", "Roles y permisos", "Exportación Excel/PDF", "Automatizaciones"],
    icon: "⚙️",
    color: "#00FFA3",
    bg: "rgba(0,255,163,0.08)",
  },
];

function ServiceCard({ s, delay = 0 }: { s: Service; delay?: number }) {
  const { ref, isIntersecting } = useInView<HTMLDivElement>();

  const sendWhatsapp = () => {
    const msg = `Hola! Estoy interesado en el servicio de *${s.title}*.\n\n${s.desc}\n\n¿Me podés dar más información y presupuesto?`;
    window.open(`https://wa.me/5493815502176?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <article
      ref={ref}
      className={`sc-svc-card ${isIntersecting ? "visible" : ""}`}
      style={{
        transitionDelay: `${delay}ms`,
        "--card-color": s.color,
        "--card-bg": s.bg,
      } as React.CSSProperties}
    >
      <div className="sc-svc-icon">{s.icon}</div>
      <h3 className="sc-svc-title">{s.title}</h3>
      <p className="sc-svc-desc">{s.desc}</p>
      <ul className="sc-svc-features">
        {s.features.map((f) => (
          <li key={f}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
            </svg>
            {f}
          </li>
        ))}
      </ul>
      <button className="sc-svc-btn" onClick={sendWhatsapp}>
        Cotización GRATIS →
      </button>
    </article>
  );
}

export default function Services() {
  return (
    <>
      <style>{`
        .sc-services {
          padding: 100px 0;
          background: var(--bg);
        }
        .sc-services-header {
          text-align: center; margin-bottom: 60px;
        }
        .sc-services-sub {
          color: var(--muted); font-size: 1.05rem;
          max-width: 500px; margin: 0 auto; line-height: 1.7;
        }
        .sc-svc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .sc-svc-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 36px 32px;
          position: relative; overflow: hidden;
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, box-shadow 0.3s;
          cursor: default;
        }
        .sc-svc-card.visible { opacity: 1; transform: translateY(0); }
        .sc-svc-card::before {
          content: '';
          position: absolute; inset: 0;
          background: var(--card-bg);
          opacity: 0; transition: opacity 0.3s;
          border-radius: 18px;
        }
        .sc-svc-card:hover {
          border-color: var(--card-color);
          box-shadow: 0 0 40px rgba(0,0,0,0.2);
        }
        .sc-svc-card:hover::before { opacity: 1; }
        .sc-svc-icon {
          font-size: 2rem; margin-bottom: 20px;
          width: 56px; height: 56px;
          display: flex; align-items: center; justify-content: center;
          background: var(--card-bg);
          border: 1px solid var(--card-color);
          border-radius: 14px; position: relative;
          opacity: 0.9;
          transition: transform 0.2s;
        }
        .sc-svc-card:hover .sc-svc-icon { transform: scale(1.08); }
        .sc-svc-title {
          font-family: var(--font-display);
          font-size: 1.2rem; font-weight: 700;
          color: var(--white); margin-bottom: 10px;
          position: relative;
        }
        .sc-svc-desc {
          color: var(--muted); font-size: 0.9rem;
          line-height: 1.7; margin-bottom: 20px;
          position: relative;
        }
        .sc-svc-features {
          list-style: none; margin-bottom: 24px;
          display: flex; flex-direction: column; gap: 8px;
          position: relative;
        }
        .sc-svc-features li {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.85rem; color: var(--muted);
        }
        .sc-svc-features li svg { color: var(--card-color); flex-shrink: 0; }
        .sc-svc-btn {
          display: inline-flex; align-items: center;
          background: var(--card-color);
          color: #080C10;
          font-family: var(--font-body);
          font-size: 0.85rem; font-weight: 700;
          padding: 10px 20px; border-radius: 8px;
          border: none; cursor: pointer;
          transition: all 0.2s; position: relative;
        }
        .sc-svc-btn:hover {
          filter: brightness(1.15);
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
      `}</style>

      <section id="services" className="sc-services">
        <div className="sc-container">
          <div className="sc-services-header sc-reveal">
            <div className="sc-section-label">Qué hacemos</div>
            <h2 className="sc-section-title">Soluciones digitales<br />de punta a punta</h2>
            <p className="sc-services-sub">Web, Apps y sistemas a medida — soluciones prácticas para tu negocio.</p>
          </div>

          <div className="sc-svc-grid">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.id} s={s} delay={i * 120} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}