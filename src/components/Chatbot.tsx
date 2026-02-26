import { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────────
// SYSTEM PROMPT — Context completo de SC Software
// ─────────────────────────────────────────────
const SYSTEM_PROMPT = `Sos el asistente virtual de SC Software. Tu nombre es "SC Bot".
Tu objetivo principal es responder preguntas de visitantes, generar confianza y motivarlos a contactar al equipo para cerrar un proyecto.

═══════════════════════════════
SOBRE SC SOFTWARE
═══════════════════════════════
- Empresa de desarrollo de software y diseño web
- Fundada por Santiago Nahuel Cabral, desarrollador fullstack
- Ubicación: Tucumán, Argentina
- Trabaja con clientes de toda Argentina (y del exterior si es necesario)
- Especialidad: soluciones digitales a medida, rápidas y con buen diseño
- Filosofía: "El código es tuyo desde el día 1, sin dependencias"

═══════════════════════════════
SERVICIOS DETALLADOS
═══════════════════════════════

1. PÁGINAS WEB
   - Landing Pages Premium: página de conversión para redes sociales y anuncios. Incluye sección hero animada, SEO básico, WhatsApp automático, optimizada para móviles.
   - Web Corporativa: para empresas y profesionales. 5-10 secciones, branding personalizado, formularios avanzados, panel de administración opcional.
   - Tienda Online / E-commerce: carrito de compras, Mercado Pago integrado, gestión de stock, panel de productos, automatización de órdenes.
   - Panel de administración: gestión de contenido, reportes, usuarios.
   - Stack web: React, Next.js, Vite, TypeScript, CSS Modules, Tailwind.

2. APPS MOBILE (Android + iOS)
   - App de Servicios: reservas, turnos, pagos y notificaciones automáticas. Incluye panel admin, Push Notifications, pasarelas de pago.
   - App Comercial: catálogo de productos, carrito, estados de pedidos, inventario, usuarios y permisos.
   - App GPS & Real Time: envíos, tracking en vivo, logística tipo Uber/Rappi. Mapas en tiempo real, rutas automáticas, panel operativo.
   - Stack mobile: React Native, Expo. Compatible con iOS y Android. Se publica en App Store y Google Play.

3. SISTEMAS DE ESCRITORIO (PC o red local)
   - Sistema de Gestión de Ventas: ventas, clientes, historial detallado, métricas diarias/mensuales, exportación Excel/PDF.
   - Sistema de Gestión de Stock: inventario en tiempo real, alertas de stock bajo, gestión de proveedores, movimientos automáticos.
   - Sistema de Turnos & Agenda: ideal para clínicas, talleres, barberías. Multiusuario, notificaciones, calendario avanzado.
   - Stack desktop: C# .NET, WPF, SQL Server. Ultra rápidos y estables.

4. SOPORTE & MANTENIMIENTO
   - Plan Básico: actualizaciones esenciales, corrección de errores menores, backups mensuales. Tiempo de respuesta 48h.
   - Plan Profesional: monitoreo y optimización regular, backups semanales, actualizaciones de seguridad, soporte prioritario en 24h.
   - Plan Full Enterprise: monitoreo 24/7, backups diarios, optimización avanzada, atención inmediata, actualización continua.

═══════════════════════════════
PLANES Y PRECIOS
═══════════════════════════════
Todos los precios son ORIENTATIVOS. El precio final depende de los requerimientos específicos del proyecto.

PLAN EMPRENDEDOR — Desde USD $200
  Incluye: Landing page moderna, botón de contacto directo, 100% responsive, SEO básico.
  Ideal para: emprendedores, profesionales independientes, pequeños negocios que quieren presencia online.
  Tiempo estimado: 1-2 semanas.

PLAN NEGOCIO — Desde USD $600 ⭐ (más elegido)
  Incluye: Web completa multipágina, panel de administración, SEO optimizado, integración WhatsApp, soporte 30 días.
  Ideal para: empresas que quieren una web profesional con gestión propia.
  Tiempo estimado: 2-4 semanas.

PLAN PRO — Desde USD $1.000
  Incluye: Web + sistema a medida, automatizaciones, roles y permisos, reportes y métricas, soporte mensual incluido.
  Ideal para: negocios que necesitan automatizar procesos y tener todo integrado.
  Tiempo estimado: 4-8 semanas según complejidad.

PROYECTOS PERSONALIZADOS: Para apps mobile y sistemas de escritorio, el presupuesto se arma a medida luego de una consulta gratuita. Pueden arrancar desde USD $500 hasta proyectos de mayor escala.

SOPORTE & MANTENIMIENTO:
  - Plan Básico: consultar precio (proyectos pequeños)
  - Plan Profesional: consultar precio (proyectos activos)
  - Plan Enterprise: consultar precio (operaciones críticas)

═══════════════════════════════
PROCESO DE TRABAJO
═══════════════════════════════
1. CONSULTA GRATUITA (sin compromiso): se habla por WhatsApp o llamada para entender el proyecto, objetivos y necesidades.
2. PROPUESTA EN 48H: se envía presupuesto detallado con tecnologías, tiempos y costos. Respuesta garantizada en 48 horas.
3. DISEÑO & PROTOTIPO: se crean wireframes o prototipos. El cliente aprueba antes de arrancar el desarrollo.
4. DESARROLLO: código limpio, documentado y escalable. Seguimiento semanal con actualizaciones del avance.
5. TESTING & LAUNCH: pruebas exhaustivas antes del lanzamiento. Deploy sin drama.
6. SOPORTE POST-ENTREGA: soporte incluido los primeros días/semanas según el plan.

TIEMPOS REALES:
  - Landing page: 1 semana
  - Web corporativa: 2-3 semanas
  - E-commerce: 3-6 semanas
  - App mobile: 6-14 semanas
  - Sistema de escritorio: 4-10 semanas
  - Los tiempos dependen de los requerimientos y la velocidad de feedback del cliente.

GARANTÍAS:
  - El código fuente le pertenece 100% al cliente desde el primer día.
  - Los repositorios, credenciales y accesos son del cliente.
  - Sin dependencias ni contratos de permanencia.

═══════════════════════════════
PROYECTOS REALIZADOS
═══════════════════════════════

1. FORRAJERÍA JOVITA (jovita.store)
   Tipo: E-commerce completo
   Descripción: Tienda online para una forrajería/dietética en Tucumán. Venta de productos para mascotas y alimentos naturales.
   Lo que incluye: catálogo completo con categorías y búsqueda, carrito de compras, pagos con tarjeta vía Payway, panel admin para gestionar productos/stock/pedidos, notificaciones de nuevos pedidos, gestión de zonas de envío con precios por zona, sistema de métodos de pago configurables.
   Stack: React + Vite (frontend), .NET C# (backend/API REST), SQL Server (base de datos), Payway (pagos con tarjeta), Render (deploy del backend), Vercel (deploy del frontend).
   Resultado: tienda completamente operativa, con decenas de productos activos y procesando ventas reales.
   Link: https://www.jovita.store

2. SOLE COSTILLA GROUP (solecostillagroup.com)
   Tipo: Web corporativa
   Descripción: Sitio profesional para grupo inmobiliario/de servicios.
   Lo que incluye: diseño moderno y elegante, presentación de servicios, formulario de contacto, sección de propiedades o portafolio, totalmente responsive.
   Stack: React, Vite, CSS Modules.
   Link: https://solecostillagroup.com

═══════════════════════════════
DATOS DE CONTACTO
═══════════════════════════════
- WhatsApp: +54 9 381 550-2176 (link: https://wa.me/5493815502176)
- Email: s1c.softwares@gmail.com
- Instagram: @sc_software.tuc (https://www.instagram.com/sc_software.tuc)
- LinkedIn: Santiago Nahuel Cabral (https://www.linkedin.com/in/santiago-nahuel-cabral-058620212)
- Ubicación: Tucumán, Argentina
- Horario de atención: lunes a viernes, pero se responde WhatsApp con bastante agilidad.

═══════════════════════════════
POR QUÉ ELEGIR SC SOFTWARE
═══════════════════════════════
- Primera consulta 100% gratis, sin compromiso
- Propuesta y presupuesto en menos de 48 horas
- Código y accesos son del cliente desde el día 1
- Comunicación directa con el desarrollador (sin intermediarios)
- Metodología ágil: primeras versiones en semanas, no meses
- Proyectos reales y funcionando que lo respaldan
- Atención personalizada, no sos un número más

═══════════════════════════════
INSTRUCCIONES DE COMPORTAMIENTO
═══════════════════════════════
- Respondé SIEMPRE en español argentino (vos, no tú).
- Sé amigable, directo y profesional. No seas robótico ni formal en exceso.
- Respuestas concisas: máximo 4-5 líneas por respuesta. Si hay mucho para decir, dividí en puntos breves.
- Usá emojis con moderación (1-2 por respuesta máximo).
- Si preguntan por precio exacto, dá el rango orientativo y aclarás que el precio final depende del proyecto específico, e invitá a hacer la consulta gratuita.
- Cuando menciones WhatsApp, siempre incluí el link: https://wa.me/5493815502176
- NO inventés información. Si no sabés algo específico, decí "Para eso te recomiendo hablar directamente con el equipo por WhatsApp".
- Al responder sobre servicios o proyectos, siempre cerrá con un CTA suave: "¿Querés que te cotice algo similar?" o "¿Arrancamos con una consulta gratuita?".
- Si alguien parece interesado, fomentá que contacten por WhatsApp para cerrar más rápido.
- No hagas respuestas larguísimas. Mejor corto, claro y con un próximo paso concreto.`;

// ─────────────────────────────────────────────
type Message = { role: "user" | "assistant"; content: string };

const QUICK_REPLIES = [
  "¿Qué servicios ofrecen?",
  "¿Cuánto cuesta una web?",
  "¿Cuánto tarda un proyecto?",
  "Ver proyectos realizados",
];

function TypingIndicator() {
  return (
    <div className="sc-chat-row">
      <div className="sc-chat-av bot">🤖</div>
      <div className="sc-chat-bubble bot typing-bubble">
        <span /><span /><span />
      </div>
    </div>
  );
}

// Renderiza **negrita** en texto
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**")
          ? <strong key={i}>{p.slice(2, -2)}</strong>
          : <span key={i}>{p}</span>
      )}
    </>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    content: "¡Hola! 👋 Soy el asistente de **SC Software**. Puedo ayudarte con info sobre servicios, precios y proyectos. ¿En qué te puedo ayudar?",
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [badge, setBadge] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 150);
      setBadge(false);
    }
  }, [open, messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      // Llama al proxy de Vercel (api/chat.ts) en lugar de directo a Anthropic
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 600,
          system: SYSTEM_PROMPT,
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text
        ?? "Hubo un problema. Contactanos directo por WhatsApp 💬";
      setMessages((p) => [...p, { role: "assistant", content: reply }]);
    } catch {
      setMessages((p) => [...p, {
        role: "assistant",
        content: "Ups, error de conexión. Escribinos al WhatsApp: https://wa.me/5493815502176 📱",
      }]);
    } finally {
      setLoading(false);
    }
  };

  const showQuick = messages.length === 1 && !loading;

  return (
    <>
      <style>{`
        /* ── Trigger ── */
        .sc-fab {
          position: fixed; bottom: 28px; right: 28px; z-index: 500;
          width: 58px; height: 58px; border-radius: 50%;
          background: #00E5FF; color: #080C10;
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 32px rgba(0,229,255,0.45), 0 2px 8px rgba(0,0,0,0.3);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .sc-fab:hover {
          transform: scale(1.08);
          box-shadow: 0 12px 40px rgba(0,229,255,0.6);
        }
        .sc-fab-ring {
          position: absolute; inset: -5px; border-radius: 50%;
          border: 2px solid rgba(0,229,255,0.35);
          animation: fabRing 2.2s ease-out infinite;
          pointer-events: none;
        }
        @keyframes fabRing {
          0%   { transform:scale(1);   opacity:.7; }
          100% { transform:scale(1.6); opacity:0; }
        }
        .sc-fab-badge {
          position: absolute; top:-3px; right:-3px;
          width:17px; height:17px; border-radius:50%;
          background:#FF4757; color:#fff;
          font-size:.62rem; font-weight:800;
          display:flex; align-items:center; justify-content:center;
          border:2px solid #080C10;
          animation:badgePop .3s cubic-bezier(.22,1,.36,1);
        }
        @keyframes badgePop{from{transform:scale(0)}to{transform:scale(1)}}

        /* ── Window ── */
        .sc-chat-win {
          position:fixed; bottom:100px; right:28px; z-index:500;
          width:370px; max-width:calc(100vw - 40px);
          height:570px; max-height:calc(100vh - 120px);
          background:#0E1318;
          border:1px solid rgba(0,229,255,0.15);
          border-radius:20px; overflow:hidden;
          display:flex; flex-direction:column;
          box-shadow:0 24px 80px rgba(0,0,0,0.6);
          animation:winOpen .28s cubic-bezier(.22,1,.36,1);
        }
        @keyframes winOpen {
          from{opacity:0;transform:scale(.9) translateY(16px);transform-origin:bottom right}
          to  {opacity:1;transform:scale(1)  translateY(0)}
        }

        /* ── Header ── */
        .sc-chat-hdr {
          background:linear-gradient(135deg,#0D1E2A,#0E1318);
          border-bottom:1px solid rgba(0,229,255,0.1);
          padding:14px 16px;
          display:flex; align-items:center; gap:11px; flex-shrink:0;
        }
        .sc-chat-hdr-av {
          width:38px; height:38px; border-radius:50%;
          background:rgba(0,229,255,0.1);
          border:1.5px solid rgba(0,229,255,0.3);
          display:flex; align-items:center; justify-content:center;
          font-size:1.05rem; position:relative; flex-shrink:0;
        }
        .sc-chat-hdr-dot {
          position:absolute; bottom:1px; right:1px;
          width:9px; height:9px; border-radius:50%;
          background:#4ade80; border:2px solid #0E1318;
        }
        .sc-chat-hdr-name {
          font-family:'Syne',sans-serif;
          font-size:.88rem; font-weight:700; color:#fff;
        }
        .sc-chat-hdr-sub {
          font-size:.68rem; color:#6B7A8D; margin-top:2px;
          display:flex; align-items:center; gap:4px;
        }
        .sc-chat-hdr-sub::before {
          content:''; width:5px; height:5px; border-radius:50%;
          background:#4ade80; flex-shrink:0;
          animation:onlinePulse 2s ease-in-out infinite;
        }
        @keyframes onlinePulse{0%,100%{opacity:1}50%{opacity:.3}}
        .sc-chat-hdr-close {
          margin-left:auto; width:28px; height:28px; border-radius:7px;
          background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.09);
          color:#6B7A8D; cursor:pointer; font-size:.82rem;
          display:flex; align-items:center; justify-content:center;
          transition:all .15s; flex-shrink:0;
        }
        .sc-chat-hdr-close:hover{background:rgba(255,80,80,.13);color:#ff6b6b;}

        /* ── Messages ── */
        .sc-chat-msgs {
          flex:1; overflow-y:auto; padding:14px 14px 8px;
          display:flex; flex-direction:column; gap:12px; min-height:0;
        }
        .sc-chat-msgs::-webkit-scrollbar{width:3px;}
        .sc-chat-msgs::-webkit-scrollbar-thumb{background:rgba(0,229,255,.18);border-radius:2px;}

        .sc-chat-row {
          display:flex; gap:7px; align-items:flex-end;
        }
        .sc-chat-row.user { flex-direction:row-reverse; }

        .sc-chat-av {
          width:26px; height:26px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          font-size:.7rem; flex-shrink:0;
        }
        .sc-chat-av.bot {
          background:rgba(0,229,255,0.1);
          border:1px solid rgba(0,229,255,0.2);
          font-size:.8rem;
        }
        .sc-chat-av.user {
          background:rgba(123,97,255,0.12);
          border:1px solid rgba(123,97,255,0.2);
          color:#7B61FF; font-size:.68rem; font-weight:700;
        }

        .sc-chat-bubble {
          max-width:80%; padding:9px 13px;
          border-radius:14px; font-size:.84rem; line-height:1.6;
          animation:bubbleIn .22s cubic-bezier(.22,1,.36,1);
        }
        @keyframes bubbleIn {
          from{opacity:0;transform:scale(.92) translateY(5px)}
          to  {opacity:1;transform:scale(1)   translateY(0)}
        }
        .sc-chat-bubble.bot {
          background:#131A22;
          border:1px solid rgba(255,255,255,0.07);
          color:#E8EDF2; border-bottom-left-radius:3px;
        }
        .sc-chat-bubble.user {
          background:#00E5FF; color:#080C10;
          font-weight:500; border-bottom-right-radius:3px;
        }
        .sc-chat-bubble strong{font-weight:700;}

        /* Typing dots */
        .typing-bubble {
          display:flex !important; gap:5px; align-items:center;
          padding:11px 14px !important;
        }
        .typing-bubble span {
          width:6px; height:6px; border-radius:50%; background:#00E5FF;
          animation:typDot 1.2s ease-in-out infinite;
        }
        .typing-bubble span:nth-child(2){animation-delay:.2s}
        .typing-bubble span:nth-child(3){animation-delay:.4s}
        @keyframes typDot {
          0%,60%,100%{transform:translateY(0);opacity:.35}
          30%{transform:translateY(-5px);opacity:1}
        }

        /* ── Quick replies ── */
        .sc-chat-quick {
          padding:0 12px 10px;
          display:flex; flex-wrap:wrap; gap:5px; flex-shrink:0;
        }
        .sc-chat-qbtn {
          background:rgba(0,229,255,0.07);
          border:1px solid rgba(0,229,255,0.2);
          color:#00E5FF; font-family:'DM Sans',sans-serif;
          font-size:.72rem; font-weight:600;
          padding:5px 11px; border-radius:100px;
          cursor:pointer; transition:all .15s; white-space:nowrap;
        }
        .sc-chat-qbtn:hover{background:rgba(0,229,255,.15);border-color:rgba(0,229,255,.4);}

        /* ── Input ── */
        .sc-chat-foot {
          padding:10px 12px 12px;
          border-top:1px solid rgba(255,255,255,0.07);
          background:#080C10; flex-shrink:0;
        }
        .sc-chat-form {
          display:flex; gap:7px; align-items:center;
        }
        .sc-chat-inp {
          flex:1; background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.1);
          border-radius:10px; padding:9px 13px;
          color:#E8EDF2; font-family:'DM Sans',sans-serif;
          font-size:.86rem; outline:none; min-width:0;
          transition:border-color .2s;
        }
        .sc-chat-inp::placeholder{color:#374151;}
        .sc-chat-inp:focus{border-color:rgba(0,229,255,.4);}
        .sc-chat-send {
          width:36px; height:36px; border-radius:9px; flex-shrink:0;
          background:#00E5FF; border:none; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          color:#080C10; transition:all .15s;
        }
        .sc-chat-send:hover{background:#33eeff;transform:translateY(-1px);}
        .sc-chat-send:disabled{background:rgba(0,229,255,.25);cursor:default;transform:none;}
        .sc-chat-poweredby {
          text-align:center; margin-top:6px;
          font-size:.62rem; color:#2D3748;
          display:flex; align-items:center; justify-content:center; gap:3px;
        }

        @media(max-width:440px){
          .sc-fab{bottom:20px;right:20px;}
          .sc-chat-win{bottom:88px;right:20px;width:calc(100vw - 40px);}
        }
      `}</style>

      {/* ── FAB trigger ── */}
      {!open && (
        <button className="sc-fab" onClick={() => setOpen(true)} aria-label="Abrir chat">
          <div className="sc-fab-ring" />
          {badge && <div className="sc-fab-badge">1</div>}
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 1.89.524 3.66 1.438 5.168L2.05 21.95a.5.5 0 00.637.612l4.55-1.55A9.958 9.958 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
          </svg>
        </button>
      )}

      {/* ── Chat window ── */}
      {open && (
        <div className="sc-chat-win" role="dialog" aria-label="Chat SC Software">

          {/* Header */}
          <div className="sc-chat-hdr">
            <div className="sc-chat-hdr-av">
              🤖
              <div className="sc-chat-hdr-dot" />
            </div>
            <div>
              <div className="sc-chat-hdr-name">Asistente SC Software</div>
              <div className="sc-chat-hdr-sub">En línea — responde al instante</div>
            </div>
            <button className="sc-chat-hdr-close" onClick={() => setOpen(false)} aria-label="Cerrar">✕</button>
          </div>

          {/* Messages */}
          <div className="sc-chat-msgs">
            {messages.map((m, i) => (
              <div key={i} className={`sc-chat-row ${m.role}`}>
                <div className={`sc-chat-av ${m.role === "user" ? "user" : "bot"}`}>
                  {m.role === "user" ? "Vos" : "🤖"}
                </div>
                <div className={`sc-chat-bubble ${m.role === "user" ? "user" : "bot"}`}>
                  <RichText text={m.content} />
                </div>
              </div>
            ))}
            {loading && <TypingIndicator />}
            <div ref={endRef} />
          </div>

          {/* Quick replies */}
          {showQuick && (
            <div className="sc-chat-quick">
              {QUICK_REPLIES.map((q) => (
                <button key={q} className="sc-chat-qbtn" onClick={() => send(q)}>{q}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="sc-chat-foot">
            <form className="sc-chat-form" onSubmit={(e) => { e.preventDefault(); send(input); }}>
              <input
                ref={inputRef}
                className="sc-chat-inp"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribí tu consulta..."
                disabled={loading}
                autoComplete="off"
              />
              <button type="submit" className="sc-chat-send" disabled={!input.trim() || loading} aria-label="Enviar">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </form>
            <div className="sc-chat-poweredby">
              <svg width="9" height="9" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
        
            </div>
          </div>
        </div>
      )}
    </>
  );
}