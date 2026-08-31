import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createClient } from "@supabase/supabase-js";
import {
  Globe,
  MessageCircle,
  Server,
  Scan,
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  Sparkles,
  ChevronRight,
  Zap,
} from "lucide-react";
import { animate, stagger } from "animejs";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "543815502176";

const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

type ServiceType = "web" | "whatsapp" | "system" | "diagnostic";

const SERVICES: {
  key: ServiceType;
  label: string;
  short: string;
  icon: React.ReactNode;
  desc: string;
  features: string[];
}[] = [
  {
    key: "web",
    label: "Web / Tienda Online",
    short: "Web",
    icon: <Globe size={28} />,
    desc: "Sitios premium y tiendas para vender 24/7 sin comisiones.",
    features: ["Diseño responsivo", "Catálogo completo", "Pago integrado"],
  },
  {
    key: "whatsapp",
    label: "Bot de WhatsApp",
    short: "Bot",
    icon: <MessageCircle size={28} />,
    desc: "Agente virtual que responde, agenda y cobra por WhatsApp.",
    features: ["Respuesta automática", "Agendamiento smart", "Cartera de clientes"],
  },
  {
    key: "system",
    label: "Sistema a Medida",
    short: "Sistema",
    icon: <Server size={28} />,
    desc: "Gestión de stock, caja, ventas y clientes personalizada.",
    features: ["Control de stock", "Caja y ventas", "Informes en tiempo real"],
  },
  {
    key: "diagnostic",
    label: "Diagnóstico Express",
    short: "Diagnóstico",
    icon: <Scan size={28} />,
    desc: "Analizamos tu negocio y te entregamos un plan de acción.",
    features: ["Auditoría gratis", "Plan de acción", "Sin compromiso"],
  },
];

const INTEREST_OPTIONS = [
  { key: "gastronomia", label: "Gastronomía" },
  { key: "estetica", label: "Estética / Barbería" },
  { key: "comercio", label: "Comercio / Retail" },
  { key: "servicios", label: "Servicios Profesionales" },
  { key: "deportes", label: "Deportes / Instalaciones" },
  { key: "otros", label: "Otro Rubro" },
];

interface FormData {
  service: ServiceType | null;
  businessName: string;
  contactName: string;
  phone: string;
  niche: string;
}

type Step = 0 | 1 | 2 | 3;

function isValidStep(step: Step, data: FormData): boolean {
  switch (step) {
    case 0:
      return data.service !== null;
    case 1:
      return data.businessName.trim().length > 0 && data.contactName.trim().length > 0 && data.phone.trim().length > 0;
    default:
      return true;
  }
}

function buildWhatsAppMessage(data: FormData): string {
  const serviceLabel = SERVICES.find((s) => s.key === data.service)?.label ?? "Consulta general";
  const nicheLabel = INTEREST_OPTIONS.find((o) => o.key === data.niche)?.label ?? data.niche;
  return `🔔 *Nuevo Lead - Carga Rápida SC Software* 🔔

👤 *Contacto:* ${data.contactName}
🏢 *Negocio:* ${data.businessName}
💼 *Rubro:* ${nicheLabel}
🎯 *Servicio:* ${serviceLabel}
📞 *WhatsApp:* ${data.phone}

_*Consulta generada desde la web*`;
}

function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("549")) return cleaned;
  if (cleaned.startsWith("54")) return cleaned;
  if (cleaned.startsWith("381")) return `54${cleaned}`;
  return `54${cleaned}`;
}

export default function ClientDataUpload() {
  const [step, setStep] = useState<Step>(0);
  const [data, setData] = useState<FormData>({
    service: null,
    businessName: "",
    contactName: "",
    phone: "",
    niche: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dbError, setDbError] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll<HTMLElement>("[data-upload-card]");
    if (cards) {
      animate(cards, {
        opacity: [0, 1],
        translateY: [24, 0],
        delay: stagger(80, { start: 100 }),
        duration: 500,
        easing: "easeOutBack",
      });
    }
  }, [step]);

  const canProceed = isValidStep(step, data);

  const handleSelectService = useCallback((key: ServiceType) => {
    setData((prev) => ({ ...prev, service: key }));
    setErrors((prev) => ({ ...prev, service: undefined }));
  }, []);

  const handleNicheSelect = useCallback((niche: string) => {
    setData((prev) => ({ ...prev, niche }));
  }, []);

  const handleFieldChange = useCallback(
    (field: keyof FormData, value: string) => {
      setData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  const handleNext = () => {
    if (!canProceed) return;
    setStep((prev) => Math.min(prev + 1, 3) as Step);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0) as Step);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setDbError(false);

    const phone = formatPhone(data.phone);
    const msg = buildWhatsAppMessage(data);
    const link = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`;
    setWhatsappLink(link);

    if (supabase) {
      try {
        const serviceLabel = SERVICES.find((s) => s.key === data.service)?.label ?? "Consulta general";
        const nicheLabel = INTEREST_OPTIONS.find((o) => o.key === data.niche)?.label ?? data.niche;

        const { error } = await supabase.from("leads").insert([
          {
            nombre: `${data.contactName} (${data.businessName})`,
            telefono: phone,
            direccion: null,
            web: data.service === "web" ? "Solicitado" : null,
            rubro: nicheLabel,
            ciudad: "Tucumán",
            etapa: "nuevo",
            prioridad: "media",
            temperatura: null,
            source: "sc-software-carga-datos",
            tiene_web: data.service === "web",
            observaciones: `Lead generado desde web - Servicio: ${serviceLabel} | Rubro: ${nicheLabel}`,
          },
        ]);

        if (error) {
          console.error("Supabase insert error:", error);
          setDbError(true);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setDbError(true);
      }
    } else {
      setDbError(true);
    }

    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const stepLabels = ["Elegí tu necesidad", "Tus datos", "Rubro", "Confirmar"];

  return (
    <section ref={sectionRef} id="cargar-datos" className="py-24 border-t border-brand-border bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-brand-gold/20 bg-brand-gold/5 rounded-full text-xs font-mono font-bold tracking-widest text-brand-gold uppercase mb-5">
            <Zap size={14} className="animate-pulse" />
            Carga Rápida de Datos
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tighter text-white mb-4">
            Empezamos sin {"'"}formulario
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
            Seleccioná, completá y enviá. En minutos tu diagnóstico está listo. Sin carga excesiva, sin fricción.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-12">
          {stepLabels.map((label, i) => {
            const isActive = i === step;
            const isComplete = i < step;
            return (
              <React.Fragment key={i}>
                <button
                  onClick={() => i < step && setStep(i as Step)}
                  disabled={i > step}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-mono transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-brand-gold/10 border-brand-gold/40 text-brand-gold"
                      : isComplete
                      ? "bg-brand-gold/5 border-brand-gold/20 text-brand-gold"
                      : "border-brand-border text-gray-600 cursor-default"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isComplete
                        ? "bg-brand-gold text-brand-black"
                        : isActive
                        ? "border-2 border-brand-gold text-brand-gold"
                        : "border border-gray-700 text-gray-600"
                    }`}
                  >
                    {isComplete ? <Check size={12} /> : i + 1}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
                {i < stepLabels.length - 1 && (
                  <div
                    className={`w-8 sm:w-16 h-[2px] rounded transition-colors duration-500 ${
                      i < step ? "bg-brand-gold" : "bg-brand-border"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="glass-card border-2 border-brand-gold/30 rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-gold via-brand-gold/50 to-transparent" />

          <AnimatePresence mode="wait">
            {isSuccess && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5 }}
                className="min-h-[320px] flex flex-col items-center justify-center text-center space-y-5"
              >
                <div className="w-20 h-20 bg-brand-gold/10 border border-brand-gold text-brand-gold rounded-full flex items-center justify-center">
                  <Check size={40} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-white uppercase tracking-tighter">
                    ¡Listo, {data.contactName}!
                  </h3>
                  <p className="text-gray-400 mt-2 font-light text-sm">
                    Tus datos se cargaron en el CRM y te enviamos el mensaje por WhatsApp.
                  </p>
                </div>

                {whatsappLink && (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-extrabold uppercase tracking-tighter rounded-xl transition-all duration-300 text-sm shadow-lg shadow-green-900/20"
                  >
                    <span className="text-xl">📱</span>
                    Abrir WhatsApp con el lead
                  </a>
                )}

                {dbError && (
                  <p className="text-xs text-amber-400 flex items-center gap-1 mt-2">
                    ⚠️ Hubo un problema al guardar en el CRM, pero tu mensaje de WhatsApp está listo.
                  </p>
                )}

                <a
                  href="#agendar"
                  className="inline-flex items-center gap-2 px-6 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-black font-extrabold uppercase tracking-tighter rounded-xl transition-all duration-300 text-sm"
                >
                  Agendá tu Diagnóstico
                  <ArrowRight size={16} />
                </a>
              </motion.div>
            )}

            {!isSuccess && (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {step === 0 && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="text-xl font-extrabold text-white uppercase tracking-tighter mb-2">
                        ¿Qué necesitás?
                      </h3>
                      <p className="text-gray-400 text-sm font-light">Elegí el servicio que se ajusta a tu negocio.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {SERVICES.map((svc) => {
                        const selected = data.service === svc.key;
                        return (
                          <motion.button
                            key={svc.key}
                            data-upload-card
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelectService(svc.key)}
                            className={`relative p-6 rounded-xl border text-left transition-all duration-300 cursor-pointer group ${
                              selected
                                ? "border-brand-gold bg-brand-gold/10 shadow-lg shadow-brand-gold/10"
                                : "border-brand-border bg-neutral-900/40 hover:border-brand-gold/40 hover:bg-neutral-800/60"
                            }`}
                          >
                            {selected && (
                              <div className="absolute top-3 right-3 w-6 h-6 bg-brand-gold rounded-full flex items-center justify-center">
                                <Check size={14} className="text-brand-black" strokeWidth={2.5} />
                              </div>
                            )}
                            <div
                              className={`p-3 rounded-xl mb-4 inline-block transition-colors duration-300 ${
                                selected ? "bg-brand-gold/20 text-brand-gold" : "bg-neutral-800 text-gray-400 group-hover:text-brand-gold"
                              }`}
                            >
                              {svc.icon}
                            </div>
                            <h4 className="text-base font-extrabold text-white uppercase tracking-tight mb-1">
                              {svc.label}
                            </h4>
                            <p className="text-sm text-gray-400 font-light leading-relaxed mb-3">{svc.desc}</p>
                            <ul className="space-y-1.5">
                              {svc.features.map((f) => (
                                <li key={f} className="text-xs text-gray-500 flex items-center gap-2">
                                  <ChevronRight size={12} className={selected ? "text-brand-gold" : "text-gray-700"} />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </motion.button>
                        );
                      })}
                    </div>

                    {errors.service && (
                      <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-400 flex items-center gap-1"
                      >
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                        {errors.service}
                      </motion.p>
                    )}
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-extrabold text-white uppercase tracking-tighter mb-2">
                        Tus datos de contacto
                      </h3>
                      <p className="text-gray-400 text-sm font-light">
                        Solo lo esencial para que podamos reacharte. Sin datos innecesarios.
                      </p>
                    </div>

                    <div className="space-y-5">
                      <div data-upload-card>
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-2">
                          Nombre de tu Negocio / Marca
                        </label>
                        <input
                          type="text"
                          value={data.businessName}
                          onChange={(e) => handleFieldChange("businessName", e.target.value)}
                          placeholder="Ej: Lo de Caro, Brood, etc."
                          className="w-full bg-[#0A0A0A] border border-brand-border p-4 text-sm text-white focus:outline-none focus:border-brand-gold rounded-xl transition font-sans placeholder:text-gray-600"
                        />
                        {errors.businessName && (
                          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-400 rounded-full" />
                            {errors.businessName}
                          </p>
                        )}
                      </div>

                      <div data-upload-card>
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-2">
                          Tu Nombre Completo
                        </label>
                        <input
                          type="text"
                          value={data.contactName}
                          onChange={(e) => handleFieldChange("contactName", e.target.value)}
                          placeholder="Ej: Marcelo Cabral"
                          className="w-full bg-[#0A0A0A] border border-brand-border p-4 text-sm text-white focus:outline-none focus:border-brand-gold rounded-xl transition font-sans placeholder:text-gray-600"
                        />
                        {errors.contactName && (
                          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-400 rounded-full" />
                            {errors.contactName}
                          </p>
                        )}
                      </div>

                      <div data-upload-card>
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-2">
                          WhatsApp de Contacto
                        </label>
                        <input
                          type="tel"
                          value={data.phone}
                          onChange={(e) => handleFieldChange("phone", e.target.value)}
                          placeholder="Ej: +54 381 555-1212"
                          className="w-full bg-[#0A0A0A] border border-brand-border p-4 text-sm text-white focus:outline-none focus:border-brand-gold rounded-xl transition font-sans placeholder:text-gray-600"
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-400 rounded-full" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-extrabold text-white uppercase tracking-tighter mb-2">
                        ¿A qué rubro pertenecés?
                      </h3>
                      <p className="text-gray-400 text-sm font-light">
                        Nos ayuda a entender tu negocio y armar la mejor solución.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3" data-upload-card>
                      {INTEREST_OPTIONS.map((opt) => {
                        const selected = data.niche === opt.key;
                        return (
                          <motion.button
                            key={opt.key}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleNicheSelect(opt.key)}
                            className={`px-5 py-3 rounded-xl border text-sm font-sans font-bold transition-all duration-300 cursor-pointer ${
                              selected
                                ? "bg-brand-gold/15 border-brand-gold/50 text-brand-gold shadow-md shadow-brand-gold/10"
                                : "bg-neutral-900/40 border-brand-border text-gray-400 hover:border-brand-gold/30 hover:text-gray-300"
                            }`}
                          >
                            {opt.label}
                          </motion.button>
                        );
                      })}
                    </div>

                    {data.niche && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-5 bg-brand-gold/5 border border-brand-gold/20 rounded-xl"
                      >
                        <p className="text-xs text-gray-400 font-light">
                          Seleccionaste:{" "}
                          <span className="text-brand-gold font-bold uppercase">
                            {INTEREST_OPTIONS.find((o) => o.key === data.niche)?.label}
                          </span>
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-extrabold text-white uppercase tracking-tighter mb-2">
                        Revisá tus datos
                      </h3>
                      <p className="text-gray-400 text-sm font-light">
                        Confirmá todo antes de enviar tu consulta.
                      </p>
                    </div>

                    <div className="space-y-4" data-upload-card>
                      {[
                        { label: "Servicio", value: SERVICES.find((s) => s.key === data.service)?.label ?? "-" },
                        { label: "Negocio", value: data.businessName || "-" },
                        { label: "Contacto", value: data.contactName || "-" },
                        { label: "WhatsApp", value: data.phone || "-" },
                        { label: "Rubro", value: INTEREST_OPTIONS.find((o) => o.key === data.niche)?.label ?? "-" },
                      ].map((row, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 bg-neutral-900/40 border border-brand-border/40 rounded-xl"
                        >
                          <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">{row.label}</span>
                          <span className="text-sm font-bold text-white">{row.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 bg-brand-gold/5 border border-brand-gold/20 rounded-xl flex items-start gap-3">
                      <Sparkles size={18} className="text-brand-gold shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-300 font-light leading-relaxed">
                        Recibirás un diagnóstico personalizado en menos de 24 horas. Sin costo y sin compromiso. Te contactaremos por WhatsApp al número que dejaste.
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!isSuccess && (
            <motion.div
              className="flex items-center justify-between mt-10 pt-6 border-t border-brand-border/40"
              key={`actions-${step}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <button
                onClick={handleBack}
                disabled={step === 0}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-sans font-bold transition-all duration-300 ${
                  step === 0
                    ? "border-brand-border text-gray-700 cursor-not-allowed"
                    : "border-brand-border text-gray-400 hover:border-brand-gold/40 hover:text-brand-gold cursor-pointer"
                }`}
              >
                <ArrowLeft size={16} />
                Anterior
              </button>

              {step < 3 ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-sans font-extrabold uppercase tracking-tighter transition-all duration-300 ${
                    canProceed
                      ? "bg-brand-gold hover:bg-brand-gold-hover text-brand-black hover:brightness-110 cursor-pointer shadow-lg shadow-brand-gold/20"
                      : "bg-neutral-900 border border-brand-border text-gray-600 cursor-not-allowed"
                  }`}
                >
                  Siguiente
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold hover:bg-brand-gold-hover text-brand-black hover:brightness-110 rounded-xl text-sm font-sans font-extrabold uppercase tracking-tighter transition-all duration-300 shadow-lg shadow-brand-gold/20 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Conectando CRM...
                    </>
                  ) : (
                    <>
                      Enviar Consulta
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              )}
            </motion.div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-[10px] font-mono text-gray-600 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Check size={12} className="text-brand-gold" />
            Sin costo
          </span>
          <span className="flex items-center gap-1.5">
            <Check size={12} className="text-brand-gold" />
            Sin compromiso
          </span>
          <span className="flex items-center gap-1.5">
            <Check size={12} className="text-brand-gold" />
            Respuesta en 24hs
          </span>
        </div>
      </div>
    </section>
  );
}