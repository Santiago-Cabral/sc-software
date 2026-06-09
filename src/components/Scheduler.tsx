import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Phone, ArrowRight, CornerDownRight, Check, Loader2, Award, ShieldAlert } from "lucide-react";
import { BookingFormState } from "../types";

export default function SchedulerSection() {
  const [form, setForm] = useState<BookingFormState>({
    businessName: "",
    niche: "Gastronomía",
    interestService: "Web/Tienda Online",
    contactName: "",
    phone: "",
    selectedDate: "Mañana (Miércoles 27/05)",
    selectedTime: "10:30 hs",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadStep, setLoadStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const steps = [
    "Verificando cupos de diagnóstico gratis...",
    "Estructurando propuesta para el rubro " + form.niche + "...",
    "Preparando simulación técnica para " + (form.businessName || "tu negocio") + "...",
    "Generando enlace seguro hacia WhatsApp..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setIsLoading(false);
            setIsSuccess(true);
            return prev;
          }
        });
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isLoading, form.niche, form.businessName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.businessName || !form.contactName || !form.phone) {
      alert("Por favor completa los campos principales para poder generar tu diagnóstico personalizado.");
      return;
    }
    setLoadStep(0);
    setIsLoading(true);
  };

  // Build the WhatsApp api link pre-filled with the customer session details!
  const whatsappNumber = "543815502176"; // Representative team contact
  const messageText = `¡Hola SC Software! Acabo de reservar mi Diagnóstico de Automatización Gratis desde la web:
🏢 Negocio: ${form.businessName}
💼 Rubro: ${form.niche}
🎯 Interés: ${form.interestService}
👤 Contacto: ${form.contactName}
📞 WhatsApp: ${form.phone}
📅 Fecha elegida: ${form.selectedDate}
⏰ Horario elegido: ${form.selectedTime}

Quiero confirmar la sesión online para analizar mis fugas de WhatsApp. ¡Gracias!`;

  const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(messageText)}`;

  return (
    <section id="agendar" className="py-24 border-t border-brand-border bg-gradient-to-b from-[#0A0A0A] to-neutral-950 relative overflow-hidden">
      
      {/* Absolute decorative items */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-neutral-900/40 pointer-events-none hidden md:block"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column: The B2B value proposition (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-gold/20 bg-brand-gold/5 rounded-full text-xs text-brand-gold font-mono uppercase tracking-wider">
              <Phone size={12} />
              Diagnóstico 100% Sin Costo
            </div>
            
            <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-white leading-tight uppercase">
              FRENA HOY LA FILTRACIÓN DE CLIENTES
            </h2>
            
            <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed italic">
              Reserva una sesión online de 30 minutos sin costo con nuestro equipo técnico. Analizaremos tu operación de ventas en WhatsApp, mediremos el tiempo perdido de tus colaboradores y te daremos una hoja de ruta con la automatización recomendada.
            </p>

            <div className="space-y-4 pt-4 border-t border-brand-border/40">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-brand-gold/10 text-brand-gold rounded-xl mt-0.5">
                  <Check size={14} className="stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-bold text-white">Análisis de Fuga Comercial</h4>
                  <p className="text-xs text-gray-500 font-sans">Detectamos exactamente dónde estás perdiendo ventas de clientes desatendidos.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 bg-brand-gold/10 text-brand-gold rounded-xl mt-0.5">
                  <Check size={14} className="stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-bold text-white">Demostración Técnica</h4>
                  <p className="text-xs text-gray-500 font-sans">Aprende cómo sincronizar tu stock u horarios con un bot natural e inteligente.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 bg-brand-gold/10 text-brand-gold rounded-xl mt-0.5">
                  <Check size={14} className="stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-bold text-white">Cupos semanalmente limitados</h4>
                  <p className="text-xs text-gray-500 font-sans">Otorgamos únicamente 5 diagnósticos gratuitos semanales para dar prioridad a proyectos locales.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-brand-gold/5 border border-brand-gold/20 p-4 rounded-xl">
              <ShieldAlert size={18} className="text-brand-gold shrink-0" />
              <span className="text-xs text-gray-300 font-sans">Ninguna obligación de compra. Solo valor operativo real para aplicar en Tucumán.</span>
            </div>
          </div>

          {/* Right Column: Interactive Step Scheduler Form (7 Cols) */}
          <div className="lg:col-span-7">
            
            <div className="glass-card border-2 border-brand-gold rounded-xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand-gold"></div>
              
              <AnimatePresence mode="wait">
                
                {/* Loader State */}
                {isLoading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="min-h-[350px] flex flex-col justify-center items-center text-center space-y-6"
                  >
                    <Loader2 size={44} className="text-brand-gold animate-spin" />
                    <div className="space-y-2">
                      <h4 className="text-lg font-sans font-bold text-white">Procesando Lead y Reserva</h4>
                      <p className="text-sm text-brand-gold font-mono h-6 animate-pulse">
                        {steps[loadStep]}
                      </p>
                    </div>
                    <div className="w-48 h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-gold transition-all duration-300" 
                        style={{ width: `${((loadStep + 1) / steps.length) * 100}%` }}
                      ></div>
                    </div>
                  </motion.div>
                )}

                {/* Success State */}
                {isSuccess && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="min-h-[350px] flex flex-col justify-between"
                  >
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-brand-gold/10 border border-brand-gold text-brand-gold rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check size={32} className="stroke-[3]" />
                      </div>
                      <h3 className="text-2xl font-sans font-bold text-white">¡Diagnóstico Solicitado con Éxito!</h3>
                      <p className="text-sm text-gray-400 font-sans max-w-sm mx-auto leading-relaxed">
                        Excelente decisión, <strong className="text-white">{form.contactName}</strong>. Hemos pre-bloqueado tu espacio para <span className="text-brand-gold font-mono">{form.selectedDate}</span> a las <span className="text-brand-gold font-mono">{form.selectedTime}</span>.
                      </p>
                    </div>

                    <div className="bg-neutral-950 border border-brand-border p-4 rounded-xl my-6 space-y-2 text-left text-xs font-mono">
                      <div className="flex justify-between border-b border-brand-border/60 pb-2">
                        <span className="text-gray-500">NEGOCIO:</span>
                        <span className="text-white font-bold">{form.businessName}</span>
                      </div>
                      <div className="flex justify-between border-b border-brand-border/60 pb-2">
                        <span className="text-gray-500">RUBRO COMERCIAL:</span>
                        <span className="text-white">{form.niche}</span>
                      </div>
                      <div className="flex justify-between border-b border-brand-border/60 pb-2">
                        <span className="text-gray-500">FECHA PRE-RESERVADA:</span>
                        <span className="text-brand-gold font-bold">{form.selectedDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">HORARIO PRE-RESERVADO:</span>
                        <span className="text-brand-gold font-bold">{form.selectedTime}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full inline-flex justify-center items-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-900/15 cursor-pointer text-center"
                      >
                        Enviar confirmación directa por WhatsApp
                        <ArrowRight size={14} />
                      </a>
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="w-full text-center text-xs text-gray-500 hover:text-white transition duration-200 mt-2 hover:underline cursor-pointer"
                      >
                        Volver a editar el formulario
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Form Inputs State */}
                {!isLoading && !isSuccess && (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="border-b border-brand-border/60 pb-4 mb-4">
                      <h3 className="text-lg font-sans font-bold text-white flex items-center gap-2">
                        <Calendar size={18} className="text-brand-gold" />
                        Agendá tu Diagnóstico Gratis
                      </h3>
                      <p className="text-xs text-gray-500 font-sans mt-0.5">Completa los datos para iniciar el escaneo de tus procesos comerciales.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name Of Business */}
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1.5">Nombre de tu Negocio / Marca *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: Lo de Caro"
                          value={form.businessName}
                          onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                          className="w-full bg-[#0A0A0A] border border-brand-border p-3 text-sm text-white focus:outline-none focus:border-brand-gold rounded-xl transition font-sans"
                        />
                      </div>

                      {/* Rubro Niche Selector */}
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1.5">Rubro / Sector Comercial</label>
                        <select
                          value={form.niche}
                          onChange={(e) => setForm({ ...form, niche: e.target.value })}
                          className="w-full bg-[#0A0A0A] border border-brand-border p-3 text-sm text-gray-300 focus:outline-none focus:border-brand-gold rounded-xl transition font-sans cursor-pointer"
                        >
                          <option value="Gastronomía">Gastronomía</option>
                          <option value="Barbería / Estética">Estética / Salon</option>
                          <option value="Comercio Minorista">Comercio Minorista / Tienda</option>
                          <option value="Canchas de Deportes">Canchas Deportivas</option>
                          <option value="Servicios Profesionales">Servicios Profesionales</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Interest Service Selector */}
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1.5">Servicio de Interés Principal</label>
                        <select
                          value={form.interestService}
                          onChange={(e) => setForm({ ...form, interestService: e.target.value })}
                          className="w-full bg-[#0A0A0A] border border-brand-border p-3 text-sm text-gray-300 focus:outline-none focus:border-brand-gold rounded-xl transition font-sans cursor-pointer"
                        >
                          <option value="Web/Tienda Online">Web/Tienda Online</option>
                          <option value="Sistema de gestión">Sistema de gestión</option>
                          <option value="Bot de WhatsApp">Bot de WhatsApp</option>
                          <option value="Diagnóstico general">Diagnóstico general</option>
                        </select>
                      </div>

                      {/* Contact Name */}
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1.5 font-bold">Tu Nombre de Contacto *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: Marcelo Cabral"
                          value={form.contactName}
                          onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                          className="w-full bg-[#0A0A0A] border border-brand-border p-3 text-sm text-white focus:outline-none focus:border-brand-gold rounded-xl transition font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {/* Phone WhatsApp */}
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1.5 font-bold">WhatsApp de Contacto *</label>
                        <input
                          type="tel"
                          required
                          placeholder="Ej: +54 381 555-1212"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full bg-[#0A0A0A] border border-brand-border p-3 text-sm text-white focus:outline-none focus:border-brand-gold rounded-xl transition font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-brand-border/60">
                      {/* Booking Slot Date */}
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1.5">Día Sugerido</label>
                        <select
                          value={form.selectedDate}
                          onChange={(e) => setForm({ ...form, selectedDate: e.target.value })}
                          className="w-full bg-[#0A0A0A] border border-brand-border p-3 text-sm text-gray-300 focus:outline-none focus:border-brand-gold rounded-xl transition font-sans cursor-pointer"
                        >
                          <option value="Mañana (Miércoles 27/05)">Mañana (Miércoles 27/05)</option>
                          <option value="Jueves 28/05">Jueves 28/05</option>
                          <option value="Viernes 29/05">Viernes 29/05</option>
                          <option value="Lunes 01/06 (Siguiente Hábil)">Lunes 01/06 (Hábiles)</option>
                        </select>
                      </div>

                      {/* Booking Slot Time */}
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1.5">Horarios Disponibles</label>
                        <select
                          value={form.selectedTime}
                          onChange={(e) => setForm({ ...form, selectedTime: e.target.value })}
                          className="w-full bg-[#0A0A0A] border border-brand-border p-3 text-sm text-gray-300 focus:outline-none focus:border-brand-gold rounded-xl transition font-sans cursor-pointer"
                        >
                          <option value="09:30 hs">09:30 hs (Mañana)</option>
                          <option value="10:30 hs">10:30 hs (Recomendado)</option>
                          <option value="15:00 hs">15:00 hs (Tarde)</option>
                          <option value="17:30 hs">17:30 hs (Tarde-noche)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center items-center gap-2 px-6 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-black hover:brightness-110 transition-all duration-300 font-sans font-extrabold text-xs uppercase tracking-tighter rounded-xl cursor-pointer"
                      >
                        Generar diagnóstico de automatización gratis
                        <ArrowRight size={14} />
                      </button>
                    </div>

                    <div className="flex justify-center items-center gap-4 text-[10px] text-gray-500 font-sans text-center">
                      <span className="flex items-center gap-1"><Award size={12} className="text-brand-gold" /> Certificación de Seguridad 256bits</span>
                      <span>●</span>
                      <span>Enlace cifrado a SSL</span>
                    </div>

                  </motion.form>
                )}

              </AnimatePresence>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
