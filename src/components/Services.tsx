import { useState } from "react";
import useInView from "./useInView";

type Service = { name: string; desc: string; items: string[]; icon: string };
type Tab = { id: string; label: string; emoji: string; color: string; services: Service[] };

const TABS: Tab[] = [
  {
    id: "web", label: "Web", emoji: "🌐", color: "#00E5FF",
    services: [
      { icon: "🎯", name: "Landing Page Premium", desc: "Diseñada para convertir visitas en clientes. Hero animado, SEO básico e integración WhatsApp.", items: ["100% Responsive", "SEO incluido", "Animaciones"] },
      { icon: "🏢", name: "Web Corporativa",      desc: "5–10 secciones con branding personalizado, formularios avanzados y panel de administración.", items: ["Multi-página", "CMS", "Panel Admin"] },
      { icon: "🛒", name: "Tienda Online",         desc: "E-commerce completo con carrito, Mercado Pago integrado y gestión de stock.",                 items: ["Mercado Pago", "Stock", "Pedidos"] },
      { icon: "📊", name: "Web App a Medida",      desc: "Sistema web con login, roles, reportes y dashboard. Hecho para escalar.",                     items: ["Roles & Permisos", "Reportes", "APIs REST"] },
    ],
  },
  {
    id: "mobile", label: "Apps Mobile", emoji: "📱", color: "#7B61FF",
    services: [
      { icon: "📅", name: "App de Servicios & Turnos", desc: "Reservas, turnos online, notificaciones push y pasarelas de pago.",                       items: ["React Native", "Push Notif.", "Pagos"] },
      { icon: "🛍️", name: "App Comercial",              desc: "Catálogo, carrito, gestión de pedidos e inventario con panel admin.",                    items: ["Carrito", "Inventario", "Panel"] },
      { icon: "📍", name: "App GPS & Tiempo Real",       desc: "Envíos, tracking en vivo y logística tipo Uber con mapas en tiempo real.",               items: ["Google Maps", "Real Time", "Rutas"] },
      { icon: "🔔", name: "App de Gestión Interna",      desc: "Para tu equipo: tareas, registros, reportes y comunicación desde el celular.",           items: ["Equipos", "Reportes", "Offline Mode"] },
    ],
  },
  {
    id: "desktop", label: "Escritorio", emoji: "🖥️", color: "#FFA500",
    services: [
      { icon: "🏪", name: "Sistema Punto de Venta",          desc: "POS completo con facturación, control de caja, stock y reportes. Funciona sin internet.", items: ["Facturación", "Offline", "Stock"] },
      { icon: "🏭", name: "Sistema de Gestión Empresarial",   desc: "ERP a medida: ventas, compras, producción y contabilidad integrados.",                   items: ["ERP", "Multi-usuario", "Exportación"] },
      { icon: "🗂️", name: "CRM de Escritorio",                desc: "Pipeline de ventas, seguimientos y recordatorios automáticos para tu equipo comercial.",  items: ["Pipeline", "Seguimientos", "Alertas"] },
      { icon: "📦", name: "Control de Stock & Logística",     desc: "Gestión de depósito, entradas/salidas, alertas de stock bajo y seguimiento de envíos.",   items: ["Depósito", "Alertas", "QR / Barcode"] },
    ],
  },
  {
    id: "auto", label: "Automatizaciones", emoji: "⚡", color: "#00FFA3",
    services: [
      { icon: "🤖", name: "Automatizaciones con Make",       desc: "Conectamos tus apps y eliminamos el trabajo manual. WhatsApp, Sheets, CRM — todo fluye solo.", items: ["Make / Zapier", "Webhooks", "No-code"] },
      { icon: "💬", name: "Bot de WhatsApp con IA",          desc: "Asistente virtual que responde, califica leads, agenda citas y escala a humano.",           items: ["WhatsApp API", "IA", "24/7"] },
      { icon: "📈", name: "Captación Automática de Leads",   desc: "Busca clientes en Google Maps, los analiza con IA y genera mensajes personalizados.",      items: ["Google Maps API", "IA / Groq", "Sheets"] },
      { icon: "⚙️", name: "Integración de APIs & Sistemas",  desc: "Conectamos sistemas que no se hablan. Facturación, logística, pagos — todo sincronizado.",  items: ["REST APIs", "Webhooks", "ETL"] },
    ],
  },
];

/* ─── Service Card ─────────────────────────────────────── */
function ServiceCard({ svc, color }: { svc: Service; color: string }) {
  const { ref, isIntersecting } = useInView<HTMLDivElement>();

  const wa = () => {
    const msg = `Hola! Estoy interesado en *${svc.name}*. ¿Me podés dar más información y presupuesto?`;
    window.open(`https://wa.me/5493815502176?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div
      ref={ref}
      className="svc-card"
      style={{
        opacity:    isIntersecting ? 1 : 0,
        transform:  isIntersecting ? "translateY(0)" : "translateY(28px)",
        transition: "opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1)",
        "--c": color,
      } as React.CSSProperties}
    >
      {/* Icon */}
      <div
        className="svc-icon"
        style={{ background: `${color}12`, borderColor: `${color}35` }}
      >
        {svc.icon}
      </div>

      {/* Text */}
      <h3 className="svc-name">{svc.name}</h3>
      <p className="svc-desc">{svc.desc}</p>

      {/* Tags */}
      <div className="svc-tags">
        {svc.items.map((t) => (
          <span className="svc-tag" key={t}>{t}</span>
        ))}
      </div>

      {/* CTA */}
      <button className="svc-cta" onClick={wa} style={{ color }}>
        Cotizar GRATIS
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </button>
    </div>
  );
}

/* ─── Services Section ─────────────────────────────────── */
export default function Services() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <>
      <style>{`
        /* ── Section ── */
        .svc-section {
          padding: 112px 24px;
          background: #080C10;
        }

        /* ── Tabs ── */
        .svc-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 44px;
        }

        .svc-tab {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 20px;
          border-radius: 12px;
          font-size: 0.87rem;
          font-weight: 500;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.07);
          background: transparent;
          color: #5a6a7a;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.22s cubic-bezier(0.22,1,0.36,1);
        }

        .svc-tab:hover {
          color: #E8EDF2;
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.04);
        }

        .svc-tab.active {
          border-color: rgba(0,229,255,0.35);
          background: rgba(0,229,255,0.09);
          color: #00E5FF;
          box-shadow: 0 0 20px rgba(0,229,255,0.08);
        }

        .svc-tab-emoji { font-size: 1rem; line-height: 1; }

        /* ── Grid ── */
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (max-width: 768px) {
          .svc-section { padding: 72px 16px; }
          .svc-grid { grid-template-columns: 1fr; }
        }

        /* ── Card ── */
        .svc-card {
          background: #111827;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          cursor: default;
          transition:
            border-color 0.22s,
            transform    0.22s,
            box-shadow   0.22s;
        }

        /* colored bottom line on hover */
        .svc-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0; height: 2px;
          background: var(--c, #00E5FF);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }

        .svc-card:hover {
          border-color: rgba(255,255,255,0.14);
          background: #131B24;
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.35);
        }

        .svc-card:hover::after { transform: scaleX(1); }

        /* ── Icon ── */
        .svc-icon {
          width: 52px; height: 52px;
          border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px;
          margin-bottom: 20px;
          border: 1px solid;
          transition: transform 0.22s;
          flex-shrink: 0;
        }

        .svc-card:hover .svc-icon { transform: scale(1.1); }

        /* ── Text ── */
        .svc-name {
          font-family: 'Syne', sans-serif;
          font-size: 1.07rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 10px;
          letter-spacing: -0.02em;
          line-height: 1.25;
        }

        .svc-desc {
          font-size: 0.875rem;
          color: #6B7A8D;
          line-height: 1.72;
          margin-bottom: 16px;
          flex: 1;
        }

        /* ── Tags ── */
        .svc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }

        .svc-tag {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 4px 11px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 100px;
          color: #4a5568;
          transition: border-color 0.2s, color 0.2s;
        }

        .svc-card:hover .svc-tag {
          border-color: rgba(255,255,255,0.12);
          color: #5a6a7a;
        }

        /* ── CTA ── */
        .svc-cta {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.82rem;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: gap 0.22s, filter 0.22s;
          margin-top: auto;
        }

        .svc-cta:hover { filter: brightness(1.25); gap: 11px; }
      `}</style>

      <section id="services" className="svc-section">
        <div className="sc-container">

          {/* Header */}
          <div className="sc-reveal" style={{ marginBottom: "52px" }}>
            <div className="sc-section-label">Lo que hacemos</div>
            <h2 className="sc-section-title">
              Soluciones digitales<br />de punta a punta
            </h2>
            <p style={{ fontSize: "1rem", color: "#6B7A8D", lineHeight: 1.75, maxWidth: "520px", marginTop: "12px" }}>
              Web, apps, escritorio y automatizaciones con IA — todo bajo un mismo techo.
            </p>
          </div>

          {/* Tabs */}
          <div className="svc-tabs">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                className={`svc-tab${active === i ? " active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="svc-tab-emoji">{t.emoji}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="svc-grid" key={tab.id}>
            {tab.services.map((svc, i) => (
              <div key={svc.name} style={{ transitionDelay: `${i * 80}ms` }}>
                <ServiceCard svc={svc} color={tab.color} />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}