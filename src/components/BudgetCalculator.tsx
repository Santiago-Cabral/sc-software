import { useState } from "react";

interface ProjectType {
  id: string;
  name: string;
  basePrice: number;
  icon: string;
  desc: string;
}

const PROJECT_TYPES: ProjectType[] = [
  { id: "landing", name: "Landing Page", basePrice: 200, icon: "🌐", desc: "Página única optimizada para conversiones rápidas." },
  { id: "web-crm", name: "Web Completa / CRM", basePrice: 600, icon: "📊", desc: "Sitio multi-página con panel de administración y control." },
  { id: "custom-sys", name: "Sistema a Medida", basePrice: 1200, icon: "🛠️", desc: "Software desarrollado exclusivamente para tu modelo operativo." },
  { id: "ai-automation", name: "Automatización con IA", basePrice: 1000, icon: "⚡", desc: "Bots, flujos automáticos e integraciones inteligentes." },
];

interface Addon {
  id: string;
  name: string;
  price: number;
  desc: string;
}

const ADDONS: Addon[] = [
  { id: "payments", name: "Pasarela de Pagos", price: 150, desc: "Recibí cobros online de forma automática." },
  { id: "whatsapp", name: "Notificaciones WhatsApp API", price: 150, desc: "Envío automático de alertas a clientes." },
  { id: "auth", name: "Roles y Permisos", price: 100, desc: "Distintos accesos para tu equipo de trabajo." },
  { id: "multilang", name: "Sitio Multi-idioma", price: 80, desc: "Traducción completa para audiencias globales." },
];

export default function BudgetCalculator() {
  const [selectedType, setSelectedType] = useState<string>("landing");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  
  // Métricas del cliente para calcular el ROI
  const [hoursPerDay, setHoursPerDay] = useState<number>(3);
  const [employees, setEmployees] = useState<number>(2);
  const [hourlyWage, setHourlyWage] = useState<number>(10);

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((addonId) => addonId !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  // Cálculos
  const selectedProjObj = PROJECT_TYPES.find((p) => p.id === selectedType) || PROJECT_TYPES[0];
  const addonsCost = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const estimatedPrice = selectedProjObj.basePrice + addonsCost;

  // ROI y Ahorros
  const monthlyHoursSaved = Math.round(hoursPerDay * 20 * employees * 0.8); 
  const monthlySavingsUSD = Math.round(monthlyHoursSaved * hourlyWage);
  const monthsToROI = monthlySavingsUSD > 0 ? (estimatedPrice / monthlySavingsUSD).toFixed(1) : "0";

  const handleWhatsappSend = () => {
    const projName = selectedProjObj.name;
    const activeAddonsText = selectedAddons.length > 0 
      ? selectedAddons.map((id) => ADDONS.find((a) => a.id === id)?.name).join(", ") 
      : "Ninguno";
    
    const message = 
      `¡Hola SC Software! Estuve usando su Calculadora de Presupuesto y ROI interactiva.\n\n` +
      `*PROYECTO SELECCIONADO:*\n` +
      `• Tipo: ${projName}\n` +
      `• Adicionales: ${activeAddonsText}\n` +
      `• Costo estimado: Desde USD $${estimatedPrice}\n\n` +
      `*MÉTRICAS DE MI NEGOCIO:*\n` +
      `• Horas perdidas/día: ${hoursPerDay} hs\n` +
      `• Empleados afectados: ${employees} personas\n` +
      `• Salario/hora aprox: USD $${hourlyWage}\n\n` +
      `*AHORRO ESTIMADO CON SC SOFTWARE:*\n` +
      `• Tiempo ahorrado: ~${monthlyHoursSaved} horas/mes\n` +
      `• Dinero recuperado: ~USD $${monthlySavingsUSD}/mes\n` +
      `• Recupero de Inversión (ROI): ~${monthsToROI} meses\n\n` +
      `¿Podemos tener una consulta gratis para repasar los detalles?`;

    window.open(`https://wa.me/5493815502176?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      <style>{`
        .sc-calc-section {
          padding: 100px 0;
          background: var(--bg);
          position: relative;
          overflow: hidden;
        }
        .sc-calc-glow1 {
          position: absolute; top: 25%; left: 10%; width: 400px; height: 400px;
          background: radial-gradient(ellipse, rgba(0,229,255,0.035) 0%, transparent 70%);
          pointer-events: none; filter: blur(50px);
        }
        .sc-calc-glow2 {
          position: absolute; bottom: 25%; right: 10%; width: 400px; height: 400px;
          background: radial-gradient(ellipse, rgba(123,97,255,0.035) 0%, transparent 70%);
          pointer-events: none; filter: blur(50px);
        }
        .sc-calc-header {
          text-align: center; margin-bottom: 60px;
        }
        .sc-calc-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 991px) {
          .sc-calc-grid { grid-template-columns: 1fr; }
        }
        .sc-calc-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 40px;
          box-shadow: var(--shadow-md);
        }
        @media (max-width: 480px) {
          .sc-calc-card { padding: 24px; }
        }
        .sc-calc-step-title {
          font-family: var(--font-display);
          font-size: 0.95rem; font-weight: 700;
          color: var(--white); text-transform: uppercase;
          letter-spacing: 0.08em; margin-bottom: 24px;
          display: flex; align-items: center; gap: 12px;
        }
        .sc-calc-step-num {
          width: 26px; height: 26px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 800;
        }
        .sc-calc-step-num.c1 { background: rgba(0,229,255,0.1); color: var(--accent); border: 1px solid rgba(0,229,255,0.25); }
        .sc-calc-step-num.c2 { background: rgba(123,97,255,0.1); color: var(--accent2); border: 1px solid rgba(123,97,255,0.25); }
        .sc-calc-step-num.c3 { background: rgba(0,255,163,0.1); color: var(--accent3); border: 1px solid rgba(0,255,163,0.25); }
        
        /* Opciones de tipo de proyecto */
        .sc-calc-types-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px; margin-bottom: 40px;
        }
        .sc-calc-type-btn {
          text-align: left; padding: 20px;
          background: rgba(255,255,255,0.01);
          border: 1px solid var(--border);
          border-radius: 16px; cursor: pointer;
          transition: all 0.3s var(--transition);
        }
        .sc-calc-type-btn:hover {
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.03);
        }
        .sc-calc-type-btn.active {
          border-color: var(--accent);
          background: rgba(0,229,255,0.04);
          box-shadow: 0 0 20px rgba(0,229,255,0.04);
        }
        .sc-calc-type-header {
          display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;
        }
        .sc-calc-type-icon { font-size: 1.5rem; }
        .sc-calc-type-price { font-size: 0.72rem; font-weight: 800; color: var(--accent); letter-spacing: 0.05em; }
        .sc-calc-type-name { font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: var(--white); margin-bottom: 6px; }
        .sc-calc-type-desc { font-size: 0.75rem; color: var(--muted); line-height: 1.5; }

        /* Opciones de adicionales */
        .sc-calc-addons-stack {
          display: flex; flex-direction: column; gap: 12px; margin-bottom: 40px;
        }
        .sc-calc-addon-btn {
          width: 100%; text-align: left; padding: 16px 20px;
          background: rgba(255,255,255,0.01);
          border: 1px solid var(--border);
          border-radius: 14px; cursor: pointer;
          display: flex; justify-content: space-between; align-items: center; gap: 16px;
          transition: all 0.2s var(--transition);
        }
        .sc-calc-addon-btn:hover {
          border-color: rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.03);
        }
        .sc-calc-addon-btn.active {
          border-color: var(--accent2);
          background: rgba(123,97,255,0.04);
        }
        .sc-calc-addon-left { display: flex; align-items: center; gap: 14px; }
        .sc-calc-addon-check {
          width: 18px; height: 18px; border-radius: 4px;
          border: 1px solid var(--muted);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.68rem; transition: all 0.2s;
        }
        .sc-calc-addon-btn.active .sc-calc-addon-check {
          background: var(--accent2); border-color: var(--accent2); color: var(--white);
        }
        .sc-calc-addon-title { font-size: 0.88rem; font-weight: 600; color: var(--white); }
        .sc-calc-addon-desc { font-size: 0.72rem; color: var(--muted); margin-top: 2px; }
        .sc-calc-addon-price { font-size: 0.75rem; font-weight: 700; color: var(--accent2); }

        /* Sliders de ROI */
        .sc-calc-sliders-stack {
          display: flex; flex-direction: column; gap: 28px;
          border-top: 1px solid var(--border); pt: 32px; padding-top: 32px;
        }
        .sc-calc-slider-group { display: flex; flex-direction: column; gap: 10px; }
        .sc-calc-slider-header { display: flex; justify-content: space-between; font-size: 0.88rem; }
        .sc-calc-slider-label { color: var(--text); }
        .sc-calc-slider-val { font-weight: 700; color: var(--accent3); }
        .sc-calc-range {
          width: 100%; height: 5px; background: var(--border);
          border-radius: 100px; outline: none; -webkit-appearance: none; cursor: pointer;
        }
        .sc-calc-range::-webkit-slider-thumb {
          -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%;
          background: var(--accent3); box-shadow: 0 0 8px var(--accent3); transition: transform 0.1s;
        }
        .sc-calc-range::-webkit-slider-thumb:hover { transform: scale(1.2); }
        .sc-calc-slider-footer { display: flex; justify-content: space-between; font-size: 0.65rem; color: var(--muted2); }

        /* Tarjeta de resultados (Columna derecha) */
        .sc-calc-result-card {
          background: linear-gradient(135deg, #0a111a 0%, #0e121e 100%);
          border: 1px solid rgba(0,229,255,0.12);
          border-radius: 20px; padding: 40px;
          box-shadow: var(--shadow-lg); position: relative;
        }
        .sc-calc-result-glow {
          position: absolute; top: -50px; right: -50px; width: 180px; height: 180px;
          background: radial-gradient(circle, rgba(0,229,255,0.03) 0%, transparent 70%);
          pointer-events: none;
        }
        .sc-calc-result-title {
          font-family: var(--font-display); font-size: 0.95rem; font-weight: 700;
          color: var(--white); text-transform: uppercase; letter-spacing: 0.08em;
          border-bottom: 1px solid var(--border); padding-bottom: 20px; margin-bottom: 24px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .sc-calc-result-badge {
          font-size: 0.65rem; font-weight: 800; color: var(--accent);
          background: rgba(0,229,255,0.08); border: 1px solid rgba(0,229,255,0.25);
          padding: 3px 10px; border-radius: 100px;
        }
        .sc-calc-price-wrap { margin-bottom: 28px; }
        .sc-calc-price-lbl { font-size: 0.72rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
        .sc-calc-price-value { font-family: var(--font-display); font-size: 3rem; font-weight: 800; color: var(--white); letter-spacing: -0.03em; line-height: 1; }
        .sc-calc-price-note { font-size: 0.68rem; color: var(--accent); font-weight: 600; margin-top: 6px; }
        
        .sc-calc-stats-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
          padding: 24px 0; margin-bottom: 28px;
        }
        .sc-calc-stat-lbl { font-size: 0.72rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
        .sc-calc-stat-val { font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; color: var(--accent3); }
        .sc-calc-stat-sub { font-size: 0.65rem; color: var(--muted2); }

        .sc-calc-roi-box {
          background: rgba(0,255,163,0.025); border: 1px solid rgba(0,255,163,0.1);
          border-radius: 14px; padding: 18px; display: flex; justify-content: space-between;
          align-items: center; gap: 16px; margin-bottom: 28px;
        }
        .sc-calc-roi-lbl { font-size: 0.72rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; }
        .sc-calc-roi-title { font-size: 0.83rem; font-weight: 700; color: var(--white); margin-top: 2px; }
        .sc-calc-roi-val { text-align: right; }
        .sc-calc-roi-number { font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; color: var(--accent3); }
        .sc-calc-roi-unit { font-size: 0.72rem; color: var(--accent3); font-weight: 700; }

        .sc-calc-submit-btn {
          width: 100%; padding: 16px; background: var(--accent);
          color: var(--bg); border: none; border-radius: 12px;
          font-family: var(--font-body); font-size: 0.88rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: all 0.3s var(--transition);
          box-shadow: 0 4px 20px rgba(0,229,255,0.3);
        }
        .sc-calc-submit-btn:hover {
          box-shadow: 0 4px 30px rgba(0,229,255,0.5);
          transform: translateY(-2px);
        }
        .sc-calc-submit-btn svg { fill: currentColor; }
        .sc-calc-result-footer {
          text-align: center; margin-top: 16px; font-size: 0.72rem; color: var(--muted2);
        }

        .sc-calc-extra-info {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 16px; padding: 24px; text-align: center; margin-top: 20px;
        }
        .sc-calc-extra-title { font-size: 0.88rem; font-weight: 700; color: var(--white); margin-bottom: 6px; }
        .sc-calc-extra-desc { font-size: 0.75rem; color: var(--muted); line-height: 1.6; }
      `}</style>

      <section id="calculadora" className="sc-calc-section">
        <div className="sc-calc-glow1" />
        <div className="sc-calc-glow2" />
        
        <div className="sc-container">
          <div className="sc-calc-header sc-reveal">
            <div className="sc-section-label" style={{ justifyContent: "center" }}>Simulador Inteligente</div>
            <h2 className="sc-section-title">Calculá tu Presupuesto y ROI</h2>
            <p className="sc-section-sub" style={{ margin: "0 auto" }}>
              Elegí qué necesitas y estimá cuánto tiempo y dinero vas a recuperar con un sistema automatizado a medida.
            </p>
          </div>

          <div className="sc-calc-grid">
            
            {/* Columna Izquierda: Opciones */}
            <div className="sc-calc-card sc-reveal">
              
              {/* Paso 1: Tipo */}
              <div className="sc-calc-step-group">
                <label className="sc-calc-step-title">
                  <span className="sc-calc-step-num c1">1</span>
                  ¿Qué tipo de proyecto necesitás?
                </label>
                
                <div className="sc-calc-types-grid">
                  {PROJECT_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`sc-calc-type-btn ${selectedType === type.id ? "active" : ""}`}
                    >
                      <div className="sc-calc-type-header">
                        <span className="sc-calc-type-icon">{type.icon}</span>
                        <span className="sc-calc-type-price">Desde USD ${type.basePrice}</span>
                      </div>
                      <div className="sc-calc-type-name">{type.name}</div>
                      <p className="sc-calc-type-desc">{type.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Paso 2: Adicionales */}
              <div className="sc-calc-step-group">
                <label className="sc-calc-step-title">
                  <span className="sc-calc-step-num c2">2</span>
                  ¿Querés agregar alguna funcionalidad avanzada?
                </label>
                
                <div className="sc-calc-addons-stack">
                  {ADDONS.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`sc-calc-addon-btn ${isChecked ? "active" : ""}`}
                      >
                        <div className="sc-calc-addon-left">
                          <div className="sc-calc-addon-check">
                            {isChecked && "✓"}
                          </div>
                          <div style={{ textAlign: "left" }}>
                            <div className="sc-calc-addon-title">{addon.name}</div>
                            <div className="sc-calc-addon-desc">{addon.desc}</div>
                          </div>
                        </div>
                        <div className="sc-calc-addon-price">+ USD ${addon.price}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Paso 3: ROI Sliders */}
              <div className="sc-calc-sliders-stack">
                <label className="sc-calc-step-title" style={{ marginBottom: "16px" }}>
                  <span className="sc-calc-step-num c3">3</span>
                  Medí tu ineficiencia actual (Cálculo de ROI)
                </label>

                <div className="sc-calc-slider-group">
                  <div className="sc-calc-slider-header">
                    <span className="sc-calc-slider-label">Horas al día perdidas en procesos manuales:</span>
                    <span className="sc-calc-slider-val">{hoursPerDay} hs</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(parseInt(e.target.value))}
                    className="sc-calc-range"
                    style={{
                      background: `linear-gradient(to right, var(--accent3) ${(hoursPerDay - 1) * 11.1}%, var(--border) ${(hoursPerDay - 1) * 11.1}%)`
                    }}
                  />
                  <div className="sc-calc-slider-footer">
                    <span>1 hora</span>
                    <span>5 hs</span>
                    <span>10 hs</span>
                  </div>
                </div>

                <div className="sc-calc-slider-group">
                  <div className="sc-calc-slider-header">
                    <span className="sc-calc-slider-label">Cantidad de personas realizando estas tareas:</span>
                    <span className="sc-calc-slider-val">{employees} {employees === 1 ? "persona" : "personas"}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={employees}
                    onChange={(e) => setEmployees(parseInt(e.target.value))}
                    className="sc-calc-range"
                    style={{
                      background: `linear-gradient(to right, var(--accent3) ${(employees - 1) * 7.14}%, var(--border) ${(employees - 1) * 7.14}%)`
                    }}
                  />
                  <div className="sc-calc-slider-footer">
                    <span>1 persona</span>
                    <span>8 pers</span>
                    <span>15 pers</span>
                  </div>
                </div>

                <div className="sc-calc-slider-group">
                  <div className="sc-calc-slider-header">
                    <span className="sc-calc-slider-label">Costo estimado de la hora laboral de tu equipo:</span>
                    <span className="sc-calc-slider-val">USD ${hourlyWage} / hs</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={hourlyWage}
                    onChange={(e) => setHourlyWage(parseInt(e.target.value))}
                    className="sc-calc-range"
                    style={{
                      background: `linear-gradient(to right, var(--accent3) ${(hourlyWage - 5) * 2.22}%, var(--border) ${(hourlyWage - 5) * 2.22}%)`
                    }}
                  />
                  <div className="sc-calc-slider-footer">
                    <span>USD $5</span>
                    <span>USD $25</span>
                    <span>USD $50</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Columna Derecha: Reporte */}
            <div className="sc-reveal sc-reveal-d1" style={{ position: "sticky", top: "100px" }}>
              <div className="sc-calc-result-card">
                <div className="sc-calc-result-glow" />
                
                <h3 className="sc-calc-result-title">
                  <span>Resumen ROI</span>
                  <span className="sc-calc-result-badge">En vivo</span>
                </h3>

                <div className="sc-calc-price-wrap">
                  <div className="sc-calc-price-lbl">Presupuesto Referencia</div>
                  <div className="sc-calc-price-value">
                    USD ${estimatedPrice}
                  </div>
                  <div className="sc-calc-price-note">* Pago único inicial</div>
                </div>

                <div className="sc-calc-stats-grid">
                  <div>
                    <div className="sc-calc-stat-lbl">Tiempo Ahorrado</div>
                    <div className="sc-calc-stat-val">~{monthlyHoursSaved} hs</div>
                    <div className="sc-calc-stat-sub">al mes automatizadas</div>
                  </div>
                  <div>
                    <div className="sc-calc-stat-lbl">Ahorro Mensual</div>
                    <div className="sc-calc-stat-val">USD ${monthlySavingsUSD}</div>
                    <div className="sc-calc-stat-sub">de vuelta en tu negocio</div>
                  </div>
                </div>

                <div className="sc-calc-roi-box">
                  <div>
                    <div className="sc-calc-roi-lbl">Recupero de Inversión</div>
                    <div className="sc-calc-roi-title">Tu software se paga solo</div>
                  </div>
                  <div className="sc-calc-roi-val">
                    <span className="sc-calc-roi-number">{monthsToROI}</span>
                    <span className="sc-calc-roi-unit"> {parseFloat(monthsToROI) === 1 ? "mes" : "meses"}</span>
                  </div>
                </div>

                <button onClick={handleWhatsappSend} className="sc-calc-submit-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Enviar Presupuesto a WhatsApp
                </button>

                <div className="sc-calc-result-footer">
                  ✓ Primera reunión gratis &nbsp;·&nbsp; ✓ Sin compromiso
                </div>
              </div>

              <div className="sc-calc-extra-info">
                <div className="sc-calc-extra-title">¿Tenés requisitos especiales?</div>
                <p className="sc-calc-extra-desc">
                  Si tu negocio requiere integraciones raras, APIs específicas o legacy de hardware, escribinos directamente. Armamos presupuestos a medida de cualquier complejidad.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
