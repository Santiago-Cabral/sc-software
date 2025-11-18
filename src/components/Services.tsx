// src/components/Services.tsx
import "./services.css";
import useInView from "./useInView";

type Service = {
  id: string;
  title: string;
  desc: string;
  features?: string[];
  icon: "web" | "mobile" | "system";
  components: string;
};

const SERVICES: Service[] = [
  {
    id: "web",
    title: "Páginas Web",
    desc: "Landing pages, tiendas online y sitios corporativos optimizados para convertir.",
    features: ["Responsive", "SEO básico", "Integración WhatsApp"],
    icon: "web",
    components:'/web',
  },
  {
    id: "mobile",
    title: "Apps Mobile",
    desc: "Aplicaciones Android + iOS con panel administrativo y notificaciones push.",
    features: ["React Native", "Publicación en stores", "Integración APIs"],
    icon: "mobile",
    components:'/apps',
  },
  {
    id: "system",
    title: "Sistemas a Medida",
    desc: "Gestión de ventas, stock, turnos, facturación y automatizaciones para tu negocio.",
    features: ["Reportes", "Roles y permisos", "Automatizaciones"],
    icon: "system",
    components:'/sistemas',
  },
];

function Icon({ name }: { name: Service["icon"] }) {
  if (name === "web")
    return (
      <svg className="s-icon" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2 12h20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M12 2v20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  if (name === "mobile")
    return (
      <svg className="s-icon" viewBox="0 0 24 24" aria-hidden>
        <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <circle cx="12" cy="18" r="0.8" fill="currentColor" />
      </svg>
    );
  return (
    <svg className="s-icon" viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M7 10h10M7 14h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ServiceCard({ s, delay = 0 }: { s: Service; delay?: number }) {
  const { ref, isIntersecting } = useInView<HTMLDivElement>();

  const sendWhatsapp = () => {
    const message = `Hola! Estoy interesado en el servicio:\n\n*${s.title}*\n${s.desc}\n${
      s.features ? "Características:\n- " + s.features.join("\n- ") : ""
    }\n\nPor favor contáctame.`;

    const phone = "5493815502176"; // tu número de WhatsApp
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <article
      ref={ref}
      className={`service-card ${isIntersecting ? "is-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
      aria-labelledby={`svc-${s.id}`}
    >
      <div className="icon-wrap" aria-hidden>
        <Icon name={s.icon} />
      </div>

      <div className="svc-body">
        <h3 id={`svc-${s.id}`}>{s.title}</h3>
        <p className="svc-desc">{s.desc}</p>

        {s.features && (
          <ul className="svc-features" aria-hidden>
            {s.features.map((f, i) => (
              <li key={i}>● {f}</li>
            ))}
          </ul>
        )}

        <div className="svc-actions">
          <button className="btn small" onClick={sendWhatsapp} aria-label={`Contratar ${s.title}`}>
            Cotización GRATIS
          </button>
          <a className="link-more" href={s.components} aria-label={`Más info ${s.title}`}>
                Más info →
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <header className="services-header">
          <h2>Servicios</h2>
          <p className="subtitle">Web, Apps y sistemas a medida — soluciones prácticas para tu negocio.</p>
        </header>

        <div className="services-grid" role="list">
          {SERVICES.map((s, idx) => (
            <ServiceCard s={s} key={s.id} delay={idx * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
