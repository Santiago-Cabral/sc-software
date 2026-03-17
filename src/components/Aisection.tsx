import useInView from "./useInView";

const TERM_LINES = [
  { text: "// Analizando lead: Ferretería El Clavo", cls: "text-[#4a5568]"  },
  { text: "→ Buscando datos en Google Maps...",       cls: "text-[#00E5FF]"  },
  { text: "✔ Encontrado: rating 4.2 · sin web",       cls: "text-[#00FFA3]"  },
  { text: "→ Consultando IA (Groq / LLaMA 3.3)...",   cls: "text-[#00E5FF]"  },
  { text: "★ Calificación: MUY BUENO",                cls: "text-[#a78bfa]"  },
  { text: "// Servicio recomendado:",                  cls: "text-[#4a5568]"  },
  { text: "→ Web + Sistema de ventas a medida",        cls: "text-[#00FFA3]"  },
  { text: "💬 Mensaje WhatsApp generado y listo",      cls: "text-[#E8EDF2]"  },
];

const FEATURES = [
  {
    icon: "🎯",
    color: "#00E5FF",
    bg: "rgba(0,229,255,0.08)",
    border: "rgba(0,229,255,0.2)",
    title: "Calificación automática de leads",
    desc: "La IA analiza cada prospecto, decide si vale contactarlo y qué servicio necesita.",
  },
  {
    icon: "💬",
    color: "#7B61FF",
    bg: "rgba(123,97,255,0.08)",
    border: "rgba(123,97,255,0.2)",
    title: "Respuestas personalizadas 24/7",
    desc: "Bots que entienden el contexto y derivan al humano solo cuando hace falta.",
  },
  {
    icon: "📊",
    color: "#00FFA3",
    bg: "rgba(0,255,163,0.08)",
    border: "rgba(0,255,163,0.2)",
    title: "Reportes automáticos a WhatsApp",
    desc: "Resumen diario de ventas, clientes y métricas clave directo a tu teléfono.",
  },
];

export default function AISection() {
  /* ── fix: siempre usar el genérico para evitar error TS2322 ── */
  const { ref, isIntersecting } = useInView<HTMLDivElement>();

  return (
    <>
      <style>{`
        .ai-section {
          padding: 112px 24px;
          background: #0E1318;
          position: relative;
          overflow: hidden;
        }

        /* subtle grid bg */
        .ai-section::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 10%, transparent 80%);
        }

        .ai-inner {
          max-width: 1160px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        @media (max-width: 1024px) {
          .ai-inner { grid-template-columns: 1fr; gap: 48px; }
        }

        /* ── Left ── */
        .ai-left {}

        .ai-label {
          display: inline-flex; align-items: center; gap: 10px;
          color: #7B61FF;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          margin-bottom: 16px;
        }

        .ai-label::before {
          content: '';
          display: block; width: 24px; height: 1px;
          background: linear-gradient(90deg, #7B61FF, transparent);
          flex-shrink: 0;
        }

        .ai-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.9rem, 3.5vw, 2.8rem);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.035em;
          line-height: 1.1;
          margin-bottom: 18px;
        }

        .ai-title span {
          background: linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .ai-sub {
          font-size: 1rem;
          color: #6B7A8D;
          line-height: 1.75;
          max-width: 440px;
          margin-bottom: 36px;
        }

        .ai-features { display: flex; flex-direction: column; gap: 14px; }

        .ai-feature {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 18px;
          background: #111827;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          transition: border-color 0.22s, transform 0.22s;
        }

        .ai-feature:hover { border-color: rgba(255,255,255,0.14); transform: translateX(4px); }

        .ai-feature-icon {
          width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center; font-size: 18px;
          border: 1px solid; transition: transform 0.22s;
        }

        .ai-feature:hover .ai-feature-icon { transform: scale(1.08); }

        .ai-feature-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem; font-weight: 700; color: #E8EDF2; margin-bottom: 4px;
        }

        .ai-feature-desc { font-size: 0.8rem; color: #5a6a7a; line-height: 1.6; }

        /* ── Right — terminal ── */
        .ai-right {
          transition: opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1);
        }

        .ai-right.hidden { opacity: 0; transform: translateX(40px); }
        .ai-right.visible { opacity: 1; transform: translateX(0); }

        .ai-terminal {
          background: #0d1117;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          overflow: hidden;
          font-family: 'Courier New', 'Monaco', monospace;
          box-shadow:
            0 32px 80px rgba(0,0,0,0.6),
            0 0 0 1px rgba(255,255,255,0.04),
            0 0 60px rgba(123,97,255,0.06);
        }

        .ai-terminal-bar {
          display: flex; align-items: center; gap: 7px;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.025);
        }

        .ai-dot { width: 11px; height: 11px; border-radius: 50%; }
        .ai-dot.r { background: #ff5f57; }
        .ai-dot.y { background: #febc2e; }
        .ai-dot.g { background: #28c840; }

        .ai-terminal-label {
          margin-left: 8px;
          font-size: 0.7rem; color: #4a5568;
          font-family: 'DM Sans', sans-serif;
        }

        .ai-terminal-body {
          padding: 22px 20px;
          display: flex; flex-direction: column; gap: 10px;
        }

        .ai-line {
          font-size: 0.83rem;
          line-height: 1.5;
          opacity: 0;
          animation: aiLineIn 0.35s ease both;
        }

        @keyframes aiLineIn {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* blinking cursor at end */
        .ai-cursor {
          display: inline-block;
          width: 8px; height: 14px;
          background: #00E5FF;
          border-radius: 1px;
          margin-left: 4px;
          vertical-align: middle;
          animation: aiCursorBlink 1s ease infinite;
        }

        @keyframes aiCursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* bottom status bar */
        .ai-status-bar {
          padding: 10px 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.015);
          display: flex; align-items: center; gap: 8px;
        }

        .ai-status-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #28c840;
          animation: aiStatusPulse 2s ease infinite;
        }

        @keyframes aiStatusPulse { 0%,100%{opacity:1} 50%{opacity:.3} }

        .ai-status-text { font-size: 0.68rem; color: #4a5568; font-family: 'DM Sans', sans-serif; }

        @media (max-width: 640px) {
          .ai-section { padding: 72px 16px; }
        }
      `}</style>

      <section id="ia" className="ai-section">
        <div className="ai-inner">

          {/* ── Left ── */}
          <div className="ai-left sc-reveal">
            <div className="ai-label">Inteligencia Artificial</div>
            <h2 className="ai-title">
              Tu negocio trabajando<br />
              <span>solo, 24/7</span>
            </h2>
            <p className="ai-sub">
              Integramos IA en tus procesos para que las tareas repetitivas desaparezcan
              y vos puedas enfocarte en crecer.
            </p>

            <div className="ai-features">
              {FEATURES.map((f) => (
                <div className="ai-feature" key={f.title}>
                  <div
                    className="ai-feature-icon"
                    style={{ background: f.bg, borderColor: f.border }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <div className="ai-feature-title">{f.title}</div>
                    <div className="ai-feature-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right — terminal ── */}
          <div
            ref={ref}
            className={`ai-right ${isIntersecting ? "visible" : "hidden"}`}
          >
            <div className="ai-terminal">
              {/* Bar */}
              <div className="ai-terminal-bar">
                <div className="ai-dot r" />
                <div className="ai-dot y" />
                <div className="ai-dot g" />
                <span className="ai-terminal-label">sc-ia-agent.js — node v20</span>
              </div>

              {/* Lines */}
              <div className="ai-terminal-body">
                {TERM_LINES.map((l, i) => (
                  <div
                    key={i}
                    className={`ai-line ${l.cls}`}
                    style={{ animationDelay: `${0.2 + i * 0.45}s` }}
                  >
                    {l.text}
                    {i === TERM_LINES.length - 1 && <span className="ai-cursor" />}
                  </div>
                ))}
              </div>

              {/* Status bar */}
              <div className="ai-status-bar">
                <div className="ai-status-dot" />
                <span className="ai-status-text">Proceso activo · sc-ia-agent corriendo</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}