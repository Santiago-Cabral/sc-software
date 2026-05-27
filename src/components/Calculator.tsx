import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Calculator, Hourglass, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { CalculatorState, CalculatorResults } from "../types";

export default function CalculatorSection() {
  const [state, setState] = useState<CalculatorState>({
    dailyInquiries: 30,
    minutesPerInquiry: 6,
    averageTicket: 12000,
  });

  const results = useMemo<CalculatorResults>(() => {
    // 30 days a month
    // Hours spent manually per month
    const hoursWastedPerMonth = Math.round((state.dailyInquiries * state.minutesPerInquiry * 30) / 60);
    // Workdays saved per year (8-hour shift)
    const savedDaysPerYear = Math.round((hoursWastedPerMonth * 12) / 8);
    
    // Slow replies lose 30% of potential conversions (industry standard for WhatsApp sales)
    const totalPotentialOrdersPerMonth = state.dailyInquiries * 30 * 0.25; // assumes 25% purchase intent
    const potentialLostRevenue = Math.round(totalPotentialOrdersPerMonth * 0.35 * state.averageTicket); // 35% leak
    const potentialRecoveredRevenue = Math.round(potentialLostRevenue * 0.80); // 80% recovery with automatic catalog/agent

    return {
      hoursWastedPerMonth,
      potentialLostRevenue,
      potentialRecoveredRevenue,
      savedDaysPerYear,
    };
  }, [state]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="calculadora" className="py-24 border-t border-brand-border bg-[#0A0A0A] relative overflow-hidden">
      {/* Decorative vertical grid lines for minimalist industrial feel */}
      <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-neutral-900/40 pointer-events-none hidden md:block"></div>
      <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-neutral-900/40 pointer-events-none hidden md:block"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-gold/20 bg-brand-gold/5 rounded-full text-xs text-brand-gold font-mono uppercase tracking-wider mb-4">
            <Calculator size={12} />
            Diagnóstico Financiero
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-white mb-6 uppercase">
            ¿CUÁNTA PLATA ESTÁS PERDIENDO POR <span className="text-brand-gold">ATENCIÓN LENTA?</span>
          </h2>
          <p className="text-gray-400 font-sans text-base md:text-lg leading-relaxed">
            En WhatsApp, responder 10 minutos tarde reduce la probabilidad de venta en un 80%. Multiplica tus consultas diarias por el tiempo de respuesta y averigua tu fuga de caja.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Panel (6 Cols) */}
          <div className="lg:col-span-7 glass-card p-8 md:p-10 rounded-xl flex flex-col justify-between relative">
            <div className="absolute top-0 left-0 bg-brand-gold text-brand-black text-[10px] font-mono font-medium px-3 py-0.5 uppercase tracking-widest">
              PARÁMETROS DE TU NEGOCIO
            </div>

            <div className="space-y-10 mt-4">
              
              {/* Slider 1: Consultas Diarias */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-sans font-medium text-gray-300">Consultas/Pedidos Diarios</span>
                  <span className="font-mono text-2xl font-bold text-brand-gold">{state.dailyInquiries} <span className="text-xs text-gray-500">chats/día</span></span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="200"
                  step="5"
                  value={state.dailyInquiries}
                  onChange={(e) => setState({ ...state, dailyInquiries: parseInt(e.target.value) })}
                  className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-2">
                  <span>5 CHATS</span>
                  <span>100 CHATS</span>
                  <span>200+ CHATS</span>
                </div>
              </div>

              {/* Slider 2: Minutos de atención por chat */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-sans font-medium text-gray-300">Minutos dedicados por Consulta</span>
                  <span className="font-mono text-2xl font-bold text-brand-gold">{state.minutesPerInquiry} <span className="text-xs text-gray-500">min/chat</span></span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={state.minutesPerInquiry}
                  onChange={(e) => setState({ ...state, minutesPerInquiry: parseInt(e.target.value) })}
                  className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-2">
                  <span>2 MIN (FÁCIL)</span>
                  <span>10 MIN (RECOORDINAR)</span>
                  <span>20 MIN (COMPLEJO)</span>
                </div>
              </div>

              {/* Slider 3: Ticket Promedio en pesos */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-sans font-medium text-gray-300">Valor Promedio de tu Venta (Ticket)</span>
                  <span className="font-mono text-2xl font-bold text-brand-gold">{formatCurrency(state.averageTicket)}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="80000"
                  step="1000"
                  value={state.averageTicket}
                  onChange={(e) => setState({ ...state, averageTicket: parseInt(e.target.value) })}
                  className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-2">
                  <span>$2.000</span>
                  <span>$40.000</span>
                  <span>$80.000+</span>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-brand-border/40 flex items-start gap-3 text-xs text-gray-400 font-sans">
              <AlertCircle size={16} className="text-brand-gold shrink-0 mt-0.5" />
              <span>Cálculos proyectados usando la tasa de conversión típica de comercios y negocios de servicios en Tucumán (pérdida de pedidos estimada en 35% por demoras de coordinación manual).</span>
            </div>
          </div>

          {/* Results Panel (5 Cols) */}
          <div className="lg:col-span-5 glass-card border-2 border-brand-gold p-8 md:p-10 rounded-xl flex flex-col justify-between relative">
            <div className="absolute top-0 right-0 bg-brand-gold/10 text-brand-gold text-[10px] font-mono font-medium px-3 py-0.5 border-l border-b border-brand-gold/20 uppercase tracking-widest">
              FUGAS DETECTADAS
            </div>
            
            <div className="space-y-8 mt-4">
              
              {/* Lost Revenue Indicator */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-red-400 flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                  Pérdida Mensual Estimada
                </span>
                <div className="text-3xl md:text-4xl font-mono font-extrabold text-red-400 mt-2 tracking-tighter uppercase">
                  {formatCurrency(results.potentialLostRevenue)}
                </div>
                <p className="text-xs text-neutral-400 mt-1 font-sans italic">
                  Dinero que se va con clientes que consultan y terminan comprando en la competencia por tardar en contestar.
                </p>
              </div>

              {/* Time Wasted Metric */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-brand-border/40">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-gray-400 block">
                    Tiempo Perdido
                  </span>
                  <div className="text-2xl font-mono font-bold text-white mt-1 flex items-baseline gap-1">
                    {results.hoursWastedPerMonth} <span className="text-xs text-gray-500">hs/mes</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 font-sans">
                    Respondiendo chats repetitivos de "precio", "unidades", y "horarios".
                  </p>
                </div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-gray-400 block">
                    Jornadas Perdidas
                  </span>
                  <div className="text-2xl font-mono font-bold text-white mt-1 flex items-baseline gap-1">
                    {results.savedDaysPerYear} <span className="text-xs text-gray-500">días/año</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 font-sans">
                    Equivale a {Math.round(results.savedDaysPerYear / 30)} meses completos contestando WhatsApps.
                  </p>
                </div>
              </div>

              {/* Action Pitch / Recovered Potential */}
              <div className="bg-brand-gold/5 border border-brand-gold/20 p-5 rounded-xl mt-4">
                <span className="text-xs font-mono uppercase tracking-wider text-brand-gold flex items-center gap-1.5 mb-1.5">
                  <TrendingUp size={14} /> Solución con SC Software
                </span>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  Automatizando el primer contacto y cobro, recuperás hasta el <strong className="text-brand-gold">80% de estas ventas pérdidas</strong> y liberas tus manos por completo.
                </p>
                <div className="text-xl font-mono font-bold text-brand-gold mt-2">
                  + {formatCurrency(results.potentialRecoveredRevenue)} <span className="text-xs font-sans text-gray-400 font-normal">recuperados/mes</span>
                </div>
              </div>

            </div>

            <div className="mt-8">
              <a
                href="#agendar"
                className="w-full inline-flex justify-center items-center gap-2 px-6 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-black hover:brightness-110 transition-all duration-300 font-sans font-extrabold text-xs uppercase tracking-tighter rounded-xl active:translate-y-0.5 group"
              >
                Quiero frenar esta pérdida
                <Hourglass size={14} className="group-hover:rotate-180 transition-transform duration-700" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
