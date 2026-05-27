import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Calendar, ShoppingCart, Activity, ArrowRight, Smartphone, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { SelectionState } from "../types";

export default function InteractivePlayground() {
  const [activeTab, setActiveTab] = useState<"brood" | "caro" | "tenistuc">("brood");
  const [copied, setCopied] = useState(false);

  // Playground state for interactions
  const [state, setState] = useState<SelectionState>({
    barberService: "Corte + Barba ($11.000)",
    barberTime: "17:30 hs",
    barberDate: "Sábado",
    barberName: "Santi",
    deliveryItems: [
      { id: "mila", name: "Sánguche Mila Completo", price: 9500, quantity: 1 }
    ],
    deliveryAddress: "Barrio Norte, Tucumán",
    tenisCourt: "Cancha Polvo de Ladrillo 1",
    tenisTime: "21:30 hs (Noche - Con Luces)",
    tenisDate: "Viernes"
  });

  // Brood handlers
  const handleBarberService = (service: string) => {
    setState({ ...state, barberService: service });
  };
  const handleBarberTime = (time: string) => {
    setState({ ...state, barberTime: time });
  };
  const handleBarberDate = (date: string) => {
    setState({ ...state, barberDate: date });
  };

  // Lo de Caro Handlers
  const handleAddMeal = (id: string, name: string, price: number) => {
    const existing = state.deliveryItems.find(item => item.id === id);
    if (existing) {
      const updated = state.deliveryItems.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setState({ ...state, deliveryItems: updated });
    } else {
      setState({ ...state, deliveryItems: [...state.deliveryItems, { id, name, price, quantity: 1 }] });
    }
  };

  const handleRemoveMeal = (id: string) => {
    const updated = state.deliveryItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0);
    setState({ ...state, deliveryItems: updated });
  };

  const deliveryTotal = state.deliveryItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Structured messages generated dynamically
  const broodMessage = `¡Hola Brood! Quiero agendar mi turno:\n✂️ Servicio: ${state.barberService}\n📅 Día: ${state.barberDate}\n⏰ Horario: ${state.barberTime}\n👤 Nombre: ${state.barberName || "Cliente"}\n\nEnviado desde el sistema automatizado de SC Software.`;

  const caroMessage = `¡Hola Lo de Caro! 🍔 Pedido:\n${state.deliveryItems.map(item => `*${item.quantity}x ${item.name}* ($${item.price * item.quantity})`).join("\n")}\n\n📍 Envío a: ${state.deliveryAddress}\n💳 Pago: Transferencia\n💰 Total: $${deliveryTotal}\n\nEnviado desde el catálogo express SC Software.`;

  const tenisMessage = `¡Hola Tenistuc! Quiero reservar cancha:\n🎾 Cancha: ${state.tenisCourt}\n📅 Día: ${state.tenisDate}\n⏰ Horario: ${state.tenisTime}\n\n¿Me confirman CBU para señar? Gracias.`;

  const currentMessage = activeTab === "brood" ? broodMessage : activeTab === "caro" ? caroMessage : tenisMessage;

  const simulateSubmit = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <section id="casos" className="py-24 border-t border-brand-border bg-[#0d0d0d] relative overflow-hidden">
      <div className="absolute top-1/4 right-[5%] w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-gold/20 bg-brand-gold/5 rounded-full text-xs text-brand-gold font-mono uppercase tracking-wider mb-4">
            <Sparkles size={12} />
            Casos Reales y Prototipos
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-white mt-1 mb-4 uppercase">
            SISTEMAS EN <span className="text-brand-gold">ACCIÓN CONTINUA</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm md:text-base italic">
            No imagines cómo funciona. Hace clic en las marcas locales y simula el proceso exacto que sus clientes usan en Tucumán para comprar o agendar en segundos.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-col sm:flex-row justify-center items-stretch gap-2 mb-12 max-w-3xl mx-auto">
          <button
            onClick={() => { setActiveTab("brood"); setCopied(false); }}
            className={`px-4 py-4 border text-sm font-sans flex flex-1 items-center justify-center gap-3 transition-all duration-300 rounded-xl cursor-pointer ${
              activeTab === "brood"
                ? "bg-brand-gold text-brand-black border-brand-gold font-extrabold uppercase tracking-tighter shadow-md shadow-brand-gold/10"
                : "bg-neutral-900 border-brand-border text-gray-400 hover:text-white hover:border-brand-gold/40 font-bold uppercase tracking-tighter"
            }`}
          >
            <Calendar size={16} />
            <div className="text-left">
              <div className="text-xs font-mono font-medium leading-none">SISTEMA DE TURNOS</div>
              <div className="text-base font-sans font-extrabold mt-1">Brood Barber Shop</div>
            </div>
          </button>

          <button
            onClick={() => { setActiveTab("caro"); setCopied(false); }}
            className={`px-4 py-4 border text-sm font-sans flex flex-1 items-center justify-center gap-3 transition-all duration-300 rounded-xl cursor-pointer ${
              activeTab === "caro"
                ? "bg-brand-gold text-brand-black border-brand-gold font-extrabold uppercase tracking-tighter shadow-md shadow-brand-gold/10"
                : "bg-neutral-900 border-brand-border text-gray-400 hover:text-white hover:border-brand-gold/40 font-bold uppercase tracking-tighter"
            }`}
          >
            <ShoppingCart size={16} />
            <div className="text-left">
              <div className="text-xs font-mono font-medium leading-none">DELIVERY AUTOMÁTICO</div>
              <div className="text-base font-sans font-extrabold mt-1">Lo de Caro Sándwiches</div>
            </div>
          </button>

          <button
            onClick={() => { setActiveTab("tenistuc"); setCopied(false); }}
            className={`px-4 py-4 border text-sm font-sans flex flex-1 items-center justify-center gap-3 transition-all duration-300 rounded-xl cursor-pointer ${
              activeTab === "tenistuc"
                ? "bg-brand-gold text-brand-black border-brand-gold font-extrabold uppercase tracking-tighter shadow-md shadow-brand-gold/10"
                : "bg-neutral-900 border-brand-border text-gray-400 hover:text-white hover:border-brand-gold/40 font-bold uppercase tracking-tighter"
            }`}
          >
            <Activity size={16} />
            <div className="text-left">
              <div className="text-xs font-mono font-medium leading-none"> RESERVAS DEPORTIVAS</div>
              <div className="text-base font-sans font-extrabold mt-1">Tenistuc Complejo</div>
            </div>
          </button>
        </div>

        {/* Playground Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: UI Simulation interface (7 Cols) */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 bg-brand-gold/10 border-r border-b border-brand-gold/20 text-brand-gold text-[10px] font-mono font-bold px-3 py-1 uppercase tracking-wider">
              CLIENTE SIMULADO (WEB INTEGRADA)
            </div>

            <div className="mt-6 flex-grow flex flex-col justify-center">
              <AnimatePresence mode="wait">
                
                {/* Brood Barber Simulation */}
                {activeTab === "brood" && (
                  <motion.div
                    key="brood"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-xs font-mono text-brand-gold uppercase tracking-wider">Paso 1: Elige el servicio</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                        {["Corte Tradicional ($8.000)", "Corte + Barba ($11.000)", "Perfilado de Cejas ($3.000)"].map((serv) => (
                          <button
                            key={serv}
                            onClick={() => handleBarberService(serv)}
                            className={`p-3 text-xs font-sans text-center border cursor-pointer transition-all duration-200 rounded-xl ${
                              state.barberService === serv
                                ? "border-brand-gold bg-brand-gold/10 text-white font-medium"
                                : "border-brand-border text-gray-400 hover:border-neutral-700"
                            }`}
                          >
                            {serv}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-mono text-brand-gold uppercase tracking-wider">Paso 2: Día y Horario</span>
                      <div className="flex gap-2 mt-2">
                        {["Hoy", "Mañana", "Sábado"].map((d) => (
                          <button
                            key={d}
                            onClick={() => handleBarberDate(d)}
                            className={`px-4 py-2 text-xs font-sans border cursor-pointer transition-all duration-200 rounded-xl flex-1 ${
                              state.barberDate === d
                                ? "border-brand-gold bg-brand-gold/10 text-white"
                                : "border-brand-border text-gray-400 hover:border-neutral-700"
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {["10:00 hs", "15:30 hs", "17:30 hs", "20:00 hs"].map((t) => (
                          <button
                            key={t}
                            onClick={() => handleBarberTime(t)}
                            className={`p-2 text-xs font-mono border cursor-pointer transition-all duration-200 rounded-xl ${
                              state.barberTime === t
                                ? "border-brand-gold bg-brand-gold/10 text-white font-bold"
                                : "border-brand-border text-gray-400 hover:border-neutral-700"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-mono text-brand-gold uppercase tracking-wider">Paso 3: Tu Nombre</span>
                      <input
                        type="text"
                        placeholder="Ej. Santiago Cabral"
                        value={state.barberName}
                        onChange={(e) => setState({ ...state, barberName: e.target.value })}
                        className="w-full bg-[#0A0A0A] border border-brand-border p-3 text-sm text-white focus:outline-none focus:border-brand-gold mt-2 rounded-xl font-sans"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Lo de Caro Simulation */}
                {activeTab === "caro" && (
                  <motion.div
                    key="caro"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-xs font-mono text-brand-gold uppercase tracking-widerBlock">Menú Interactivo Express</span>
                      <div className="space-y-2 mt-2">
                        {[
                          { id: "mila", name: "Sánguche Mila Completo", price: 9500 },
                          { id: "combo", name: "Hamburguesa Caro Doble + Papas", price: 11000 },
                          { id: "papas", name: "Papas Fritas Grandes", price: 4500 }
                        ].map((meal) => {
                          const qty = state.deliveryItems.find(item => item.id === meal.id)?.quantity || 0;
                          return (
                            <div key={meal.id} className="flex justify-between items-center bg-[#0d0d0d] border border-brand-border px-4 py-3 rounded-xl">
                              <div>
                                <h4 className="text-xs font-sans font-bold text-white">{meal.name}</h4>
                                <p className="text-xs text-brand-gold font-mono mt-0.5">${meal.price.toLocaleString("es-AR")}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                {qty > 0 && (
                                  <>
                                    <button
                                      onClick={() => handleRemoveMeal(meal.id)}
                                      className="w-7 h-7 bg-neutral-900 border border-brand-border text-gray-300 font-bold font-mono hover:text-brand-gold hover:border-brand-gold transition duration-200 rounded-xl cursor-pointer"
                                    >
                                      -
                                    </button>
                                    <span className="font-mono text-xs font-bold text-white w-4 text-center">{qty}</span>
                                  </>
                                )}
                                <button
                                  onClick={() => handleAddMeal(meal.id, meal.name, meal.price)}
                                  className="px-3 py-1 bg-[#161616] border border-brand-border hover:border-brand-gold hover:text-white transition duration-200 text-xs font-sans text-brand-gold font-bold rounded-xl cursor-pointer"
                                >
                                  + Añadir
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-mono text-brand-gold uppercase tracking-wider block">Dirección de Entrega</span>
                      <input
                        type="text"
                        placeholder="Dirección, Barrio y Ciudad (Ej: Av. Avellaneda 410, Yerba Buena)"
                        value={state.deliveryAddress}
                        onChange={(e) => setState({ ...state, deliveryAddress: e.target.value })}
                        className="w-full bg-[#0A0A0A] border border-brand-border p-3 text-xs text-white focus:outline-none focus:border-brand-gold mt-2 rounded-xl font-sans"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Tenistuc Simulation */}
                {activeTab === "tenistuc" && (
                  <motion.div
                    key="tenistuc"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-xs font-mono text-brand-gold uppercase tracking-wider">Selecciona la Cancha</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {["Cancha Polvo de Ladrillo 1", "Cancha Polvo de Ladrillo 2", "Cancha Rápida de Cemento 3"].map((court) => (
                          <button
                            key={court}
                            onClick={() => setState({ ...state, tenisCourt: court })}
                            className={`p-3 text-xs font-sans text-left border cursor-pointer transition-all duration-200 rounded-xl ${
                              state.tenisCourt === court
                                ? "border-brand-gold bg-brand-gold/10 text-white font-medium"
                                : "border-brand-border text-gray-400 hover:border-neutral-700"
                            }`}
                          >
                            {court}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-mono text-brand-gold uppercase tracking-wider">Elige el Turno (60 min)</span>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {["Hoy", "Mañana", "Viernes"].map((d) => (
                          <button
                            key={d}
                            onClick={() => setState({ ...state, tenisDate: d })}
                            className={`p-2 text-xs font-sans border cursor-pointer transition-all duration-200 rounded-xl ${
                              state.tenisDate === d
                                ? "border-brand-gold bg-brand-gold/10 text-white"
                                : "border-brand-border text-gray-400 hover:border-neutral-700"
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                        {[
                          "14:30 hs (Día - Sin Luces)",
                          "18:00 hs (Tarde - Opcional)",
                          "21:30 hs (Noche - Con Luces)"
                        ].map((time) => (
                          <button
                            key={time}
                            onClick={() => setState({ ...state, tenisTime: time })}
                            className={`p-3 text-[11px] font-sans border cursor-pointer transition-all duration-200 rounded-xl ${
                              state.tenisTime === time
                                ? "border-brand-gold bg-brand-gold/10 text-white font-bold"
                                : "border-brand-border text-gray-400 hover:border-neutral-700"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            <div className="mt-8 pt-4 border-t border-brand-border/40 flex items-center justify-between text-xs text-gray-500 font-mono">
              <span>ESTADO DE CARGA: CONEXIÓN ACTIVA</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> ONLINE</span>
            </div>

          </div>

          {/* Right Panel: Simulated smartphone/WhatsApp result (5 Cols) */}
          <div className="lg:col-span-5 bg-black border-2 border-brand-gold p-6 rounded-lg flex flex-col justify-between relative shadow-2xl">
            {/* Header / Brand identity of phone view */}
            <div className="border-b border-brand-border pb-4 mb-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-neutral-900 border border-brand-border rounded-full flex items-center justify-center font-bold text-sm text-brand-gold">
                {activeTab === "brood" ? "BB" : activeTab === "caro" ? "LC" : "TT"}
              </div>
              <div>
                <h4 className="text-sm font-sans font-bold text-white">
                  {activeTab === "brood" ? "Brood Barber Shop 📱" : activeTab === "caro" ? "Lo de Caro ✨" : "Tenistuc Oficial 🎾"}
                </h4>
                <p className="text-[10px] font-mono text-green-400">Asistente Virtual Automatizado</p>
              </div>
            </div>

            {/* Simulated chat container */}
            <div className="flex-grow flex flex-col justify-end min-h-[220px] mb-6">
              <div className="space-y-4">
                {/* Outgoing Message block (user payload) */}
                <div className="self-end ml-12 bg-[#005c4b] text-white p-3 rounded-lg text-xs leading-relaxed font-sans relative">
                  <span className="text-[9px] font-mono text-[#aebac1] block mb-1">MÉTODO DE ENTRADA WEB</span>
                  {/* Preserve line breaks for gorgeous display */}
                  <span className="whitespace-pre-wrap">{currentMessage}</span>
                  <div className="absolute top-2 right-[-6px] border-l-[6px] border-l-[#005c4b] border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
                </div>

                {/* Auto Reply Incoming Block */}
                <div className="mr-12 bg-[#202c33] text-white p-3 rounded-lg text-xs leading-relaxed font-sans relative self-start">
                  <span className="text-[9px] font-mono text-brand-gold block mb-1">RESPUESTA AUTÓNOMA SC BOT</span>
                  {activeTab === "brood" && (
                    <p>¡Confirmado con éxito, {state.barberName || "Santi"}! Reservado tu turno para el *{state.barberDate}* a las *{state.barberTime}* con Matias. Se agendó automáticamente en nuestro sistema y te enviamos el recordatorio 2 horas antes. ¡Te esperamos!</p>
                  )}
                  {activeTab === "caro" && (
                    <p>🍔 ¡Pedido Recibido! Total: *${deliveryTotal.toLocaleString("es-AR")}*. Ya generamos tu ticket y lo mandamos a la cocina para despachar a *{state.deliveryAddress}*. Adjuntamos CBU para abonar por transferencia. ¡Muchas gracias!</p>
                  )}
                  {activeTab === "tenistuc" && (
                    <p>🎾 ¡Turno reservado, deportista! Bloqueado el horario *{state.tenisTime}* en la *{state.tenisCourt}*. Tenés 15 minutos para enviar el comprobante de la seña al CBU: 000000310008453489. ¡Listo para jugar!</p>
                  )}
                  <div className="absolute top-2 left-[-6px] border-r-[6px] border-r-[#202c33] border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
                </div>
              </div>
            </div>

            {/* Action launcher */}
            <div>
              <button
                onClick={simulateSubmit}
                className={`w-full py-4 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 rounded-xl cursor-pointer flex items-center justify-center gap-2 ${
                  copied 
                    ? "bg-green-700 text-white border border-green-700"
                    : "bg-brand-gold text-brand-black hover:bg-brand-gold-hover"
                }`}
              >
                {copied ? (
                  <>
                    <CheckCircle2 size={14} /> SIMULACIÓN EXITOSA
                  </>
                ) : (
                  <>
                    <Send size={12} /> PROBAR SIMULACIÓN EN TIEMPO REAL
                  </>
                )}
              </button>
              <p className="text-center text-[10px] text-gray-500 font-sans mt-2.5">
                *Simulación conceptual. En producción, el cliente es redirigido con su mensaje listo directamente a su Whatsapp corporativo principal.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
