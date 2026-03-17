import { useEffect, useRef } from "react";

const STATS = [
  { n: "20", s: "+", l: "Proyectos entregados" },
  { n: "100", s: "%", l: "Clientes satisfechos" },
  { n: "48",  s: "h", l: "Primera entrega" },
  { n: "3",   s: "x", l: "ROI promedio" },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/*$%#{}[]";
    const fontSize = 13;
    let drops: number[] = Array(Math.floor(canvas.width / fontSize)).fill(0);
    window.addEventListener("resize", () => {
      drops = Array(Math.floor(canvas.width / fontSize)).fill(0);
    });

    let raf: number;
    const draw = () => {
      ctx.fillStyle = "rgba(8,12,16,0.055)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        const bright = Math.random() > 0.97;
        ctx.fillStyle = bright ? "rgba(0,229,255,0.55)" : "rgba(0,229,255,0.1)";
        ctx.fillText(letters[Math.floor(Math.random() * letters.length)], i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += Math.random() * 0.4 + 0.25;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #080C10;
          padding: 120px 24px 80px;
        }

        .hero-canvas {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          opacity: 0.18;
        }

        /* gradient radial que oscurece centro para legibilidad */
        .hero-vignette {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 75% 70% at 50% 50%,
              rgba(8,12,16,0.55) 0%,
              rgba(8,12,16,0.82) 60%,
              rgba(8,12,16,0.97) 100%);
          pointer-events: none;
        }

        .hero-bottom-fade {
          position: absolute; bottom: 0; left: 0; right: 0; height: 180px;
          background: linear-gradient(to bottom, transparent, #080C10);
          pointer-events: none;
        }

        /* faint grid lines */
        .hero-grid-lines {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 10%, transparent 75%);
        }

        /* glow orb behind title */
        .hero-orb {
          position: absolute;
          width: 800px; height: 600px;
          top: 50%; left: 50%; transform: translate(-50%, -52%);
          background: radial-gradient(ellipse, rgba(0,229,255,0.055) 0%, transparent 65%);
          pointer-events: none;
          filter: blur(40px);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 900px;
          width: 100%;
          text-align: center;
        }

        /* ── Badge ── */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0,229,255,0.07);
          border: 1px solid rgba(0,229,255,0.25);
          border-radius: 100px;
          padding: 7px 16px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #00E5FF;
          margin-bottom: 32px;
          animation: hUp 1s cubic-bezier(0.22,1,0.36,1) both;
        }

        .hero-badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #00E5FF; box-shadow: 0 0 8px #00E5FF;
          animation: hBlink 2s ease infinite;
        }

        @keyframes hBlink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.7)} }

        /* ── Title ── */
        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3rem, 7.5vw, 6.4rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.045em;
          color: #fff;
          margin-bottom: 28px;
          animation: hUp 1s cubic-bezier(0.22,1,0.36,1) 0.1s both;
        }

        .hero-title .hl-cyan {
          background: linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .hero-title .hl-green {
          background: linear-gradient(135deg, #00FFA3 0%, #00E5FF 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* ── Subtitle ── */
        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: #8A9BB0;
          max-width: 600px;
          margin: 0 auto 44px;
          line-height: 1.78;
          font-weight: 300;
          animation: hUp 1s cubic-bezier(0.22,1,0.36,1) 0.2s both;
        }

        .hero-sub strong {
          color: #E8EDF2;
          font-weight: 500;
        }

        /* ── Actions ── */
        .hero-actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 72px;
          animation: hUp 1s cubic-bezier(0.22,1,0.36,1) 0.3s both;
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #00E5FF;
          color: #080C10;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          padding: 15px 32px;
          border-radius: 12px;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: all 0.22s cubic-bezier(0.22,1,0.36,1);
        }

        .hero-btn-primary::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .hero-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow:
            0 0 0 1px rgba(0,229,255,0.5),
            0 0 40px rgba(0,229,255,0.4),
            0 12px 28px rgba(0,0,0,0.35);
        }

        .hero-btn-primary:hover::before { opacity: 1; }

        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #E8EDF2;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          padding: 14px 28px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          text-decoration: none;
          transition: all 0.22s cubic-bezier(0.22,1,0.36,1);
        }

        .hero-btn-secondary:hover {
          border-color: rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.05);
          color: #fff;
        }

        /* ── Trust line ── */
        .hero-trust {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px 20px;
          margin-bottom: 64px;
          font-size: 0.8rem;
          color: #4A5568;
          animation: hUp 1s cubic-bezier(0.22,1,0.36,1) 0.38s both;
        }

        .hero-trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .hero-trust-item::before {
          content: '✓';
          color: #00FFA3;
          font-weight: 700;
          font-size: 0.78rem;
        }

        /* ── Stats ── */
        .hero-stats {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          overflow: hidden;
          background: rgba(14,19,24,0.8);
          backdrop-filter: blur(12px);
          animation: hUp 1s cubic-bezier(0.22,1,0.36,1) 0.45s both;
        }

        .hero-stat {
          flex: 1;
          min-width: 120px;
          padding: 24px 20px;
          text-align: center;
          border-right: 1px solid rgba(255,255,255,0.07);
          position: relative;
          transition: background 0.2s;
        }

        .hero-stat:last-child { border-right: none; }
        .hero-stat:hover { background: rgba(0,229,255,0.04); }

        .hero-stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 2.2rem;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.04em;
          color: #fff;
          margin-bottom: 6px;
        }

        .hero-stat-num span { color: #00E5FF; }

        .hero-stat-label {
          font-size: 0.68rem;
          color: #4A5568;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          line-height: 1.3;
        }

        @keyframes hUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: none; }
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .hero-section { padding: 100px 16px 60px; }
          .hero-title { letter-spacing: -0.03em; }
          .hero-actions { flex-direction: column; align-items: center; }
          .hero-btn-primary, .hero-btn-secondary { width: 100%; max-width: 340px; justify-content: center; }
          .hero-stats { border-radius: 14px; }
          .hero-stat { min-width: 90px; padding: 18px 12px; }
          .hero-stat-num { font-size: 1.7rem; }
        }
      `}</style>

      <section className="hero-section">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-vignette" />
        <div className="hero-grid-lines" />
        <div className="hero-orb" />
        <div className="hero-bottom-fade" />

        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Disponible para nuevos proyectos · Tucumán, Argentina
          </div>

          {/* Title */}
          <h1 className="hero-title">
            Software que<br />
            <span className="hl-cyan">transforma</span><br />
            <span className="hl-green">negocios reales.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-sub">
            Webs · Apps Mobile · Sistemas de Escritorio · Automatizaciones con IA.<br />
            <strong>Presupuesto GRATIS</strong> · Primera entrega en <strong>48hs</strong> · El <strong>código es tuyo</strong>.
          </p>

          {/* CTAs */}
          <div className="hero-actions">
            <a
              href="https://wa.me/5493815502176?text=Hola!%20Quiero%20una%20consulta%20gratis."
              target="_blank"
              rel="noreferrer"
              className="hero-btn-primary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Consulta gratis por WhatsApp
            </a>
            <a href="#services" onClick={scrollTo("services")} className="hero-btn-secondary">
              Ver servicios ↓
            </a>
          </div>

          {/* Trust signals */}
          <div className="hero-trust">
            <span className="hero-trust-item">Sin costo inicial de consulta</span>
            <span className="hero-trust-item">Código 100% tuyo</span>
            <span className="hero-trust-item">Sin contratos de permanencia</span>
            <span className="hero-trust-item">Comunicación directa</span>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            {STATS.map((s) => (
              <div className="hero-stat" key={s.l}>
                <div className="hero-stat-num">{s.n}<span>{s.s}</span></div>
                <div className="hero-stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}