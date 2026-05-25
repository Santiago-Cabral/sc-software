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
  { id: "payments", name: "Pasarela de Pagos (Stripe/MercadoPago)", price: 150, desc: "Recibí cobros online de forma automática." },
  { id: "whatsapp", name: "Notificaciones WhatsApp API", price: 150, desc: "Envío automático de alertas a clientes." },
  { id: "auth", name: "Roles y Permisos Avanzados", price: 100, desc: "Distintos accesos para tu equipo de trabajo." },
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
  // Asumimos 20 días hábiles al mes
  const monthlyHoursSaved = Math.round(hoursPerDay * 20 * employees * 0.8); // 80% de eficiencia de ahorro
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
    <section id="calculadora" className="py-24 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-[rgba(0,229,255,0.04)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-[rgba(123,97,255,0.04)] blur-3xl pointer-events-none" />
      
      <div className="sc-container relative z-10">
        <div className="text-center mb-16 sc-reveal">
          <div className="sc-section-label" style={{ justifyContent: "center" }}>Simulador Inteligente</div>
          <h2 className="sc-section-title">Calculá tu Presupuesto y ROI</h2>
          <p style={{ color: "var(--muted)", maxWidth: "560px", margin: "0 auto", fontSize: "0.98rem", lineHeight: 1.75 }}>
            Elegí qué necesitas y estimá cuánto tiempo y dinero vas a recuperar con un sistema automatizado a medida.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Columna Izquierda: Entradas / Opciones */}
          <div className="lg:col-span-7 space-y-8 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-xl sc-reveal">
            
            {/* Paso 1: Tipo de Proyecto */}
            <div>
              <label className="block text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--accent)] text-[var(--bg)] flex items-center justify-center text-xs font-black">1</span>
                ¿Qué tipo de proyecto necesitás?
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROJECT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                      selectedType === type.id
                        ? "border-[var(--accent)] bg-[rgba(0,229,255,0.05)] shadow-[0_0_20px_rgba(0,229,255,0.05)]"
                        : "border-[var(--border)] bg-[rgba(255,255,255,0.01)] hover:border-[rgba(255,255,255,0.15)]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{type.icon}</span>
                      <span className="text-xs font-bold text-[var(--accent)]">Desde USD ${type.basePrice}</span>
                    </div>
                    <div className="font-bold text-white mb-1 text-sm md:text-base">{type.name}</div>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">{type.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Paso 2: Adicionales */}
            <div>
              <label className="block text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--accent2)] text-white flex items-center justify-center text-xs font-black">2</span>
                ¿Querés agregar alguna funcionalidad avanzada?
              </label>
              
              <div className="space-y-3">
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-4 ${
                        isChecked
                          ? "border-[var(--accent2)] bg-[rgba(123,97,255,0.05)]"
                          : "border-[var(--border)] bg-[rgba(255,255,255,0.01)] hover:border-[rgba(255,255,255,0.12)]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                          isChecked 
                            ? "bg-[var(--accent2)] border-[var(--accent2)] text-white" 
                            : "border-[var(--muted)]"
                        }`}>
                          {isChecked && <span className="text-xs">✓</span>}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{addon.name}</div>
                          <div className="text-xs text-[var(--muted)]">{addon.desc}</div>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-[var(--accent2)] whitespace-nowrap">+ USD ${addon.price}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Paso 3: Métricas de Operación para calcular ROI */}
            <div className="border-t border-[var(--border)] pt-6 mt-6">
              <label className="block text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--accent3)] text-[var(--bg)] flex items-center justify-center text-xs font-black">3</span>
                Medí tu ineficiencia actual (Cálculo de ROI)
              </label>

              <div className="space-y-6">
                {/* Horas perdidas */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text)]">Horas al día perdidas en procesos manuales:</span>
                    <span className="font-bold text-[var(--accent3)]">{hoursPerDay} hs</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(parseInt(e.target.value))}
                    className="w-full h-1 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--accent3)]"
                    style={{
                      background: `linear-gradient(to right, var(--accent3) ${(hoursPerDay - 1) * 11.1}%, var(--border) ${(hoursPerDay - 1) * 11.1}%)`
                    }}
                  />
                  <div className="flex justify-between text-[10px] text-[var(--muted)]">
                    <span>1 hora</span>
                    <span>5 horas</span>
                    <span>10 horas</span>
                  </div>
                </div>

                {/* Empleados afectados */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text)]">Cantidad de personas realizando estas tareas:</span>
                    <span className="font-bold text-[var(--accent3)]">{employees} {employees === 1 ? "persona" : "personas"}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={employees}
                    onChange={(e) => setEmployees(parseInt(e.target.value))}
                    className="w-full h-1 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--accent3)]"
                    style={{
                      background: `linear-gradient(to right, var(--accent3) ${(employees - 1) * 7.14}%, var(--border) ${(employees - 1) * 7.14}%)`
                    }}
                  />
                  <div className="flex justify-between text-[10px] text-[var(--muted)]">
                    <span>1 persona</span>
                    <span>8 personas</span>
                    <span>15 personas</span>
                  </div>
                </div>

                {/* Sueldo promedio/hora */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text)]">Costo estimado de la hora laboral de tu equipo:</span>
                    <span className="font-bold text-[var(--accent3)]">USD ${hourlyWage} / hs</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={hourlyWage}
                    onChange={(e) => setHourlyWage(parseInt(e.target.value))}
                    className="w-full h-1 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--accent3)]"
                    style={{
                      background: `linear-gradient(to right, var(--accent3) ${(hourlyWage - 5) * 2.22}%, var(--border) ${(hourlyWage - 5) * 2.22}%)`
                    }}
                  />
                  <div className="flex justify-between text-[10px] text-[var(--muted)]">
                    <span>USD $5</span>
                    <span>USD $25</span>
                    <span>USD $50</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Columna Derecha: Reporte de ROI y CTAs */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24 sc-reveal sc-reveal-d1">
            <div className="bg-gradient-to-br from-[#0e1622] to-[#121424] border border-[rgba(0,229,255,0.15)] rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[rgba(0,229,255,0.03)] rounded-full -mr-8 -mt-8 pointer-events-none" />
              
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest border-b border-[var(--border)] pb-4 flex items-center justify-between">
                <span>Resumen ROI</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[rgba(0,229,255,0.1)] text-[var(--accent)] border border-[rgba(0,229,255,0.2)]">En vivo</span>
              </h3>

              {/* Métrica 1: Costo Estimado */}
              <div className="mb-6">
                <div className="text-xs text-[var(--muted)] uppercase tracking-wider mb-1">Presupuesto Referencia</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-black text-white font-display">
                    USD ${estimatedPrice}
                  </span>
                  <span className="text-xs text-[var(--accent)] font-semibold">*Pago único*</span>
                </div>
                <p className="text-[11px] text-[var(--muted)] mt-1.5 leading-relaxed">
                  *Precio base de cotización. No incluye hosting, dominios o APIs pagas de terceros en caso de requerirse.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-b border-[var(--border)] py-6 my-6">
                {/* Tiempo ahorrado */}
                <div>
                  <div className="text-xs text-[var(--muted)] uppercase tracking-wider mb-1">Tiempo Ahorrado</div>
                  <div className="text-2xl font-bold text-[var(--accent3)] font-display">
                    ~{monthlyHoursSaved} hs
                  </div>
                  <div className="text-[10px] text-[var(--muted)]">al mes automatizadas</div>
                </div>

                {/* Dinero recuperado */}
                <div>
                  <div className="text-xs text-[var(--muted)] uppercase tracking-wider mb-1">Ahorro Mensual</div>
                  <div className="text-2xl font-bold text-[var(--accent3)] font-display">
                    USD ${monthlySavingsUSD}
                  </div>
                  <div className="text-[10px] text-[var(--muted)]">de vuelta en tu negocio</div>
                </div>
              </div>

              {/* Métrica 3: Retorno de la Inversión */}
              <div className="mb-8 p-4 rounded-xl bg-[rgba(0,255,163,0.03)] border border-[rgba(0,255,163,0.1)] flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-[var(--muted)] uppercase tracking-wider mb-0.5">Recupero de Inversión</div>
                  <div className="text-sm font-semibold text-white">Tu software se paga solo</div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-[var(--accent3)] font-display">
                    {monthsToROI}
                  </span>
                  <span className="text-xs text-[var(--accent3)] font-bold"> {parseFloat(monthsToROI) === 1 ? "mes" : "meses"}</span>
                </div>
              </div>

              {/* Botón de envío */}
              <button
                onClick={handleWhatsappSend}
                className="w-full py-4 rounded-xl bg-[var(--accent)] text-[var(--bg)] font-black text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(0,229,255,0.3)] hover:shadow-[0_4px_30px_rgba(0,229,255,0.5)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Enviar Presupuesto a WhatsApp
              </button>

              <div className="text-center mt-4">
                <span className="text-[11px] text-[var(--muted)] flex items-center justify-center gap-1.5">
                  ✓ Primera reunión gratis · ✓ Sin compromiso
                </span>
              </div>
            </div>
            
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 text-center space-y-2">
              <div className="text-sm font-bold text-white">¿Tenés dudas muy particulares?</div>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Cada negocio es un mundo. Si necesitás integraciones raras, legacy o hardware específico, contactanos directamente.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
