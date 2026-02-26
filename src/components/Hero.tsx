import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/*$%#{}[]";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(0);

    let animId: number;
    const draw = () => {
      ctx.fillStyle = "rgba(8,12,16,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const bright = Math.random() > 0.97;
        ctx.fillStyle = bright ? "#00E5FF" : "rgba(0,229,255,0.18)";
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += Math.random() * 0.4 + 0.3;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .sc-hero {
          position: relative; width: 100%;
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; background: #080C10;
          padding: 100px 24px 80px;
        }
        .sc-hero-canvas {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
        }
        .sc-hero-overlay {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(8,12,16,0.2) 0%, rgba(8,12,16,0.85) 70%);
          pointer-events: none;
        }
        .sc-hero-bottom {
          position: absolute; bottom: 0; left: 0; right: 0; height: 160px;
          background: linear-gradient(to bottom, transparent, #080C10);
          pointer-events: none;
        }
        .sc-hero-content {
          position: relative; z-index: 5;
          text-align: center; max-width: 860px;
          animation: heroFadeUp 1.2s cubic-bezier(0.22,1,0.36,1) forwards;
          opacity: 0;
        }
        @keyframes heroFadeUp {
          from { opacity:0; transform:translateY(30px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .sc-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,229,255,0.08);
          border: 1px solid rgba(0,229,255,0.22);
          color: #00E5FF;
          padding: 6px 16px; border-radius: 100px;
          font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          margin-bottom: 28px;
          animation: heroFadeUp 1s ease 0.1s both;
        }
        .sc-hero-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #00E5FF; box-shadow: 0 0 8px #00E5FF;
          animation: blink 1.4s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .sc-hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.6rem, 7vw, 5.2rem);
          font-weight: 800; line-height: 1.05;
          letter-spacing: -0.03em; color: #FFFFFF;
          margin-bottom: 22px;
          animation: heroFadeUp 1s ease 0.2s both;
        }
        .sc-hero-title .grad {
          background: linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .sc-hero-sub {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: #6B7A8D; max-width: 560px; margin: 0 auto 36px;
          line-height: 1.75; font-weight: 300;
          animation: heroFadeUp 1s ease 0.32s both;
        }
        .sc-hero-sub strong { color: #E8EDF2; font-weight: 500; }
        .sc-hero-actions {
          display: flex; justify-content: center; flex-wrap: wrap; gap: 14px;
          animation: heroFadeUp 1s ease 0.44s both;
        }
        .sc-hero-btn-p {
          display: inline-flex; align-items: center; gap: 10px;
          background: #00E5FF; color: #080C10;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem; font-weight: 700;
          padding: 14px 28px; border-radius: 10px;
          text-decoration: none; border: none; cursor: pointer;
          transition: all 0.2s;
        }
        .sc-hero-btn-p:hover {
          box-shadow: 0 0 32px rgba(0,229,255,0.55), 0 8px 24px rgba(0,0,0,0.3);
          transform: translateY(-2px);
        }
        .sc-hero-btn-g {
          display: inline-flex; align-items: center; gap: 10px;
          background: transparent; color: #E8EDF2;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem; font-weight: 500;
          padding: 13px 24px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          text-decoration: none; cursor: pointer;
          transition: all 0.2s;
        }
        .sc-hero-btn-g:hover {
          border-color: rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.04);
        }
        .sc-hero-stats {
          display: flex; justify-content: center; flex-wrap: wrap; gap: 40px;
          margin-top: 60px; padding-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.07);
          animation: heroFadeUp 1s ease 0.56s both;
        }
        .sc-stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 1.9rem; font-weight: 800;
          color: #FFFFFF; letter-spacing: -0.02em; line-height: 1;
        }
        .sc-stat-num span { color: #00E5FF; font-size: 1.3rem; }
        .sc-stat-lbl {
          font-size: 0.75rem; color: #6B7A8D;
          margin-top: 5px; letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        @media (max-width: 500px) {
          .sc-hero-stats { gap: 24px; }
          .sc-hero-actions { flex-direction: column; align-items: center; }
          .sc-hero-btn-p, .sc-hero-btn-g { width: 100%; max-width: 320px; justify-content: center; }
        }
      `}</style>

      <section className="sc-hero">
        <canvas ref={canvasRef} className="sc-hero-canvas" />
        <div className="sc-hero-overlay" />
        <div className="sc-hero-bottom" />

        <div className="sc-hero-content">
          <div className="sc-hero-badge">
            <div className="sc-hero-badge-dot" />
            Disponible para nuevos proyectos · Tucumán, Argentina
          </div>

          <h1 className="sc-hero-title">
            Software & Diseño Web<br />
            que <span className="grad">transforma</span> negocios
          </h1>

          <p className="sc-hero-sub">
            Webs · Apps Mobile · Sistemas a Medida.<br />
            <strong>Presupuesto GRATIS</strong> · Entrega rápida · Código que escala.
          </p>

          <div className="sc-hero-actions">
            <a className="sc-hero-btn-p" href="#plans" onClick={scrollTo("plans")}>
              Ver Planes
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a
              className="sc-hero-btn-g"
              href="https://wa.me/5493815502176?text=Hola%21%20Estoy%20interesado%20en%20sus%20servicios."
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp directo
            </a>
          </div>

          <div className="sc-hero-stats">
            {[
              { n: "20", s: "+", l: "Proyectos entregados" },
              { n: "100", s: "%", l: "Clientes satisfechos" },
              { n: "3", s: "x", l: "ROI promedio cliente" },
              { n: "48", s: "h", l: "Respuesta garantizada" },
            ].map((st) => (
              <div key={st.l}>
                <div className="sc-stat-num">{st.n}<span>{st.s}</span></div>
                <div className="sc-stat-lbl">{st.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}