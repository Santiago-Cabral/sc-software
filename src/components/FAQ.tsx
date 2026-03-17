import { useState } from "react";
import useInView from "./useInView";

const FAQS = [
  { q: "¿Cuánto tarda en estar listo mi proyecto?",   a: "Una landing page puede estar en 3–5 días. Una web completa o sistema a medida tarda entre 2 y 6 semanas. Siempre te damos un cronograma claro antes de empezar, con actualizaciones semanales." },
  { q: "¿Cuánto cuesta desarrollar una web o sistema?", a: "Una landing parte desde USD $200, una web completa desde USD $600, y sistemas a medida desde USD $1.000. La primera consulta es 100% gratis — te mandamos presupuesto detallado sin compromiso." },
  { q: "¿El código es mío cuando termina el proyecto?", a: "Sí, absolutamente. Desde el día 1 el código es tuyo. Te entregamos acceso total al repositorio, al servidor y a todas las credenciales. Sin dependencias de nosotros para seguir operando." },
  { q: "¿Hacen apps mobile y sistemas de escritorio?",  a: "Sí. Desarrollamos apps Android e iOS con React Native, y sistemas de escritorio para Windows/Mac. También integramos con APIs externas, pasarelas de pago y sistemas existentes." },
  { q: "¿Qué son las automatizaciones con IA?",        a: "Son sistemas que trabajan solos usando inteligencia artificial. Por ejemplo: un bot que analiza tus leads, decide cuáles son buenos prospectos y te genera el mensaje de WhatsApp perfecto — todo sin que hagas nada." },
  { q: "¿Trabajan con clientes fuera de Tucumán?",     a: "Sí, trabajamos 100% remoto con clientes de toda Argentina y Latinoamérica. La comunicación es por WhatsApp, videollamada y email. La distancia no es ningún problema." },
  { q: "¿Qué pasa si algo falla después de entregado?", a: "Todos los proyectos incluyen un período de garantía post-entrega. Además ofrecemos planes de Soporte & Mantenimiento mensual para que tu sistema siempre esté actualizado y funcionando 24/7." },
];

/* ─── Single FAQ item ──────────────────────────────────── */
function FAQItem({ item, delay = 0 }: { item: typeof FAQS[0]; delay?: number }) {
  const [open, setOpen] = useState(false);
  const { ref, isIntersecting } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`faq-item${open ? " faq-open" : ""}`}
      style={{
        opacity:         isIntersecting ? 1 : 0,
        transform:       isIntersecting ? "translateY(0)" : "translateY(18px)",
        transition:      `opacity .55s ease ${delay}ms, transform .55s ease ${delay}ms, border-color .22s, background .22s`,
      }}
    >
      <button
        className="faq-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="faq-q">{item.q}</span>
        <span className={`faq-chevron${open ? " faq-chevron-open" : ""}`}>
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
          </svg>
        </span>
      </button>

      <div
        className="faq-body"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="faq-body-inner">
          <p className="faq-answer">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── FAQ Section ──────────────────────────────────────── */
export default function FAQ() {
  return (
    <>
      <style>{`
        /* ── Section ── */
        .faq-section {
          padding: 112px 24px;
          background: #080C10;
        }

        @media (max-width: 640px) { .faq-section { padding: 72px 16px; } }

        /* ── Item ── */
        .faq-item {
          background: #111827;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          margin-bottom: 10px;
          overflow: hidden;
        }

        .faq-item.faq-open {
          border-color: rgba(0,229,255,0.28);
          background: linear-gradient(135deg, #0d1e2a 0%, #111827 100%);
          box-shadow: 0 0 32px rgba(0,229,255,0.05);
        }

        /* ── Trigger ── */
        .faq-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 22px 26px;
          text-align: left;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .faq-q {
          font-family: 'Syne', sans-serif;
          font-size: 0.97rem;
          font-weight: 600;
          color: #C8D4E0;
          line-height: 1.4;
          transition: color 0.22s;
        }

        .faq-open .faq-q { color: #00E5FF; }

        .faq-chevron {
          width: 30px; height: 30px; flex-shrink: 0;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
          display: flex; align-items: center; justify-content: center;
          color: #4a5568;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1),
                      background 0.22s, border-color 0.22s, color 0.22s;
        }

        .faq-chevron-open {
          transform: rotate(180deg);
          background: rgba(0,229,255,0.1);
          border-color: rgba(0,229,255,0.3);
          color: #00E5FF;
        }

        /* ── Body (CSS grid accordion) ── */
        .faq-body {
          display: grid;
          transition: grid-template-rows 0.38s cubic-bezier(0.22,1,0.36,1);
        }

        .faq-body-inner { overflow: hidden; }

        .faq-answer {
          padding: 0 26px 22px;
          font-size: 0.9rem;
          color: #6B7A8D;
          line-height: 1.82;
        }

        /* ── Bottom CTA ── */
        .faq-cta {
          margin-top: 48px;
          padding: 48px 36px;
          text-align: center;
          background: linear-gradient(135deg, rgba(0,229,255,0.05) 0%, rgba(123,97,255,0.05) 100%);
          border: 1px solid rgba(0,229,255,0.14);
          border-radius: 20px;
          position: relative;
          overflow: hidden;
        }

        .faq-cta::before {
          content: '';
          position: absolute; top: 0; left: 15%; right: 15%; height: 1px;
          background: linear-gradient(90deg, transparent, #00E5FF, transparent);
        }

        .faq-cta-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.15rem; font-weight: 800;
          color: #E8EDF2; margin-bottom: 8px;
        }

        .faq-cta-sub {
          font-size: 0.9rem; color: #6B7A8D;
          margin-bottom: 28px; line-height: 1.7;
        }

        .faq-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #00E5FF;
          color: #080C10;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; font-weight: 700;
          padding: 13px 28px;
          border-radius: 12px;
          text-decoration: none;
          transition: box-shadow 0.22s, transform 0.22s;
          position: relative; overflow: hidden;
        }

        .faq-cta-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%);
          opacity: 0; transition: opacity 0.2s;
        }

        .faq-cta-btn:hover {
          box-shadow: 0 0 36px rgba(0,229,255,0.42), 0 8px 20px rgba(0,0,0,0.25);
          transform: translateY(-2px);
        }

        .faq-cta-btn:hover::before { opacity: 1; }
      `}</style>

      <section id="faq" className="faq-section">
        <div className="sc-container">

          {/* Header */}
          <div className="sc-reveal" style={{ textAlign: "center", marginBottom: "52px" }}>
            <div className="sc-section-label" style={{ justifyContent: "center" }}>
              Preguntas frecuentes
            </div>
            <h2 className="sc-section-title">Todo lo que necesitás saber</h2>
            <p style={{ fontSize: "1rem", color: "#6B7A8D", lineHeight: 1.75, maxWidth: "420px", margin: "12px auto 0" }}>
              Respondemos las dudas más comunes antes de que las tengas.
            </p>
          </div>

          {/* Items */}
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            {FAQS.map((item, i) => (
              <FAQItem key={i} item={item} delay={i * 55} />
            ))}

            {/* Bottom CTA */}
            <div className="faq-cta sc-reveal">
              <p className="faq-cta-title">¿Tenés otra pregunta?</p>
              <p className="faq-cta-sub">Escribinos directamente, respondemos en menos de 24hs.</p>
              <a
                href="https://wa.me/5493815502176?text=Hola!%20Tengo%20una%20consulta%20sobre%20sus%20servicios."
                target="_blank"
                rel="noopener noreferrer"
                className="faq-cta-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}