import { useState, useEffect } from "react";

interface StepDetail {
  title: string;
  time: string;
  desc: string;
  status: "pending" | "active" | "done" | "error" | "success";
}

export default function AutomationSimulator() {
  const [mode, setMode] = useState<"manual" | "auto">("auto");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSubStep, setCurrentSubStep] = useState<number>(0);

  const manualSteps: StepDetail[] = [
    { title: "Cliente manda consulta", time: "09:00 AM", desc: "El cliente llena un formulario web buscando información urgente.", status: "pending" },
    { title: "Consulta en bandeja", time: "11:30 AM", desc: "El email queda sepultado entre spam y otros correos. Pasan las horas.", status: "pending" },
    { title: "Carga manual de datos", time: "04:15 PM", desc: "El vendedor copia y pega los datos a un Excel. Pifia una letra del teléfono.", status: "pending" },
    { title: "Contacto tardío", time: "06:30 PM", desc: "El vendedor llama al cliente. Éste ya compró en la competencia por la demora.", status: "pending" },
  ];

  const autoSteps: StepDetail[] = [
    { title: "Cliente manda consulta", time: "09:00:00 AM", desc: "El cliente llena tu formulario buscando información urgente.", status: "pending" },
    { title: "IA capta y analiza el lead", time: "09:00:02 AM", desc: "En 2 segundos, nuestra IA clasifica el interés y extrae los datos clave.", status: "pending" },
    { title: "WhatsApp instantáneo", time: "09:00:05 AM", desc: "Se le envía al cliente un WhatsApp personalizado con su cotización inicial.", status: "pending" },
    { title: "CRM y Alertas listas", time: "09:00:10 AM", desc: "El CRM se actualiza solo y el vendedor recibe una notificación push.", status: "pending" },
  ];

  const [steps, setSteps] = useState<StepDetail[]>(autoSteps);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentSubStep(0);
    setSteps(mode === "auto" ? autoSteps : manualSteps);
  }, [mode]);

  useEffect(() => {
    if (!isPlaying) return;

    const baseSteps = mode === "auto" ? autoSteps : manualSteps;
    
    if (currentSubStep < baseSteps.length) {
      const timer = setTimeout(() => {
        setSteps((prev) =>
          prev.map((step, idx) => {
            if (idx < currentSubStep) return { ...step, status: idx === baseSteps.length - 1 && mode === "manual" ? "error" : idx === baseSteps.length - 1 && mode === "auto" ? "success" : "done" };
            if (idx === currentSubStep) return { ...step, status: "active" };
            return { ...step, status: "pending" };
          })
        );
        setCurrentSubStep((prev) => prev + 1);
      }, 1600);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        setSteps((prev) =>
          prev.map((step, idx) => ({
            ...step,
            status: idx === baseSteps.length - 1 
              ? (mode === "auto" ? "success" : "error") 
              : "done",
          }))
        );
        setIsPlaying(false);
      }, 1200);
      return () => clearTimeout(finalTimer);
    }
  }, [isPlaying, currentSubStep, mode]);

  const handleStartSimulation = () => {
    setCurrentSubStep(0);
    setSteps(
      (mode === "auto" ? autoSteps : manualSteps).map((s) => ({ ...s, status: "pending" }))
    );
    setIsPlaying(true);
  };

  return (
    <>
      <style>{`
        .sc-sim-section {
          padding: 100px 0;
          background: var(--surface);
          position: relative;
          overflow: hidden;
        }
        .sc-sim-section::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--border) 30%, var(--border) 70%, transparent);
        }
        .sc-sim-header {
          text-align: center; margin-bottom: 50px;
        }
        .sc-sim-controls {
          display: flex; justify-content: center; margin-bottom: 48px;
        }
        .sc-sim-toggle-wrap {
          background: var(--bg);
          padding: 6px; border-radius: 14px;
          border: 1px solid var(--border);
          display: inline-flex; gap: 8px;
        }
        .sc-sim-toggle-btn {
          padding: 10px 20px; border-radius: 10px;
          font-family: var(--font-body); font-size: 0.85rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.05em; border: none; cursor: pointer;
          color: var(--muted); background: transparent; transition: all 0.3s;
        }
        .sc-sim-toggle-btn.manual.active {
          background: rgba(255,95,87,0.1);
          border: 1px solid rgba(255,95,87,0.25);
          color: #ff5f57;
        }
        .sc-sim-toggle-btn.auto.active {
          background: rgba(0,255,163,0.1);
          border: 1px solid rgba(0,255,163,0.25);
          color: var(--accent3);
        }
        .sc-sim-toggle-btn:hover:not(.active) {
          color: var(--white);
        }
        
        .sc-sim-grid {
          display: grid; grid-template-columns: 1fr 1.1fr; gap: 32px; align-items: stretch;
        }
        @media (max-width: 991px) {
          .sc-sim-grid { grid-template-columns: 1fr; }
        }

        /* Columna izquierda (Visualizador) */
        .sc-sim-card-visual {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 20px; padding: 36px;
          display: flex; flex-direction: column; justify-content: space-between;
          min-height: 440px; box-shadow: var(--shadow-md); position: relative;
        }
        .sc-sim-card-title {
          font-family: var(--font-display); font-size: 0.88rem; font-weight: 700;
          color: var(--white); text-transform: uppercase; letter-spacing: 0.08em;
          margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center;
        }
        .sc-sim-status-badge {
          font-size: 0.65rem; font-weight: 800; text-transform: uppercase;
          padding: 3px 10px; border-radius: 100px;
        }
        .sc-sim-status-badge.stopped { background: var(--surface); color: var(--muted); border: 1px solid var(--border); }
        .sc-sim-status-badge.running { background: rgba(255,165,0,0.1); color: #ffa500; border: 1px solid rgba(255,165,0,0.25); }

        .sc-sim-canvas-wrap {
          flex: 1; min-height: 200px; border: 1px solid var(--border);
          border-radius: 16px; background: var(--surface);
          position: relative; overflow: hidden;
          display: flex; flex-direction: column; justify-content: center;
          padding: 24px;
        }
        .sc-sim-line-bg {
          position: absolute; left: 12%; right: 12%; height: 2px;
          background: var(--border); z-index: 1;
        }
        .sc-sim-line-bg.active {
          background: linear-gradient(90deg, var(--accent) 0%, var(--accent2) 100%);
        }
        .sc-sim-nodes-row {
          display: flex; justify-content: space-between; align-items: center;
          width: 100%; z-index: 2; position: relative;
        }
        .sc-sim-node {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
        }
        .sc-sim-node-circle {
          width: 48px; height: 48px; border-radius: 12px;
          background: var(--bg); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem; shadow: var(--shadow-sm);
          transition: all 0.5s var(--transition);
        }
        .sc-sim-node-circle.active.auto {
          background: var(--accent); border-color: var(--accent); color: var(--bg);
          box-shadow: 0 0 20px var(--accent);
        }
        .sc-sim-node-circle.active.manual {
          background: rgba(255,95,87,0.1); border-color: #ff5f57; color: #ff5f57;
        }
        .sc-sim-node-circle.result.success {
          background: rgba(0,255,163,0.1); border-color: var(--accent3); color: var(--accent3);
          box-shadow: 0 0 20px rgba(0,255,163,0.2);
        }
        .sc-sim-node-circle.result.error {
          background: rgba(255,95,87,0.1); border-color: #ff5f57; color: #ff5f57;
        }
        .sc-sim-node-lbl {
          font-size: 0.65rem; font-weight: 800; color: var(--white);
          text-transform: uppercase; letter-spacing: 0.05em; text-align: center;
        }

        .sc-sim-envelope {
          position: absolute; w: 14px; h: 14px; width: 14px; height: 14px;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 8px; font-weight: 900; color: var(--white);
          transition: all 1s ease-in-out; transform: translate(-50%, -50%);
          z-index: 3; top: 50%;
        }
        .sc-sim-envelope.auto { background: var(--accent); box-shadow: 0 0 10px var(--accent); }
        .sc-sim-envelope.manual { background: #ff5f57; }

        .sc-sim-footer-controls {
          margin-top: 32px; border-top: 1px solid var(--border);
          padding-top: 24px; display: flex; align-items: center; gap: 20px;
        }
        @media (max-width: 576px) {
          .sc-sim-footer-controls { flex-direction: column; align-items: stretch; text-align: center; }
        }
        .sc-sim-play-btn {
          padding: 14px 28px; border-radius: 12px; border: none;
          font-family: var(--font-body); font-size: 0.78rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.08em; cursor: pointer;
          transition: all 0.3s var(--transition); shrink-0: 0;
        }
        .sc-sim-play-btn.auto {
          background: var(--accent3); color: var(--bg);
        }
        .sc-sim-play-btn.auto:hover:not(:disabled) {
          box-shadow: 0 0 24px rgba(0,255,163,0.3); transform: translateY(-2px);
        }
        .sc-sim-play-btn.manual {
          background: #ff5f57; color: var(--white);
        }
        .sc-sim-play-btn.manual:hover:not(:disabled) {
          box-shadow: 0 0 24px rgba(255,95,87,0.3); transform: translateY(-2px);
        }
        .sc-sim-play-btn:disabled {
          background: rgba(255,255,255,0.05); color: var(--muted);
          border: 1px solid var(--border); cursor: not-allowed;
        }
        .sc-sim-play-desc { font-size: 0.75rem; color: var(--muted); line-height: 1.6; }

        /* Columna derecha (Línea de tiempo) */
        .sc-sim-card-timeline {
          background: var(--bg); border: 1px solid var(--border);
          border-radius: 20px; padding: 36px;
          display: flex; flex-direction: column; justify-content: space-between;
          box-shadow: var(--shadow-md);
        }
        .sc-sim-timeline-stack {
          display: flex; flex-direction: column; gap: 16px; position: relative;
        }
        .sc-sim-timeline-line {
          position: absolute; left: 24px; top: 12px; bottom: 12px;
          width: 2px; background: var(--border); z-index: 1;
        }
        .sc-sim-timeline-item {
          display: flex; items-start: center; gap: 16px; position: relative;
          z-index: 2; padding: 12px; border-radius: 12px; border: 1px solid transparent;
          transition: all 0.5s var(--transition);
        }
        .sc-sim-timeline-item.active {
          background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.05);
        }
        .sc-sim-timeline-bullet {
          width: 24px; height: 24px; border-radius: 50%;
          border: 1px solid var(--border); background: var(--bg);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem; font-weight: 800; shrink-0: 0; flex-shrink: 0;
          transition: all 0.5s; color: var(--muted);
        }
        .sc-sim-timeline-item.active .sc-sim-timeline-bullet {
          background: rgba(0,229,255,0.1); border-color: var(--accent); color: var(--accent);
          box-shadow: 0 0 12px rgba(0,229,255,0.25);
        }
        .sc-sim-timeline-item.done .sc-sim-timeline-bullet {
          background: rgba(0,255,163,0.05); border-color: var(--border); color: var(--accent3);
        }
        .sc-sim-timeline-item.success .sc-sim-timeline-bullet {
          background: rgba(0,255,163,0.1); border-color: var(--accent3); color: var(--accent3);
          box-shadow: 0 0 12px rgba(0,255,163,0.25);
        }
        .sc-sim-timeline-item.error .sc-sim-timeline-bullet {
          background: rgba(255,95,87,0.1); border-color: #ff5f57; color: #ff5f57;
        }

        .sc-sim-item-content { flex-1: 1; }
        .sc-sim-item-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 4px; }
        .sc-sim-item-title { font-size: 0.88rem; font-weight: 700; color: var(--muted); transition: color 0.5s; }
        .sc-sim-timeline-item.active .sc-sim-item-title { color: var(--white); }
        .sc-sim-timeline-item.done .sc-sim-item-title { color: var(--text); }
        
        .sc-sim-item-time { font-family: var(--font-display); font-size: 0.65rem; font-weight: 700; color: var(--muted2); }
        .sc-sim-timeline-item.active .sc-sim-item-time { color: var(--accent); }
        .sc-sim-timeline-item.success .sc-sim-item-time { color: var(--accent3); }
        .sc-sim-timeline-item.error .sc-sim-item-time { color: #ff5f57; }

        .sc-sim-item-desc { font-size: 0.75rem; color: var(--muted); line-height: 1.6; }

        .sc-sim-conclusion {
          margin-top: 32px; padding: 16px; border-radius: 12px;
          border: 1px solid var(--border); text-align: center;
          font-size: 0.75rem; font-weight: 700; transition: all 0.5s;
        }
        .sc-sim-conclusion.active-success {
          background: rgba(0,255,163,0.02); border-color: rgba(0,255,163,0.15); color: var(--accent3);
        }
        .sc-sim-conclusion.active-error {
          background: rgba(255,95,87,0.02); border-color: rgba(255,95,87,0.15); color: #ff5f57;
        }
        .sc-sim-conclusion.idle {
          background: var(--surface); border-color: var(--border); color: var(--muted);
        }
      `}</style>

      <section id="simulador" className="sc-sim-section">
        <div className="sc-container">
          
          {/* Header */}
          <div className="sc-sim-header sc-reveal">
            <div className="sc-section-label" style={{ justifyContent: "center" }}>Simulación en Acción</div>
            <h2 className="sc-section-title">¿Cómo trabaja tu negocio hoy?</h2>
            <p className="sc-section-sub" style={{ margin: "0 auto" }}>
              Compará el impacto de procesar consultas a mano frente a tener un sistema inteligente de IA trabajando 24/7.
            </p>
          </div>

          {/* Toggle buttons */}
          <div className="sc-sim-controls sc-reveal">
            <div className="sc-sim-toggle-wrap">
              <button
                onClick={() => setMode("manual")}
                className={`sc-sim-toggle-btn manual ${mode === "manual" ? "active" : ""}`}
              >
                🔴 Proceso Manual (Lento)
              </button>
              <button
                onClick={() => setMode("auto")}
                className={`sc-sim-toggle-btn auto ${mode === "auto" ? "active" : ""}`}
              >
                🟢 Con SC Software (IA 24/7)
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="sc-sim-grid">
            
            {/* Visualizer (Izquierda) */}
            <div className="sc-sim-card-visual sc-reveal">
              <div className="sc-sim-card-title">
                <span>Visualizador de Flujo</span>
                <span className={`sc-sim-status-badge ${isPlaying ? "running" : "stopped"}`}>
                  {isPlaying ? "Simulando..." : "Detenido"}
                </span>
              </div>

              <div className="sc-sim-canvas-wrap">
                <div className={`sc-sim-line-bg ${isPlaying ? "active" : ""}`} />

                <div className="sc-sim-nodes-row">
                  {/* Nodo 1: Cliente */}
                  <div className="sc-sim-node">
                    <div className="sc-sim-node-circle active auto" style={{ position: "relative" }}>
                      👤
                      <div className="absolute inset-0 rounded-xl border border-[var(--accent)] animate-ping opacity-20" style={{ pointerEvents: "none" }} />
                    </div>
                    <span className="sc-sim-node-lbl">Cliente</span>
                  </div>

                  {/* Nodo 2: Servidor / Vendedor */}
                  <div className="sc-sim-node">
                    <div className={`sc-sim-node-circle ${
                      isPlaying && currentSubStep >= 2 ? `active ${mode}` : ""
                    }`}>
                      {mode === "auto" ? "⚡" : "📂"}
                    </div>
                    <span className="sc-sim-node-lbl">
                      {mode === "auto" ? "SC Engine (IA)" : "Bandeja"}
                    </span>
                  </div>

                  {/* Nodo 3: Destino */}
                  <div className="sc-sim-node">
                    <div className={`sc-sim-node-circle result ${
                      isPlaying && currentSubStep === 4 ? (mode === "auto" ? "success" : "error") : ""
                    }`}>
                      {isPlaying && currentSubStep === 4 ? (mode === "auto" ? "💵" : "✕") : "⏳"}
                    </div>
                    <span className="sc-sim-node-lbl">
                      {isPlaying && currentSubStep === 4 ? (mode === "auto" ? "¡Venta!" : "Perdido") : "Resultado"}
                    </span>
                  </div>
                </div>

                {/* Mensaje viajando */}
                {isPlaying && currentSubStep > 0 && currentSubStep < 4 && (
                  <div
                    className={`sc-sim-envelope ${mode}`}
                    style={{
                      left: currentSubStep === 1 ? "18%" : currentSubStep === 2 ? "50%" : "82%",
                    }}
                  >
                    ✉
                  </div>
                )}
              </div>

              <div className="sc-sim-footer-controls">
                <button
                  disabled={isPlaying}
                  onClick={handleStartSimulation}
                  className={`sc-sim-play-btn ${mode}`}
                >
                  {isPlaying ? "Corriendo..." : "▶ Iniciar Simulación"}
                </button>
                <div className="sc-sim-play-desc">
                  {mode === "auto" 
                    ? "Vas a ver cómo las respuestas automáticas e inmediatas aseguran la atención del cliente caliente." 
                    : "Vas a ver el embotellamiento del trabajo manual y cómo se enfría el lead hasta perderse."
                  }
                </div>
              </div>
            </div>

            {/* Timeline (Derecha) */}
            <div className="sc-sim-card-timeline sc-reveal sc-reveal-d1">
              <div>
                <h3 className="sc-sim-card-title" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px", marginBottom: "20px" }}>
                  Cronograma Paso a Paso
                </h3>

                <div className="sc-sim-timeline-stack">
                  <div className="sc-sim-timeline-line" />

                  {steps.map((step, idx) => {
                    const isActive = step.status === "active";
                    const isDone = step.status === "done";
                    const isSuccess = step.status === "success";
                    const isError = step.status === "error";

                    return (
                      <div
                        key={idx}
                        className={`sc-sim-timeline-item ${isActive ? "active" : ""} ${isDone ? "done" : ""} ${isSuccess ? "success" : ""} ${isError ? "error" : ""}`}
                      >
                        <div className="sc-sim-timeline-bullet">
                          {isDone ? "✓" : isSuccess ? "✔" : isError ? "✕" : idx + 1}
                        </div>

                        <div className="sc-sim-item-content">
                          <div className="sc-sim-item-header">
                            <h4 className="sc-sim-item-title" style={{ margin: 0 }}>{step.title}</h4>
                            <span className="sc-sim-item-time">{step.time}</span>
                          </div>
                          <p className="sc-sim-item-desc" style={{ margin: 0 }}>{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Conclusión */}
              <div className={`sc-sim-conclusion ${
                !isPlaying && currentSubStep === 4 
                  ? (mode === "auto" ? "active-success" : "active-error") 
                  : "idle"
              }`}>
                {!isPlaying && currentSubStep === 4
                  ? (mode === "auto"
                      ? "✨ ¡VENTA CERRADA! Automatizar tus leads con IA incrementa un 350% el cierre de clientes."
                      : "❌ OPORTUNIDAD PERDIDA. El 78% de los compradores elige a la empresa que le responde primero.")
                  : "Hacé clic en \"Iniciar Simulación\" para ver el recorrido de tu cliente."
                }
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
