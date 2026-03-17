/**
 * LandingPage.tsx — SC Software
 * Landing de automatizaciones. Usa el stack del proyecto:
 * Tailwind v4 + CSS vars + Syne / DM Sans + paleta accent cian/violeta.
 * Ruta: /landing
 */

import { useEffect, useRef } from "react";

const WA = (msg: string) =>
  `https://wa.me/5493815502176?text=${encodeURIComponent(msg)}`;

/* ── DATA ─────────────────────────────────────────────── */
const MARQUEE = [
  "Automatizaciones con IA",
  "Software a Medida",
  "Páginas Web",
  "Apps Mobile",
  "CRM Personalizado",
  "Sistemas de Escritorio",
  "Bots de WhatsApp",
  "Dashboards de Datos",
];

const SERVICES = [
  {
    icon: "⚡",
    color: "#00E5FF",
    bg: "rgba(0,229,255,0.08)",
    border: "rgba(0,229,255,0.2)",
    name: "Automatizaciones con IA",
    desc: "Conectamos tus apps y eliminamos el trabajo repetitivo. WhatsApp, emails, hojas de cálculo, CRM — todo fluye solo.",
    tags: ["Make / n8n", "WhatsApp API", "Google Sheets", "Webhooks"],
  },
  {
    icon: "🛠️",
    color: "#7B61FF",
    bg: "rgba(123,97,255,0.08)",
    border: "rgba(123,97,255,0.2)",
    name: "Software a Medida",
    desc: "Sistemas hechos exactamente para tu negocio. Sin funciones que no usás, sin pagar por lo que no necesitás.",
    tags: ["Web App", "Panel Admin", "Reportes", "APIs"],
  },
  {
    icon: "🌐",
    color: "#00FFA3",
    bg: "rgba(0,255,163,0.08)",
    border: "rgba(0,255,163,0.2)",
    name: "Páginas Web",
    desc: "Sitios que convierten visitas en clientes. Rápidos, modernos y optimizados para aparecer en Google.",
    tags: ["Landing Page", "SEO", "E-commerce", "Institucional"],
  },
  {
    icon: "📊",
    color: "#00E5FF",
    bg: "rgba(0,229,255,0.08)",
    border: "rgba(0,229,255,0.2)",
    name: "CRM / Gestión",
    desc: "Controlá tus clientes, ventas y tareas desde un solo lugar. Adaptado a tu flujo de trabajo, no al revés.",
    tags: ["Pipeline", "Seguimiento", "Reportes", "Notificaciones"],
  },
];

const METRICS = [
  { val: "80%", lbl: "Reducción tareas manuales" },
  { val: "48h", lbl: "Primera entrega" },
  { val: "3x",  lbl: "ROI promedio" },
  { val: "∞",   lbl: "Escalabilidad" },
];

const STEPS = [
  { num: "01", title: "Diagnóstico gratis", desc: "Hablamos 30 min por WhatsApp o llamada. Entendemos tu negocio y qué tiempo/dinero estás perdiendo.", color: "#00E5FF" },
  { num: "02", title: "Propuesta clara",    desc: "Presupuesto detallado con precio, tiempo y exactamente qué vas a recibir. Sin letra chica.",       color: "#7B61FF" },
  { num: "03", title: "Desarrollo ágil",    desc: "Arrancamos de inmediato. Primera entrega en 48hs. Actualizaciones semanales de avance.",             color: "#00FFA3" },
  { num: "04", title: "Soporte continuo",   desc: "Entregamos, capacitamos y nos quedamos disponibles. Tu sistema crece con vos.",                     color: "#00E5FF" },
];

const TESTIMONIALS = [
  { quote: "Antes pasaba 3 horas por día cargando datos a mano. Ahora todo pasa automático y me dedico a atender clientes.", initials: "MR", name: "Marcos R.", biz: "Distribuidora · Tucumán",     color: "#00E5FF", bg: "rgba(0,229,255,0.12)" },
  { quote: "Mi página nueva trae consultas todos los días. Antes no aparecía en Google, ahora soy el primero de mi rubro.", initials: "LC", name: "Laura C.",  biz: "Salón de Belleza · Tucumán",  color: "#7B61FF", bg: "rgba(123,97,255,0.12)" },
  { quote: "El CRM nos cambió la vida. Sabemos en qué etapa está cada cliente y nadie se nos pierde en el camino.",          initials: "JP", name: "Juan P.",   biz: "Inmobiliaria · Tucumán",      color: "#00FFA3", bg: "rgba(0,255,163,0.12)" },
];

/* ── ICON ─────────────────────────────────────────────── */
function WAIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ── COMPONENT ────────────────────────────────────────── */
export default function LandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Matrix rain — igual al Hero.tsx del proyecto */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight ?? 800;
    };
    resize();
    window.addEventListener("resize", resize);
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/*$%#{}[]";
    const sz = 13;
    let drops: number[] = Array(Math.floor(canvas.width / sz)).fill(0);
    window.addEventListener("resize", () => { drops = Array(Math.floor(canvas.width / sz)).fill(0); });
    let raf: number;
    const draw = () => {
      ctx.fillStyle = "rgba(8,12,16,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = sz + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        ctx.fillStyle = Math.random() > 0.97 ? "#00E5FF" : "rgba(0,229,255,0.15)";
        ctx.fillText(letters[Math.floor(Math.random() * letters.length)], i * sz, drops[i] * sz);
        if (drops[i] * sz > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += Math.random() * 0.35 + 0.25;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  /* Scroll reveal — reutiliza .sc-reveal del proyecto */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".sc-reveal:not(.visible)").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const doubled = [...MARQUEE, ...MARQUEE];

  return (
    <>
      <style>{`
        /* ─── Hero ─── */
        .lp-hero {
          position: relative; min-height: 100vh;
          display: flex; flex-direction: column; justify-content: center;
          padding: 140px 24px 80px; overflow: hidden; background: var(--bg);
        }
        .lp-canvas { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.12; }
        .lp-overlay {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 65% at 50% 50%, rgba(8,12,16,0.2) 0%, rgba(8,12,16,0.85) 70%);
          pointer-events: none;
        }
        .lp-fade-bottom {
          position: absolute; bottom: 0; left: 0; right: 0; height: 120px;
          background: linear-gradient(to bottom, transparent, var(--bg)); pointer-events: none;
        }
        .lp-hero-inner { position: relative; z-index: 2; max-width: 960px; }

        .lp-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,229,255,0.07); border: 1px solid rgba(0,229,255,0.22);
          border-radius: 100px; padding: 6px 14px;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--accent); margin-bottom: 28px; width: fit-content;
          animation: lpUp 0.9s cubic-bezier(0.22,1,0.36,1) both;
        }
        .lp-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent); box-shadow: 0 0 8px var(--accent);
          animation: lpBlink 2s ease infinite;
        }
        @keyframes lpBlink { 0%,100%{opacity:1} 50%{opacity:.3} }

        .lp-h1 {
          font-family: var(--font-display);
          font-size: clamp(2.6rem, 7vw, 5.4rem);
          font-weight: 800; line-height: 0.96; letter-spacing: -0.04em;
          color: #fff; margin-bottom: 24px;
          animation: lpUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s both;
        }
        .lp-h1 .g1 {
          background: linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .lp-h1 .g2 {
          background: linear-gradient(135deg, #00FFA3 0%, #00E5FF 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .lp-sub {
          font-size: clamp(0.95rem, 1.8vw, 1.1rem); color: var(--muted);
          max-width: 520px; line-height: 1.78; font-weight: 300; margin-bottom: 40px;
          animation: lpUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s both;
        }
        .lp-actions {
          display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 72px;
          animation: lpUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s both;
        }
        .lp-stats {
          display: flex; gap: 44px; flex-wrap: wrap;
          padding-top: 32px; border-top: 1px solid var(--border);
          animation: lpUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.4s both;
        }
        .lp-stat-n {
          font-family: var(--font-display); font-size: 2rem; font-weight: 800;
          color: #fff; line-height: 1; letter-spacing: -0.02em;
        }
        .lp-stat-n span { color: var(--accent); }
        .lp-stat-l { font-size: 0.7rem; color: var(--muted); margin-top: 6px; text-transform: uppercase; letter-spacing: 0.06em; }
        @keyframes lpUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }

        /* ─── Marquee ─── */
        .lp-marquee { border-top:1px solid var(--border); border-bottom:1px solid var(--border); overflow:hidden; background:var(--surface); }
        .lp-marquee-track { display:flex; width:max-content; animation:lpMq 26s linear infinite; }
        .lp-marquee-track:hover { animation-play-state:paused; }
        .lp-marquee-item {
          padding:16px 36px; font-family:var(--font-display); font-size:0.7rem; font-weight:700;
          letter-spacing:0.14em; text-transform:uppercase; color:var(--muted);
          border-right:1px solid var(--border); white-space:nowrap;
          display:flex; align-items:center; gap:10px; transition:color .2s;
        }
        .lp-marquee-item:hover { color:var(--accent); }
        .lp-mq-dot { width:5px; height:5px; border-radius:50%; background:var(--accent); flex-shrink:0; }
        @keyframes lpMq { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* ─── Services ─── */
        .lp-svc-grid {
          display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
          gap:1px; background:var(--border);
          border:1px solid var(--border); border-radius:18px; overflow:hidden; margin-top:52px;
        }
        .lp-svc-card {
          background:var(--surface); padding:36px 30px; position:relative; overflow:hidden;
          transition:background .25s;
        }
        .lp-svc-card::after {
          content:''; position:absolute; bottom:0; left:0; right:0; height:2px;
          background:var(--cc, var(--accent));
          transform:scaleX(0); transform-origin:left; transition:transform .3s ease;
        }
        .lp-svc-card:hover { background:#131B24; }
        .lp-svc-card:hover::after { transform:scaleX(1); }
        .lp-svc-icon {
          width:48px; height:48px; border-radius:12px;
          display:flex; align-items:center; justify-content:center; font-size:20px; margin-bottom:18px;
        }
        .lp-svc-name { font-family:var(--font-display); font-size:1.02rem; font-weight:700; margin-bottom:10px; letter-spacing:-0.02em; }
        .lp-svc-desc { font-size:0.85rem; color:var(--muted); line-height:1.7; margin-bottom:14px; }
        .lp-svc-tags { display:flex; flex-wrap:wrap; gap:5px; }
        .lp-svc-tag { font-size:0.67rem; padding:3px 9px; background:rgba(255,255,255,0.04); border:1px solid var(--border); border-radius:100px; color:var(--muted); }

        /* ─── Metrics ─── */
        .lp-metrics {
          display:grid; grid-template-columns:repeat(4,1fr); gap:1px;
          background:var(--border); border:1px solid var(--border); border-radius:18px; overflow:hidden; margin-top:52px;
        }
        .lp-metric { background:var(--surface); padding:36px 20px; text-align:center; transition:background .2s; }
        .lp-metric:hover { background:#131B24; }
        .lp-metric-val {
          font-family:var(--font-display); font-size:2.8rem; font-weight:800;
          letter-spacing:-0.04em; line-height:1; margin-bottom:8px;
          background:linear-gradient(135deg,#00E5FF,#7B61FF);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .lp-metric-lbl { font-size:0.73rem; color:var(--muted); text-transform:uppercase; letter-spacing:0.05em; }

        /* ─── Steps ─── */
        .lp-steps { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:20px; margin-top:52px; }
        .lp-step {
          background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:28px 24px;
          transition:border-color .25s, transform .25s;
        }
        .lp-step:hover { border-color:rgba(0,229,255,0.25); transform:translateY(-4px); }
        .lp-step-num {
          font-family:var(--font-display); font-size:3.5rem; font-weight:800;
          letter-spacing:-0.04em; line-height:1; margin-bottom:14px; opacity:0.1;
        }
        .lp-step-title { font-family:var(--font-display); font-size:1.02rem; font-weight:700; margin-bottom:8px; color:#fff; }
        .lp-step-desc { font-size:0.85rem; color:var(--muted); line-height:1.7; }

        /* ─── Testimonials ─── */
        .lp-testi { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; margin-top:52px; }
        .lp-tcard { background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:28px; transition:border-color .25s; }
        .lp-tcard:hover { border-color:rgba(0,229,255,0.2); }
        .lp-tquote { font-size:0.88rem; color:#C8D4E0; line-height:1.75; margin-bottom:20px; font-style:italic; }
        .lp-tquote::before { content:'"'; font-size:1.4rem; font-style:normal; line-height:0; vertical-align:-0.3em; margin-right:2px; }
        .lp-tauthor { display:flex; align-items:center; gap:12px; }
        .lp-tav { width:38px; height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:var(--font-display); font-weight:700; font-size:0.8rem; flex-shrink:0; }
        .lp-tname { font-size:0.88rem; font-weight:600; color:var(--text); }
        .lp-tbiz  { font-size:0.75rem; color:var(--muted); }

        /* ─── CTA ─── */
        .lp-cta-box {
          background:var(--surface); border:1px solid var(--border); border-radius:24px;
          padding:80px 48px; text-align:center; position:relative; overflow:hidden;
        }
        .lp-cta-glow {
          position:absolute; top:-80px; left:50%; transform:translateX(-50%);
          width:500px; height:400px;
          background:radial-gradient(circle,rgba(0,229,255,0.08) 0%,transparent 70%); pointer-events:none;
        }
        .lp-cta-glow2 {
          position:absolute; bottom:-80px; right:-60px;
          width:350px; height:350px;
          background:radial-gradient(circle,rgba(123,97,255,0.06) 0%,transparent 70%); pointer-events:none;
        }
        .lp-cta-topline {
          position:absolute; top:0; left:10%; right:10%; height:1px;
          background:linear-gradient(90deg,transparent,rgba(0,229,255,0.4),transparent);
        }
        .lp-cta-h2 {
          font-family:var(--font-display); font-size:clamp(1.8rem,4vw,3rem); font-weight:800;
          letter-spacing:-0.04em; line-height:1.05; max-width:640px; margin:0 auto 16px; color:#fff;
        }
        .lp-cta-sub { font-size:1rem; color:var(--muted); margin-bottom:36px; }
        .lp-cta-actions { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }

        /* ─── Responsive ─── */
        @media(max-width:768px) {
          .lp-hero { padding:120px 20px 60px; }
          .lp-stats { gap:28px; }
          .lp-metrics { grid-template-columns:repeat(2,1fr); }
          .lp-cta-box { padding:48px 24px; }
        }
      `}</style>

      {/* ══ HERO ══ */}
      <section className="lp-hero">
        <canvas ref={canvasRef} className="lp-canvas" />
        <div className="lp-overlay" />
        <div className="lp-fade-bottom" />

        <div className="sc-container lp-hero-inner">
          <div className="lp-badge">
            <span className="lp-badge-dot" />
            Disponible para nuevos proyectos · Tucumán, Argentina
          </div>

          <h1 className="lp-h1">
            Tu negocio<br />
            <span className="g1">en automático.</span><br />
            <span className="g2">Sin excusas.</span>
          </h1>

          <p className="lp-sub">
            Automatizamos tus procesos, construimos tu software a medida y conectamos tus herramientas
            para que puedas enfocarte en lo que realmente importa: crecer.{" "}
            <strong style={{ color: "var(--text)", fontWeight: 500 }}>Primera consulta 100% gratis.</strong>
          </p>

          <div className="lp-actions">
            <a href={WA("Hola! Quiero automatizar mi negocio.")} target="_blank" rel="noreferrer" className="sc-btn-primary">
              <WAIcon size={16} /> Quiero automatizar mi negocio
            </a>
            <a href="#lp-servicios" className="sc-btn-ghost">Ver servicios ↓</a>
          </div>

          <div className="lp-stats">
            {[
              { n: "20", s: "+", l: "Proyectos entregados" },
              { n: "80", s: "%", l: "Menos tiempo manual" },
              { n: "48", s: "h", l: "Primera entrega" },
              { n: "3",  s: "x", l: "ROI promedio" },
            ].map((st) => (
              <div key={st.l}>
                <div className="lp-stat-n">{st.n}<span>{st.s}</span></div>
                <div className="lp-stat-l">{st.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MARQUEE ══ */}
      <div className="lp-marquee">
        <div className="lp-marquee-track">
          {doubled.map((item, i) => (
            <div className="lp-marquee-item" key={i}>
              <span className="lp-mq-dot" />{item}
            </div>
          ))}
        </div>
      </div>

      {/* ══ SERVICES ══ */}
      <section id="lp-servicios" className="py-24 px-6 bg-[#080C10]">
        <div className="sc-container">
          <div className="sc-reveal">
            <div className="sc-section-label">Lo que hacemos</div>
            <h2 className="sc-section-title">Soluciones que generan resultados reales</h2>
            <p className="text-[0.97rem] text-[var(--muted)] leading-[1.75] mt-3 max-w-[480px]">
              No vendemos tecnología, vendemos tiempo y dinero de vuelta para tu negocio.
            </p>
          </div>

          <div className="lp-svc-grid sc-reveal">
            {SERVICES.map((s) => (
              <div key={s.name} className="lp-svc-card" style={{ "--cc": s.color } as React.CSSProperties}>
                <div className="lp-svc-icon" style={{ background: s.bg, border: `1px solid ${s.border}` }}>{s.icon}</div>
                <div className="lp-svc-name" style={{ color: s.color }}>{s.name}</div>
                <div className="lp-svc-desc">{s.desc}</div>
                <div className="lp-svc-tags">{s.tags.map((t) => <span className="lp-svc-tag" key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ METRICS ══ */}
      <section className="pb-24 px-6 bg-[#080C10]">
        <div className="sc-container">
          <div className="lp-metrics sc-reveal">
            {METRICS.map((m) => (
              <div className="lp-metric" key={m.lbl}>
                <div className="lp-metric-val">{m.val}</div>
                <div className="lp-metric-lbl">{m.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="py-24 px-6" style={{ background: "var(--surface)" }}>
        <div className="sc-container">
          <div className="sc-reveal">
            <div className="sc-section-label">Cómo trabajamos</div>
            <h2 className="sc-section-title">Simple, rápido y sin vueltas</h2>
            <p className="text-[0.97rem] text-[var(--muted)] leading-[1.75] mt-3 max-w-[480px]">
              En 4 pasos transformamos tu problema en una solución funcionando.
            </p>
          </div>
          <div className="lp-steps sc-reveal">
            {STEPS.map((s) => (
              <div className="lp-step" key={s.num}>
                <div className="lp-step-num" style={{ color: s.color }}>{s.num}</div>
                <div className="lp-step-title">{s.title}</div>
                <div className="lp-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="py-24 px-6 bg-[#080C10]">
        <div className="sc-container">
          <div className="sc-reveal">
            <div className="sc-section-label">Resultados reales</div>
            <h2 className="sc-section-title">Lo que dicen los que ya automatizaron</h2>
          </div>
          <div className="lp-testi sc-reveal">
            {TESTIMONIALS.map((t) => (
              <div className="lp-tcard" key={t.name}>
                <div className="lp-tquote" style={{ "--qc": t.color } as React.CSSProperties}>
                  {t.quote}
                </div>
                <div className="lp-tauthor">
                  <div className="lp-tav" style={{ background: t.bg, color: t.color }}>{t.initials}</div>
                  <div>
                    <div className="lp-tname">{t.name}</div>
                    <div className="lp-tbiz">{t.biz}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-24 px-6" style={{ background: "var(--surface)" }}>
        <div className="sc-container">
          <div className="lp-cta-box sc-reveal">
            <div className="lp-cta-glow" />
            <div className="lp-cta-glow2" />
            <div className="lp-cta-topline" />
            <h2 className="lp-cta-h2">¿Cuánto tiempo perdés haciendo cosas que puede hacer una máquina?</h2>
            <p className="lp-cta-sub">Primera consulta gratis. Sin compromiso. Te decimos exactamente qué podemos hacer por tu negocio.</p>
            <div className="lp-cta-actions">
              <a href={WA("Hola! Quiero una consulta gratis para automatizar mi negocio.")} target="_blank" rel="noreferrer" className="sc-btn-primary">
                <WAIcon size={16} /> Consulta gratis por WhatsApp
              </a>
              <a href="mailto:s1c.softwares@gmail.com" className="sc-btn-ghost">Escribir por email →</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
