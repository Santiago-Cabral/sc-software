import { useEffect, useRef } from "react";
import "./Hero.css";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.8;
    };
    resize();
    window.addEventListener("resize", resize);

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/*$%#";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(0);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#a0a82eff";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (x < canvas.width) {
          ctx.fillText(text, x, y);
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += Math.random() * 0.4 + 0.4;
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  // 🔥 SMOOTH SCROLL AL HACER CLIC
  const scrollToPlans = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("plans");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="hero-content fade-in">
        <h1 className="hero-title">
          Desarrollo Web & Apps desde <span>Tucumán</span>
        </h1>

        <p className="hero-subtitle slide-up">
          Webs • Apps Mobile • Sistemas a medida. <br />
          Presupuesto <strong>GRATIS</strong> y entrega rápida.
        </p>

        <div className="hero-buttons slide-up">
          {/* 🔥 BOTÓN CON SCROLL SUAVE */}
          <a className="btn-primary" href="#plans" onClick={scrollToPlans}>
            Ver Planes
          </a>

          {/* Botón WhatsApp */}
          <a
            className="btn-secondary"
            href="https://wa.me/5493815502176?text=Hola%2C%20estoy%20interesado%20en%20contratar%20sus%20servicios%20de%20desarrollo%20web%20y%20apps."
            target="_blank"
            rel="noopener noreferrer"
          >
            Contactar
          </a>
        </div>
      </div>
    </section>
  );
}
