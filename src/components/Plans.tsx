import "./plans.css";

interface Plan {
  id: string;
  title: string;
  features: string[];
  price: string;
  highlight?: boolean;
}

export default function Plans() {
  const plans: Plan[] = [
    {
      id: "basic",
      title: "Plan Emprendedor",
      features: ["Landing moderna", "Botón de contacto", "100% Responsive"],
      price: "Desde USD $200",
    },
    {
      id: "business",
      title: "Plan Negocio",
      features: ["Web completa", "Panel simple", "SEO básico"],
      price: "Desde USD $600",
      highlight: true,
    },
    {
      id: "pro",
      title: "Plan Pro",
      features: ["Web + Sistema", "Automatizaciones", "Soporte mensual"],
      price: "Desde USD $1000",
    },
  ];

  const sendWhatsapp = (plan: Plan) => {
    // Generar mensaje con información del plan
    const message = `Hola! Estoy interesado en el siguiente plan:\n\n` +
      `*${plan.title}*\n` +
      `Precio: ${plan.price}\n` +
      `Características:\n- ${plan.features.join("\n- ")}\n\n` +
      `Por favor contáctame.`;

    // Número de WhatsApp (sin + ni espacios, solo código país + número)
    const phone = "5493815502176"; // Argentina +54 381 5502176

    // Abrir WhatsApp en nueva pestaña
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="plans" className="plans-section">
      <div className="container">
        <header className="plans-header">
          <h2>Planes</h2>
          <p className="subtitle">Soluciones para cada etapa de tu proyecto.</p>
        </header>

        <div className="plans-grid">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`plan-card ${plan.highlight ? "highlight" : ""}`}
            >
              {plan.highlight && <div className="badge">⭐ Más elegido</div>}

              <h3>{plan.title}</h3>

              <ul className="features">
                {plan.features.map((f, i) => (
                  <li key={i}>✔ {f}</li>
                ))}
              </ul>

              <p className="price">{plan.price}</p>

              <button className="btn-plan" onClick={() => sendWhatsapp(plan)}>
                Cotizar por WhatsApp
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
