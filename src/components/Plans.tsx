interface Plan {
  id: string;
  title: string;
  features: string[];
  price: string;
  highlight?: boolean;
  badge?: string;
}

const plans: Plan[] = [
  {
    id: "basic",
    title: "Plan Emprendedor",
    features: [
      "Landing page moderna",
      "Botón de contacto directo",
      "100% Responsive",
      "SEO básico",
    ],
    price: "Desde USD $200",
  },
  {
    id: "business",
    title: "Plan Negocio",
    features: [
      "Web completa multipágina",
      "Panel de administración",
      "SEO optimizado",
      "Integración WhatsApp",
      "Soporte 30 días",
    ],
    price: "Desde USD $600",
    highlight: true,
    badge: "⭐ Más elegido",
  },
  {
    id: "pro",
    title: "Plan Pro",
    features: [
      "Web + Sistema a medida",
      "Automatizaciones",
      "Roles y permisos",
      "Reportes y métricas",
      "Soporte mensual incluido",
    ],
    price: "Desde USD $1.000",
  },
];

export default function Plans() {
  const sendWhatsapp = (plan: Plan) => {
    const msg =
      `Hola! Estoy interesado en el *${plan.title}*.\n` +
      `Precio referencia: ${plan.price}\n` +
      `Características:\n- ${plan.features.join("\n- ")}\n\n` +
      `¿Me podés dar más información?`;
    window.open(`https://wa.me/5493815502176?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <>
      <style>{`
        .sc-plans {
          padding: 100px 0;
          background: var(--surface);
          position: relative;
        }
        .sc-plans::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--border) 30%, var(--border) 70%, transparent);
        }
        .sc-plans-header {
          text-align: center; margin-bottom: 60px;
        }
        .sc-plans-sub {
          color: var(--muted); font-size: 1rem; margin-top: 8px;
        }
        .sc-plans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
          gap: 20px;
          align-items: start;
        }
        .sc-plan-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 36px 32px;
          position: relative;
          transition: all 0.3s;
        }
        .sc-plan-card:hover {
          border-color: rgba(255,255,255,0.14);
          transform: translateY(-4px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.3);
        }
        .sc-plan-card.highlight {
          border-color: rgba(0,229,255,0.35);
          background: linear-gradient(145deg, #0D1E2A 0%, #0E1318 100%);
          box-shadow: 0 0 60px rgba(0,229,255,0.08);
        }
        .sc-plan-card.highlight:hover {
          border-color: rgba(0,229,255,0.6);
          box-shadow: 0 24px 60px rgba(0,229,255,0.12);
        }
        .sc-plan-badge {
          position: absolute; top: -13px; left: 50%; transform: translateX(-50%);
          background: #00E5FF; color: #080C10;
          padding: 5px 16px; border-radius: 100px;
          font-size: 0.72rem; font-weight: 800;
          letter-spacing: 0.05em; white-space: nowrap;
        }
        .sc-plan-title {
          font-family: var(--font-display);
          font-size: 1.2rem; font-weight: 700;
          color: var(--white); margin-bottom: 20px;
        }
        .highlight .sc-plan-title { color: #00E5FF; }
        .sc-plan-features {
          list-style: none; margin-bottom: 28px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .sc-plan-features li {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 0.9rem; color: var(--muted);
          line-height: 1.4;
        }
        .sc-plan-features li::before {
          content: '✔';
          color: #00E5FF; font-size: 0.75rem;
          margin-top: 2px; flex-shrink: 0;
        }
        .sc-plan-price {
          font-family: var(--font-display);
          font-size: 1.5rem; font-weight: 800;
          color: var(--white); margin-bottom: 20px;
          letter-spacing: -0.02em;
        }
        .sc-plan-btn {
          display: block; width: 100%;
          padding: 13px;
          text-align: center;
          font-family: var(--font-body);
          font-size: 0.9rem; font-weight: 700;
          border-radius: 10px; border: none; cursor: pointer;
          transition: all 0.2s;
          background: rgba(255,255,255,0.07);
          color: var(--text);
        }
        .sc-plan-btn:hover {
          background: rgba(255,255,255,0.12);
          transform: translateY(-1px);
        }
        .highlight .sc-plan-btn {
          background: #00E5FF;
          color: #080C10;
        }
        .highlight .sc-plan-btn:hover {
          box-shadow: 0 0 28px rgba(0,229,255,0.45);
          transform: translateY(-2px);
        }
        .sc-plans-note {
          text-align: center; margin-top: 40px;
          font-size: 0.85rem; color: var(--muted);
        }
      `}</style>

      <section id="plans" className="sc-plans">
        <div className="sc-container">
          <div className="sc-plans-header sc-reveal">
            <div className="sc-section-label">Inversión</div>
            <h2 className="sc-section-title">Planes para cada etapa</h2>
            <p className="sc-plans-sub">Soluciones para emprendedores, empresas y proyectos ambiciosos.</p>
          </div>

          <div className="sc-plans-grid sc-reveal">
            {plans.map((plan) => (
              <article
                key={plan.id}
                className={`sc-plan-card ${plan.highlight ? "highlight" : ""}`}
              >
                {plan.badge && <div className="sc-plan-badge">{plan.badge}</div>}
                <h3 className="sc-plan-title">{plan.title}</h3>
                <ul className="sc-plan-features">
                  {plan.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <div className="sc-plan-price">{plan.price}</div>
                <button className="sc-plan-btn" onClick={() => sendWhatsapp(plan)}>
                  Cotizar por WhatsApp
                </button>
              </article>
            ))}
          </div>

          <p className="sc-plans-note">
            ✓ Primera consulta gratis &nbsp;·&nbsp; ✓ Presupuesto sin compromiso &nbsp;·&nbsp; ✓ El código es tuyo desde el día 1
          </p>
        </div>
      </section>
    </>
  );
}