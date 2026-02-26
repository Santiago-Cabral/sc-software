import useInView from "./useInView";

const plans = [
  {
    id: "basic",
    title: "Plan Básico",
    desc: "Ideal para proyectos pequeños que necesitan estabilidad.",
    items: [
      "Actualizaciones esenciales",
      "Corrección de errores menores",
      "Backups mensuales",
      "Tiempo de respuesta: 48h",
    ],
    color: "#00E5FF",
    waKey: "Plan Básico",
  },
  {
    id: "pro",
    title: "Plan Profesional",
    desc: "Perfecto para webs, apps o sistemas activos con tráfico constante.",
    items: [
      "Monitoreo y optimización regular",
      "Backups semanales",
      "Actualizaciones de seguridad",
      "Soporte prioritario en 24h",
    ],
    color: "#7B61FF",
    highlight: true,
    badge: "⭐ Más elegido",
    waKey: "Plan Profesional",
  },
  {
    id: "enterprise",
    title: "Plan Full Enterprise",
    desc: "Para operaciones críticas donde el tiempo es dinero.",
    items: [
      "Monitoreo 24/7",
      "Backups diarios",
      "Optimización avanzada",
      "Atención inmediata",
      "Actualización continua del proyecto",
    ],
    color: "#FFA500",
    waKey: "Plan Full Enterprise",
  },
];

function PlanCard({ plan, delay = 0 }: { plan: typeof plans[0]; delay?: number }) {
  const { ref, isIntersecting } = useInView<HTMLDivElement>();

  const sendWhats = () => {
    const msg = `Hola! Estoy interesado en el *${plan.waKey}* de soporte y mantenimiento. ¿Podemos hablar sobre precios y frecuencia?`;
    window.open(`https://wa.me/5493815502176?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <article
      ref={ref}
      className={`sc-sup-card ${plan.highlight ? "sc-sup-highlight" : ""} ${isIntersecting ? "visible" : ""}`}
      style={{
        transitionDelay: `${delay}ms`,
        "--sup-color": plan.color,
      } as React.CSSProperties}
    >
      {plan.badge && <div className="sc-sup-badge">{plan.badge}</div>}

      <div className="sc-sup-icon-wrap">
        <span className="sc-sup-icon">
          {plan.id === "basic" ? "🔧" : plan.id === "pro" ? "⚡" : "🛡️"}
        </span>
      </div>

      <h3 className="sc-sup-title">{plan.title}</h3>
      <p className="sc-sup-desc">{plan.desc}</p>

      <ul className="sc-sup-list">
        {plan.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <button className="sc-sup-btn" onClick={sendWhats}>
        Solicitar Info →
      </button>

      <a className="sc-sup-back" href="/">← Volver al inicio</a>
    </article>
  );
}

export default function SupportMaintenance() {
  return (
    <>
      <style>{`
        .sc-sup-section {
          min-height: 100vh;
          padding: 120px 0 100px;
          background: var(--bg);
          position: relative;
          overflow: hidden;
        }
        /* Grid bg */
        .sc-sup-section::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent 80%);
          pointer-events: none;
        }
        /* Orb */
        .sc-sup-section::after {
          content: '';
          position: absolute;
          width: 500px; height: 500px; border-radius: 50%;
          top: -200px; right: -150px;
          background: radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
        }

        .sc-sup-header {
          text-align: center; margin-bottom: 64px;
          position: relative; z-index: 2;
        }
        .sc-sup-lead {
          color: var(--muted); font-size: 1.05rem;
          max-width: 580px; margin: 0 auto;
          line-height: 1.75;
        }

        .sc-sup-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
          gap: 20px;
          position: relative; z-index: 2;
        }

        .sc-sup-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 36px 30px;
          position: relative;
          display: flex; flex-direction: column;
          opacity: 0; transform: translateY(32px);
          transition: opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, box-shadow 0.3s;
        }
        .sc-sup-card.visible {
          opacity: 1; transform: translateY(0);
        }
        .sc-sup-card:hover {
          border-color: var(--sup-color);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
        }
        .sc-sup-highlight {
          border-color: rgba(123,97,255,0.4) !important;
          background: linear-gradient(145deg, #110D22 0%, #0E1318 100%);
          box-shadow: 0 0 60px rgba(123,97,255,0.07);
        }
        .sc-sup-highlight:hover {
          border-color: rgba(123,97,255,0.7) !important;
        }

        .sc-sup-badge {
          position: absolute; top: -13px; left: 50%; transform: translateX(-50%);
          background: var(--sup-color); color: #080C10;
          padding: 5px 16px; border-radius: 100px;
          font-size: 0.72rem; font-weight: 800;
          letter-spacing: 0.05em; white-space: nowrap;
        }

        .sc-sup-icon-wrap {
          width: 54px; height: 54px;
          border-radius: 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--sup-color);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 20px;
          transition: transform 0.2s;
        }
        .sc-sup-card:hover .sc-sup-icon-wrap { transform: scale(1.08); }

        .sc-sup-title {
          font-family: var(--font-display);
          font-size: 1.15rem; font-weight: 700;
          color: var(--sup-color);
          margin-bottom: 8px;
        }
        .sc-sup-desc {
          color: var(--muted); font-size: 0.875rem;
          line-height: 1.65; margin-bottom: 18px;
        }
        .sc-sup-list {
          list-style: none; flex: 1;
          display: flex; flex-direction: column; gap: 8px;
          margin-bottom: 24px;
        }
        .sc-sup-list li {
          font-size: 0.85rem; color: #5A6A7A;
          padding-left: 18px; position: relative;
          line-height: 1.4;
        }
        .sc-sup-list li::before {
          content: '✔'; position: absolute; left: 0;
          color: var(--sup-color); font-size: 0.7rem;
          top: 2px;
        }
        .sc-sup-btn {
          width: 100%; padding: 12px;
          background: var(--sup-color);
          color: #080C10;
          font-family: var(--font-body);
          font-size: 0.9rem; font-weight: 700;
          border: none; border-radius: 10px;
          cursor: pointer; transition: all 0.2s;
          margin-bottom: 12px;
        }
        .sc-sup-btn:hover {
          filter: brightness(1.12);
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
        .sc-sup-back {
          text-align: center; display: block;
          font-size: 0.8rem; color: var(--muted);
          text-decoration: none; transition: color 0.2s;
        }
        .sc-sup-back:hover { color: var(--accent); }

        .sc-sup-cta {
          margin-top: 56px;
          background: linear-gradient(135deg, #0D1E2A 0%, #0F1220 100%);
          border: 1px solid rgba(0,229,255,0.15);
          border-radius: 20px;
          padding: 56px 40px;
          text-align: center;
          position: relative; overflow: hidden;
          z-index: 2;
        }
        .sc-sup-cta::before {
          content: '';
          position: absolute; top: -1px; left: 20%; right: 20%; height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
        }
        .sc-sup-cta-title {
          font-family: var(--font-display);
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 800; color: var(--white);
          letter-spacing: -0.02em; margin-bottom: 12px;
        }
        .sc-sup-cta-sub {
          color: var(--muted); font-size: 1rem;
          max-width: 420px; margin: 0 auto 28px;
          line-height: 1.7;
        }
        .sc-sup-cta-actions {
          display: flex; justify-content: center;
          flex-wrap: wrap; gap: 12px;
        }
        .sc-sup-cta-note {
          margin-top: 16px; font-size: 0.78rem; color: var(--muted);
        }
      `}</style>

      <main className="sc-sup-section">
        <div className="sc-container">
          <header className="sc-sup-header">
            <div className="sc-section-label">Soporte continuo</div>
            <h1 className="sc-section-title">Soporte &amp; Mantenimiento</h1>
            <p className="sc-sup-lead">
              Mantenemos tu web, app o sistema 100% operativo con actualizaciones, mejoras, monitoreo y asistencia técnica directa. Evitá caídas, errores y pérdida de clientes.
            </p>
          </header>

          <div className="sc-sup-grid">
            {plans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} delay={i * 100} />
            ))}
          </div>

          {/* CTA final */}
          <div className="sc-sup-cta sc-reveal">
            <h2 className="sc-sup-cta-title">¿No sabés qué plan elegir?</h2>
            <p className="sc-sup-cta-sub">
              Contanos tu proyecto y te recomendamos el plan ideal. Sin compromiso.
            </p>
            <div className="sc-sup-cta-actions">
              <a
                href="https://wa.me/5493815502176?text=Hola%21%20Quiero%20consultar%20sobre%20los%20planes%20de%20Soporte%20%26%20Mantenimiento."
                target="_blank"
                rel="noopener noreferrer"
                className="sc-btn-primary"
              >
                Consultar por WhatsApp
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
              <a href="/" className="sc-btn-ghost">← Volver al inicio</a>
            </div>
            <p className="sc-sup-cta-note">✓ Primera consulta gratis &nbsp;·&nbsp; ✓ Sin compromiso</p>
          </div>
        </div>
      </main>
    </>
  );
}