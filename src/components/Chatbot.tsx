import { useState, useRef, useEffect } from "react";

interface Message {
  role: "bot" | "user" | "typing";
  content: string;
}

interface QuickReply {
  text: string;
  actionId: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "¡Hola! 🧠 Soy SC Bot, tu asistente virtual. Estoy acá para resolver tus dudas al instante y ayudarte a automatizar tu negocio o crear tu software ideal. ¿En qué te puedo asesorar hoy?" }
  ]);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([
    { text: "💳 Métodos de pago y cuotas", actionId: "pagos" },
    { text: "⏱️ ¿Cuánto tardan en entregar?", actionId: "tiempos" },
    { text: "🛡️ ¿Hay garantía post-entrega?", actionId: "garantia" },
    { text: "💡 Quiero presupuestar una idea", actionId: "idea" },
    { text: "📞 Hablar con un desarrollador", actionId: "whatsapp_direct" }
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll automático al fondo cuando se agregan mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Pequeña notificación animada para el botón flotante después de unos segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = (text: string, actionId?: string) => {
    if (!text.trim()) return;

    // Agregar mensaje del usuario
    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Limpiar respuestas rápidas temporalmente mientras responde
    setQuickReplies([]);

    // Mostrar estado de "escribiendo..."
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "typing", content: "" }]);
    }, 300);

    // Responder según la selección
    setTimeout(() => {
      // Eliminar el "escribiendo..."
      setMessages((prev) => prev.filter((m) => m.role !== "typing"));

      let botReply = "";
      let nextReplies: QuickReply[] = [];

      switch (actionId) {
        case "pagos":
          botReply = "Ofrecemos total flexibilidad. Los desarrollos a medida se abonan con un **50% al inicio y 50% contra entrega** (cuando el sistema ya está testeado y listo para lanzarse). Aceptamos:\n\n• Transferencias bancarias en ARS (factura C)\n• Depósitos/USD en cuentas bancarias\n• PayPal, Payoneer o Wise para el exterior\n• Criptomonedas (USDT/BTC)\n\n¿Tenés algún proyecto en mente para cotizar?";
          nextReplies = [
            { text: "📊 Sí, calcular presupuesto en vivo", actionId: "calc_redirect" },
            { text: "🔄 Ver otros temas", actionId: "menu" }
          ];
          break;

        case "tiempos":
          botReply = "Nuestros plazos son súper ágiles porque trabajamos sin intermediarios y con metodología ágil. Tiempos promedio:\n\n• **Landing Page:** 3 a 5 días hábiles.\n• **Web Institucional / CRM / Mini-Sistema:** 2 a 3 semanas.\n• **Sistemas robustos a medida / Automatizaciones complejas:** 4 a 6 semanas.\n\nSiempre acordamos un cronograma de entregas antes de empezar. ¿Querés agilizar un desarrollo?";
          nextReplies = [
            { text: "🚀 Sí, cotizar una Landing rápida", actionId: "landing_express" },
            { text: "⚡ Sí, automatizar procesos", actionId: "auto_express" },
            { text: "🔄 Ver otros temas", actionId: "menu" }
          ];
          break;

        case "garantia":
          botReply = "¡Por supuesto! Todo software creado por SC Software incluye una **garantía absoluta libre de bugs por 30 días** posterior a la entrega. Si algo falla o no funciona como se pactó, lo resolvemos gratis en menos de 24 horas. Además, ofrecemos planes de soporte preventivo mensual para mantener tu servidor, base de datos y APIs actualizadas 24/7.";
          nextReplies = [
            { text: "🛠️ Ver planes de Soporte", actionId: "soporte_redirect" },
            { text: "🔄 Ver otros temas", actionId: "menu" }
          ];
          break;

        case "idea":
          botReply = "¡Espectacular! Nos encanta dar vida a ideas nuevas. Para darte el presupuesto perfecto, la mejor opción es tener una **llamada o chat rápido de 20 min gratis** para que nos cuentes los detalles técnicos y de negocio sin compromiso. ¿Cómo preferís avanzar?";
          nextReplies = [
            { text: "📞 Hablar por WhatsApp ahora", actionId: "whatsapp_direct" },
            { text: "💻 Usar Calculadora de Presupuestos", actionId: "calc_redirect" },
            { text: "🔄 Ver otros temas", actionId: "menu" }
          ];
          break;

        case "whatsapp_direct":
          botReply = "¡Perfecto! Hacé clic abajo para abrir un chat directo con nuestro desarrollador líder en WhatsApp. Te va a responder en minutos para coordinar una consulta gratis.";
          nextReplies = [
            { text: "💬 Abrir WhatsApp Directo", actionId: "wa_link_action" },
            { text: "🔄 Ver otros temas", actionId: "menu" }
          ];
          break;

        case "calc_redirect":
          botReply = "¡Genial! Podés deslizarte en la página hasta nuestra *Calculadora Interactiva de Presupuesto y ROI* para cotizar y simular tu ahorro en vivo. O bien, haz clic abajo para ir directamente.";
          nextReplies = [
            { text: "🔗 Ir a la Calculadora", actionId: "calc_scroll" },
            { text: "🔄 Ver otros temas", actionId: "menu" }
          ];
          break;

        case "soporte_redirect":
          botReply = "¡Excelente! Ofrecemos mantenimiento continuo para que no te preocupes de nada. Podés ver nuestros planes completos en la sección `/soporte` haciendo clic abajo.";
          nextReplies = [
            { text: "🔗 Ir a sección Soporte", actionId: "soporte_link" },
            { text: "🔄 Ver otros temas", actionId: "menu" }
          ];
          break;

        case "landing_express":
          window.open("https://wa.me/5493815502176?text=Hola!%20Quiero%20presupuestar%20una%20Landing%20Page%20rápida%20en%203-5%20días.", "_blank");
          botReply = "¡Te abrí una pestaña de WhatsApp directo para hablar sobre tu Landing express! ¿En qué más te puedo ayudar?";
          nextReplies = [
            { text: "🔄 Ver otros temas", actionId: "menu" }
          ];
          break;

        case "auto_express":
          window.open("https://wa.me/5493815502176?text=Hola!%20Quiero%20automatizar%20tareas%20de%20mi%20negocio%20con%20IA.", "_blank");
          botReply = "¡Te abrí una pestaña de WhatsApp para detallar tus automatizaciones con IA! ¿Tenés alguna otra duda?";
          nextReplies = [
            { text: "🔄 Ver otros temas", actionId: "menu" }
          ];
          break;

        case "wa_link_action":
          window.open("https://wa.me/5493815502176?text=Hola!%20Vengo%20del%20chat%20de%20la%20web,%20quiero%20hacerles%20una%20consulta%20directa.", "_blank");
          botReply = "¡Abriendo WhatsApp! Quedo a tu disposición por acá si querés consultar otra cosa.";
          nextReplies = [
            { text: "🔄 Ver otros temas", actionId: "menu" }
          ];
          break;

        case "calc_scroll":
          document.getElementById("calculadora")?.scrollIntoView({ behavior: "smooth" });
          botReply = "¡Te desplacé hasta la Calculadora de Presupuesto! ¿Qué te parece?";
          nextReplies = [
            { text: "🔄 Ver otros temas", actionId: "menu" }
          ];
          break;

        case "soporte_link":
          window.location.href = "/soporte";
          botReply = "¡Redirigiendo a soporte! Si no carga automáticamente, podés entrar a la ruta /soporte.";
          nextReplies = [
            { text: "🔄 Ver otros temas", actionId: "menu" }
          ];
          break;

        case "menu":
        default:
          botReply = "¡Entendido! Seleccioná la duda que quieras evacuar para que te ayude:";
          nextReplies = [
            { text: "💳 Métodos de pago y cuotas", actionId: "pagos" },
            { text: "⏱️ ¿Cuánto tardan en entregar?", actionId: "tiempos" },
            { text: "🛡️ ¿Hay garantía post-entrega?", actionId: "garantia" },
            { text: "💡 Quiero presupuestar una idea", actionId: "idea" },
            { text: "📞 Hablar con un desarrollador", actionId: "whatsapp_direct" }
          ];
          break;
      }

      setMessages((prev) => [...prev, { role: "bot", content: botReply }]);
      setQuickReplies(nextReplies);
    }, 1100);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userText = input;
    handleSend(userText, "custom_input");
    
    // Respuesta por defecto simulada inteligente
    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m.role !== "typing"));
      setMessages((prev) => [
        ...prev, 
        { 
          role: "bot", 
          content: "¡Excelente pregunta! Para darte una respuesta precisa y adaptada a tu caso puntual, te sugiero hablar 5 minutos directamente con nuestro equipo por WhatsApp. Hacé clic abajo para abrir un chat directo, o elegí otro tema del menú principal:" 
        }
      ]);
      setQuickReplies([
        { text: "💬 Abrir WhatsApp Directo", actionId: "wa_link_action" },
        { text: "🔄 Volver al Menú Principal", actionId: "menu" }
      ]);
    }, 2200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-body">
      
      {/* Botón Flotante con animaciones y badge */}
      <button 
        onClick={() => {
          setIsOpen(!isOpen);
          setShowNotification(false);
        }}
        className="w-14 h-14 rounded-full bg-[var(--accent)] text-[var(--bg)] flex items-center justify-center shadow-[0_8px_32px_rgba(0,229,255,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 relative cursor-pointer"
        title="Preguntas frecuentes & Asistencia"
      >
        {isOpen ? (
          <span className="text-xl font-bold">✕</span>
        ) : (
          <span className="text-2xl animate-bounce">💬</span>
        )}

        {/* Notificación de llamada a la acción */}
        {showNotification && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent3)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[var(--accent3)]"></span>
          </span>
        )}
      </button>

      {/* Caja del Chatbot con Glassmorphism */}
      {isOpen && (
        <div 
          className="absolute bottom-18 right-0 w-[350px] sm:w-[380px] h-[550px] border border-white/10 rounded-2xl flex flex-col shadow-[0_24px_64px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300"
          style={{ 
            background: "rgba(14, 19, 24, 0.96)",
            backdropFilter: "blur(20px)",
            animation: "fadeUp 0.3s cubic-bezier(0.22,1,0.36,1) both"
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] p-4 text-[var(--bg)] flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                🤖
              </div>
              <div>
                <div className="font-bold text-sm tracking-wide">Asistente SC Software</div>
                <div className="text-[10px] opacity-75 font-semibold flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent3)] animate-pulse" />
                  Activo para cotizar
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[var(--bg)] hover:opacity-60 transition-opacity text-sm font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m, i) => {
              const isBot = m.role === "bot";
              const isTyping = m.role === "typing";

              return (
                <div 
                  key={i} 
                  className={`flex gap-2.5 items-end max-w-[85%] ${
                    isBot || isTyping ? "" : "ml-auto flex-row-reverse"
                  }`}
                  style={{ animation: "fadeUp 0.3s ease both" }}
                >
                  {/* Avatar para bot */}
                  {(isBot || isTyping) && (
                    <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs shrink-0 select-none">
                      🤖
                    </div>
                  )}

                  {/* Contenedor del mensaje */}
                  {isTyping ? (
                    <div className="bg-white/5 border border-white/5 p-3 rounded-2xl flex items-center gap-1.5 py-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  ) : (
                    <div 
                      className={`p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed whitespace-pre-line border ${
                        isBot 
                          ? "bg-white/5 border-white/5 text-[var(--text)] rounded-bl-none" 
                          : "bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] border-transparent text-[var(--bg)] font-medium rounded-br-none shadow-md"
                      }`}
                    >
                      {m.content}
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Respuestas Rápidas (Quick Replies) */}
          {quickReplies.length > 0 && (
            <div className="p-3 bg-white/[0.02] border-t border-white/5 space-y-2 flex flex-wrap gap-2 justify-start max-h-40 overflow-y-auto shrink-0">
              <span className="text-[10px] text-[var(--muted)] font-bold uppercase tracking-wider block w-full mb-1">
                Elegí una consulta frecuente:
              </span>
              {quickReplies.map((qr, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qr.text, qr.actionId)}
                  className="text-left px-3 py-2 rounded-xl bg-white/5 hover:bg-[rgba(0,229,255,0.08)] border border-white/10 hover:border-[var(--accent)] text-white text-[11px] md:text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm"
                >
                  {qr.text}
                </button>
              ))}
            </div>
          )}

          {/* Formulario de Input Libre */}
          <form 
            className="p-3 border-t border-white/5 flex gap-2 items-center bg-white/[0.01]" 
            onSubmit={handleCustomSubmit}
          >
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)}
              placeholder="¿Tenés otra duda? Escribila acá..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs md:text-sm outline-none focus:border-[var(--accent)] focus:bg-white/[0.08] transition-all"
            />
            <button 
              type="submit" 
              disabled={!input.trim()}
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all cursor-pointer ${
                input.trim() 
                  ? "bg-[var(--accent)] text-[var(--bg)] shadow-md hover:scale-105 active:scale-95" 
                  : "bg-white/5 text-[var(--muted)] border border-white/10 cursor-not-allowed"
              }`}
            >
              ↑
            </button>
          </form>
        </div>
      )}
    </div>
  );
}