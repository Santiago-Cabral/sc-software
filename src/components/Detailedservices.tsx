import useInView from "./useInView";

type DetailService = {
  name: string;
  desc: string;
  items: string[];
  waKey: string;
};

type Category = {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  bg: string;
  services: DetailService[];
  generalMsg: string;
};

const CATEGORIES: Category[] = [
  {
    id: "web",
    title: "Desarrollo Web",
    subtitle: "Sitios, tiendas y sistemas online de alto impacto.",
    emoji: "🌐",
    color: "#00E5FF",
    bg: "rgba(0,229,255,0.06)",
    generalMsg: "Hola! Estoy interesado en *Desarrollo Web*. Me gustaría recibir más información y presupuesto.",
    services: [
      { name: "Landing Page", desc: "Páginas de conversión rápidas y efectivas.", items: ["Diseño premium", "SEO básico", "Formulario de contacto"], waKey: "Landing Page" },
      { name: "E-commerce", desc: "Tienda online con carrito, pagos y panel admin.", items: ["Catálogo dinámico", "Pasarelas de pago", "Panel de ventas"], waKey: "E-commerce" },
      { name: "Sistema Web", desc: "App web para gestionar tu operación desde el navegador.", items: ["Roles y permisos", "Dashboard de métricas", "APIs externas"], waKey: "Sistema Web" },
      { name: "Soporte & Mantenimiento", desc: "Mantenemos tu web rápida, segura y actualizada.", items: ["Actualizaciones", "Backups", "Monitoreo"], waKey: "Soporte Web" },
    ],
  },
  {
    id: "mobile",
    title: "Apps Mobile",
    subtitle: "Aplicaciones Android + iOS conectadas a tu negocio.",
    emoji: "📱",
    color: "#7B61FF",
    bg: "rgba(123,97,255,0.06)",
    generalMsg: "Hola! Estoy interesado en *Apps Mobile*. Me gustaría recibir más información y presupuesto.",
    services: [
      { name: "App de Servicios", desc: "Reservas, turnos, pagos y notificaciones automáticas.", items: ["Panel admin", "Push Notifications", "Pasarelas de pago"], waKey: "App de Servicios" },
      { name: "App Comercial", desc: "Catálogo, ventas, estados de pedidos y seguimiento.", items: ["Carrito de compras", "Inventario", "Usuarios y permisos"], waKey: "App Comercial" },
      { name: "App GPS & Real Time", desc: "Envíos, tracking en vivo y logística tipo Uber.", items: ["Mapas en tiempo real", "Rutas automáticas", "Panel operativo"], waKey: "App con GPS y Tiempo Real" },
      { name: "Soporte & Mantenimiento", desc: "Actualización, estabilidad y seguridad para tu app.", items: ["Librerías actualizadas", "Corrección de errores", "Monitoreo 24/7"], waKey: "Soporte Mobile" },
    ],
  },
  {
    id: "desktop",
    title: "Sistemas de Escritorio",
    subtitle: "Software instalado en PC o red local — ultra rápido y estable.",
    emoji: "🖥️",
    color: "#FFA500",
    bg: "rgba(255,165,0,0.06)",
    generalMsg: "Hola! Estoy interesado en *Sistemas de Escritorio*. Me gustaría recibir más información y presupuesto.",
    services: [
      { name: "Gestión de Ventas", desc: "Sistema completo para ventas, clientes, reportes y facturación.", items: ["Historial detallado", "Métricas diarias/mensuales", "Exportación Excel/PDF"], waKey: "Sistema de Gestión de Ventas" },
      { name: "Gestión de Stock", desc: "Control de inventario en tiempo real con alertas inteligentes.", items: ["Movimientos automáticos", "Alertas de stock bajo", "Gestión de proveedores"], waKey: "Sistema de Gestión de Stock" },
      { name: "Turnos & Agenda", desc: "Ideal para clínicas, talleres, barberías y centros de servicio.", items: ["Multiusuario", "Notificaciones", "Calendario avanzado"], waKey: "Sistema de Turnos y Agenda" },
      { name: "Soporte & Mantenimiento", desc: "Mantenemos tu sistema rápido, seguro y siempre funcionando.", items: ["Optimización de BD", "Parches y mejoras", "Atención prioritaria"], waKey: "Soporte Escritorio" },
    ],
  },
];

function CategorySection({ cat }: { cat: Category }) {
  const { ref, isIntersecting } = useInView<HTMLDivElement>();

  const sendWhats = (key: string) => {
    const msg = `Hola! Estoy interesado en el servicio de *${key}*. ¿Me podés dar más información y presupuesto?`;
    window.open(`https://wa.me/5493815502176?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const sendGeneral = () => {
    window.open(`https://wa.me/5493815502176?text=${encodeURIComponent(cat.generalMsg)}`, "_blank");
  };

  return (
    <div
      className="sc-detail-category"
      style={{ "--cat-color": cat.color, "--cat-bg": cat.bg } as React.CSSProperties}
    >
      {/* Category header */}
      <div className="sc-detail-cat-header sc-reveal">
        <div className="sc-detail-cat-icon">{cat.emoji}</div>
        <div>
          <h2 className="sc-section-title" style={{ marginBottom: 6 }}>{cat.title}</h2>
          <p className="sc-detail-cat-sub">{cat.subtitle}</p>
        </div>
      </div>

      {/* Cards grid */}
      <div
        ref={ref}
        className={`sc-detail-grid ${isIntersecting ? "visible" : ""}`}
      >
        {cat.services.map((s, i) => (
          <div
            key={s.name}
            className="sc-detail-card"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <h3 className="sc-detail-card-title">{s.name}</h3>
            <p className="sc-detail-card-desc">{s.desc}</p>
            <ul className="sc-detail-card-list">
              {s.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <button className="sc-detail-btn" onClick={() => sendWhats(s.waKey)}>
              Consultar →
            </button>
          </div>
        ))}
      </div>

      {/* General CTA */}
      <div className="sc-detail-general sc-reveal">
        <button className="sc-detail-btn-general" onClick={sendGeneral}>
          Consultar todo el servicio de {cat.title} →
        </button>
      </div>
    </div>
  );
}

export default function DetailedServices() {
  return (
    <>
      <style>{`
        .sc-detailed {
          padding: 60px 0 100px;
          background: var(--bg);
          display: flex; flex-direction: column; gap: 80px;
        }
        .sc-detail-category {
          border-top: 1px solid var(--border);
          padding-top: 60px;
        }
        .sc-detail-cat-header {
          display: flex; align-items: center; gap: 20px;
          margin-bottom: 40px; flex-wrap: wrap;
        }
        .sc-detail-cat-icon {
          font-size: 2rem;
          width: 64px; height: 64px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--cat-bg);
          border: 1px solid var(--cat-color);
          border-radius: 16px;
        }
        .sc-detail-cat-sub {
          color: var(--muted); font-size: 1rem; margin-top: 4px;
        }
        .sc-detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
          opacity: 0; transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .sc-detail-grid.visible { opacity: 1; transform: translateY(0); }
        .sc-detail-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px 24px;
          transition: border-color 0.2s, transform 0.2s;
          display: flex; flex-direction: column;
        }
        .sc-detail-card:hover {
          border-color: var(--cat-color);
          transform: translateY(-5px);
        }
        .sc-detail-card-title {
          font-family: var(--font-display);
          font-size: 1.05rem; font-weight: 700;
          color: var(--cat-color); margin-bottom: 8px;
        }
        .sc-detail-card-desc {
          color: var(--muted); font-size: 0.85rem;
          line-height: 1.6; margin-bottom: 14px;
        }
        .sc-detail-card-list {
          list-style: none; margin-bottom: 20px; flex: 1;
          display: flex; flex-direction: column; gap: 6px;
        }
        .sc-detail-card-list li {
          font-size: 0.82rem; color: #5A6A7A;
          padding-left: 16px; position: relative;
        }
        .sc-detail-card-list li::before {
          content: '✔'; position: absolute; left: 0;
          color: var(--cat-color); font-size: 0.7rem;
        }
        .sc-detail-btn {
          width: 100%; padding: 10px;
          background: var(--cat-color);
          color: #080C10;
          font-family: var(--font-body);
          font-size: 0.85rem; font-weight: 700;
          border: none; border-radius: 9px;
          cursor: pointer; transition: all 0.2s;
        }
        .sc-detail-btn:hover {
          filter: brightness(1.15);
          transform: translateY(-1px);
        }
        .sc-detail-general {
          margin-top: 28px; text-align: center;
        }
        .sc-detail-btn-general {
          background: transparent;
          border: 1px solid var(--cat-color);
          color: var(--cat-color);
          font-family: var(--font-body);
          font-size: 0.9rem; font-weight: 600;
          padding: 11px 28px; border-radius: 9px;
          cursor: pointer; transition: all 0.2s;
        }
        .sc-detail-btn-general:hover {
          background: var(--cat-bg);
        }
      `}</style>

      <section className="sc-detailed">
        <div className="sc-container" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {CATEGORIES.map((cat) => (
            <CategorySection key={cat.id} cat={cat} />
          ))}
        </div>
      </section>
    </>
  );
}