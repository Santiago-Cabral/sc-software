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
    <section id="simulador" className="py-24 relative overflow-hidden" style={{ background: "var(--surface)" }}>
      {/* Top border grid effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      
      <div className="sc-container">
        
        {/* Header */}
        <div className="text-center mb-16 sc-reveal">
          <div className="sc-section-label" style={{ justifyContent: "center" }}>Simulación en Acción</div>
          <h2 className="sc-section-title">¿Cómo trabaja tu negocio hoy?</h2>
          <p style={{ color: "var(--muted)", maxWidth: "560px", margin: "0 auto", fontSize: "0.98rem", lineHeight: 1.75 }}>
            Compará el impacto de procesar consultas a mano frente a tener un sistema inteligente de IA trabajando 24/7.
          </p>
        </div>

        {/* Control de modo (Manual vs Automático) */}
        <div className="flex justify-center mb-12 sc-reveal">
          <div className="bg-[var(--bg)] p-1.5 rounded-xl border border-[var(--border)] inline-flex gap-2">
            <button
              onClick={() => setMode("manual")}
              className={`px-5 py-2.5 rounded-lg text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                mode === "manual"
                  ? "bg-[#ff5f57]/10 border border-[#ff5f57]/30 text-[#ff5f57] shadow-lg"
                  : "text-[var(--muted)] hover:text-white"
              }`}
            >
              🔴 Proceso Manual (Lento)
            </button>
            <button
              onClick={() => setMode("auto")}
              className={`px-5 py-2.5 rounded-lg text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                mode === "auto"
                  ? "bg-[rgba(0,255,163,0.1)] border border-[rgba(0,255,163,0.3)] text-[var(--accent3)] shadow-lg animate-pulse"
                  : "text-[var(--muted)] hover:text-white"
              }`}
            >
              🟢 Con SC Software (IA 24/7)
            </button>
          </div>
        </div>

        {/* Grid de simulación */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Columna Izquierda: Flujo Gráfico / Animación */}
          <div className="lg:col-span-6 bg-[var(--bg)] border border-[var(--border)] rounded-2xl p-6 md:p-8 flex flex-col justify-between min-h-[420px] shadow-2xl relative overflow-hidden sc-reveal">
            
            {/* Background grids */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ 
                   backgroundImage: "radial-gradient(var(--accent) 1px, transparent 1px)", 
                   backgroundSize: "20px 20px" 
                 }} 
            />

            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center justify-between">
                <span>Visualizador de Flujo</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  isPlaying ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse" : "bg-[var(--border)] text-[var(--muted)]"
                }`}>
                  {isPlaying ? "Simulando..." : "Detenido"}
                </span>
              </h3>

              {/* El lienzo de animación */}
              <div className="relative h-64 border border-[var(--border)] rounded-xl bg-[var(--surface)] p-6 overflow-hidden flex flex-col justify-center items-center">
                
                {/* Línea conectora de fondo */}
                <div className={`absolute left-1/10 right-1/10 h-0.5 ${isPlaying ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]" : "bg-[var(--border)]"} transition-all duration-1000`} />

                <div className="flex justify-between items-center w-full z-10 relative">
                  
                  {/* Nodo 1: Cliente */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-xl shadow-lg relative">
                      👤
                      {/* Pulse animado */}
                      <div className="absolute inset-0 rounded-xl border border-[var(--accent)] animate-ping opacity-25" />
                    </div>
                    <span className="text-[10px] font-bold text-white uppercase mt-2">Cliente</span>
                  </div>

                  {/* Nodo Central: Intermediario / IA */}
                  <div className="flex flex-col items-center relative">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xl transition-all duration-500 border ${
                      mode === "auto" 
                        ? (isPlaying ? "bg-[var(--accent)] border-[var(--accent)] text-[var(--bg)] shadow-[0_0_24px_var(--accent)]" : "bg-[var(--bg)] border-[var(--accent)]/30 text-[var(--accent)]") 
                        : (isPlaying ? "bg-[#ff5f57]/10 border-[#ff5f57] text-[#ff5f57]" : "bg-[var(--bg)] border-[var(--border)] text-[var(--muted)]")
                    }`}>
                      {mode === "auto" ? "⚡" : "📂"}
                    </div>
                    <span className="text-[10px] font-bold text-white uppercase mt-2">
                      {mode === "auto" ? "SC Engine (IA)" : "Bandeja Vendedor"}
                    </span>
                  </div>

                  {/* Nodo 3: Destino (Venta o Pérdida) */}
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-xl bg-[var(--bg)] border transition-all duration-700 flex items-center justify-center text-xl shadow-lg ${
                      isPlaying && currentSubStep === 4
                        ? (mode === "auto" ? "border-[var(--accent3)] bg-[rgba(0,255,163,0.1)] text-[var(--accent3)] shadow-[0_0_15px_rgba(0,255,163,0.2)]" : "border-[#ff5f57] bg-[#ff5f57]/10 text-[#ff5f57]")
                        : "border-[var(--border)]"
                    }`}>
                      {isPlaying && currentSubStep === 4
                        ? (mode === "auto" ? "💵" : "❌")
                        : "⏳"}
                    </div>
                    <span className="text-[10px] font-bold text-white uppercase mt-2">
                      {isPlaying && currentSubStep === 4
                        ? (mode === "auto" ? "¡Venta!" : "Perdido")
                        : "Resultado"}
                    </span>
                  </div>

                </div>

                {/* Mensaje viajando */}
                {isPlaying && currentSubStep > 0 && currentSubStep < 4 && (
                  <div 
                    className={`absolute w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-black text-white shadow-lg transition-all duration-1000 ${
                      mode === "auto" ? "bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" : "bg-[#ff5f57]"
                    }`}
                    style={{
                      left: currentSubStep === 1 ? "15%" : currentSubStep === 2 ? "50%" : "82%",
                      transform: "translate(-50%, -50%)",
                      top: "50%"
                    }}
                  >
                    ✉
                  </div>
                )}
              </div>
            </div>

            {/* Panel de control de la simulación */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 border-t border-[var(--border)] pt-6">
              <button
                disabled={isPlaying}
                onClick={handleStartSimulation}
                className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  isPlaying 
                    ? "bg-[rgba(255,255,255,0.05)] text-[var(--muted)] border border-[var(--border)] cursor-not-allowed" 
                    : mode === "auto"
                      ? "bg-[var(--accent3)] text-[var(--bg)] hover:shadow-[0_0_24px_rgba(0,255,163,0.3)] hover:scale-[1.02]"
                      : "bg-[#ff5f57] text-white hover:shadow-[0_0_24px_rgba(255,95,87,0.3)] hover:scale-[1.02]"
                }`}
              >
                {isPlaying ? "Simulando flujo..." : "▶ Iniciar Simulación"}
              </button>
              
              <div className="text-left text-xs text-[var(--muted)] leading-relaxed">
                {mode === "auto" 
                  ? "Vas a ver cómo las respuestas automáticas e inmediatas aseguran la atención del cliente caliente." 
                  : "Vas a ver el embotellamiento del trabajo manual y cómo se enfría el lead hasta perderse."
                }
              </div>
            </div>

          </div>

          {/* Columna Derecha: Cronograma y Pasos Detallados */}
          <div className="lg:col-span-6 space-y-4 sc-reveal sc-reveal-d1">
            <div className="bg-[var(--bg)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-2xl h-full flex flex-col justify-between">
              
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 border-b border-[var(--border)] pb-4">
                  Cronograma Paso a Paso
                </h3>

                <div className="space-y-4 relative">
                  {/* Línea vertical de la línea de tiempo */}
                  <div className="absolute left-6 top-3 bottom-3 w-0.5 bg-[var(--border)] z-0" />

                  {steps.map((step, idx) => {
                    const isActive = step.status === "active";
                    const isDone = step.status === "done";
                    const isSuccess = step.status === "success";
                    const isError = step.status === "error";

                    let badgeColor = "bg-[var(--surface)] text-[var(--muted)] border-[var(--border)]";
                    let textColor = "text-[var(--muted)]";
                    let timeColor = "text-[var(--muted2)]";

                    if (isActive) {
                      badgeColor = mode === "auto" ? "bg-[rgba(0,229,255,0.1)] text-[var(--accent)] border-[var(--accent)] shadow-[0_0_12px_rgba(0,229,255,0.2)] animate-pulse" : "bg-amber-500/10 text-amber-400 border-amber-500/30";
                      textColor = "text-white";
                      timeColor = "text-[var(--accent)] font-bold";
                    } else if (isDone) {
                      badgeColor = "bg-white/5 text-[var(--accent3)] border-[var(--border)]";
                      textColor = "text-[var(--text)]";
                      timeColor = "text-[var(--muted)]";
                    } else if (isSuccess) {
                      badgeColor = "bg-[rgba(0,255,163,0.1)] text-[var(--accent3)] border-[var(--accent3)] shadow-[0_0_12px_rgba(0,255,163,0.2)]";
                      textColor = "text-white";
                      timeColor = "text-[var(--accent3)] font-bold";
                    } else if (isError) {
                      badgeColor = "bg-[#ff5f57]/10 text-[#ff5f57] border-[#ff5f57]";
                      textColor = "text-[#ff5f57]";
                      timeColor = "text-[#ff5f57] font-bold";
                    }

                    return (
                      <div 
                        key={idx} 
                        className={`flex items-start gap-4 transition-all duration-500 relative z-10 p-3 rounded-xl ${
                          isActive ? "bg-white/5 border border-white/5 shadow-md" : "border border-transparent"
                        }`}
                      >
                        {/* Círculo indicador */}
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-black shrink-0 transition-colors duration-500 ${badgeColor}`}>
                          {isDone ? "✓" : isSuccess ? "✔" : isError ? "✕" : idx + 1}
                        </div>

                        {/* Contenido */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className={`text-sm font-bold truncate ${textColor}`}>{step.title}</h4>
                            <span className={`text-[10px] font-mono shrink-0 ${timeColor}`}>{step.time}</span>
                          </div>
                          <p className="text-xs text-[var(--muted)] leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Conclusión o Mensaje de Cierre del simulador */}
              <div className={`mt-8 p-4 rounded-xl border transition-all duration-700 ${
                !isPlaying && currentSubStep === 4
                  ? (mode === "auto" 
                      ? "bg-[rgba(0,255,163,0.03)] border-[rgba(0,255,163,0.15)] text-[var(--accent3)]" 
                      : "bg-[#ff5f57]/5 border-[#ff5f57]/15 text-[#ff5f57]") 
                  : "bg-[var(--surface)] border-[var(--border)] text-[var(--muted)]"
              } text-xs font-semibold text-center`}>
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

      </div>
    </section>
  );
}
