import { useState, useEffect } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <>
      <style>{`
        .sc-header {
          position: sticky; top: 0; z-index: 100;
          background: rgba(8,12,16,0.75);
          backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          transition: padding 0.3s;
        }
        .sc-header-inner {
          max-width: 1160px; margin: 0 auto;
          padding: 0 24px;
          height: ${scrolled ? "56px" : "68px"};
          display: flex; align-items: center; justify-content: space-between;
          transition: height 0.3s;
        }
        .sc-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none;
        }
        .sc-logo-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: #00E5FF;
          box-shadow: 0 0 12px #00E5FF;
          animation: pulseDot 2s ease-out infinite;
          flex-shrink: 0;
        }
        @keyframes pulseDot {
          0%   { box-shadow: 0 0 0 0 rgba(0,229,255,0.6); }
          70%  { box-shadow: 0 0 0 8px rgba(0,229,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,229,255,0); }
        }
        .sc-logo img {
          height: 34px; border-radius: 6px; object-fit: contain;
        }
        .sc-logo-brand {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 1.15rem;
          color: #FFFFFF; letter-spacing: -0.02em;
        }
        .sc-nav {
          display: flex; align-items: center; gap: 32px;
          list-style: none;
        }
        .sc-nav a {
          color: #6B7A8D; text-decoration: none;
          font-size: 0.9rem; font-weight: 500;
          transition: color 0.2s; position: relative;
        }
        .sc-nav a::after {
          content: ''; position: absolute;
          bottom: -3px; left: 0; width: 0; height: 1.5px;
          background: #00E5FF; transition: width 0.3s;
        }
        .sc-nav a:hover { color: #E8EDF2; }
        .sc-nav a:hover::after { width: 100%; }
        .sc-nav-cta {
          background: #00E5FF !important;
          color: #080C10 !important;
          padding: 8px 18px;
          border-radius: 8px;
          font-weight: 700 !important;
          font-size: 0.85rem !important;
          transition: box-shadow 0.2s, transform 0.2s !important;
        }
        .sc-nav-cta::after { display: none !important; }
        .sc-nav-cta:hover {
          box-shadow: 0 0 24px rgba(0,229,255,0.45) !important;
          transform: translateY(-1px);
          color: #080C10 !important;
        }
        .sc-menu-btn {
          display: none; flex-direction: column; gap: 5px;
          background: transparent; border: none; cursor: pointer;
          padding: 4px;
        }
        .sc-menu-btn span {
          width: 24px; height: 2px;
          background: #E8EDF2; border-radius: 2px;
          transition: all 0.3s;
          display: block;
        }
        .sc-mobile-nav {
          display: none;
          flex-direction: column; gap: 0;
          background: rgba(8,12,16,0.95);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255,255,255,0.07);
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.35s ease;
        }
        .sc-mobile-nav.show { max-height: 300px; }
        .sc-mobile-nav a {
          color: #E8EDF2; text-decoration: none;
          font-size: 1rem; padding: 14px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: color 0.2s, background 0.2s;
        }
        .sc-mobile-nav a:hover { color: #00E5FF; background: rgba(0,229,255,0.04); }
        @media (max-width: 700px) {
          .sc-nav { display: none; }
          .sc-menu-btn { display: flex; }
          .sc-mobile-nav { display: flex; }
        }
      `}</style>

      <header className="sc-header">
        <div className="sc-header-inner">
          <a href="/" className="sc-logo">
            <div className="sc-logo-dot" />
            <img src="/Logo.jpg" alt="SC Software" />
            <span className="sc-logo-brand">SC Software</span>
          </a>

          <nav>
            <ul className="sc-nav">
              <li><a href="#services" onClick={handleSmoothScroll}>Servicios</a></li>
              <li><a href="#plans" onClick={handleSmoothScroll}>Planes</a></li>
              <li><a href="#portfolio" onClick={handleSmoothScroll}>Proyectos</a></li>
              <li>
                <a
                  href="https://wa.me/5493815502176?text=Hola%21%20Quiero%20consultar%20sobre%20sus%20servicios."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sc-nav-cta"
                >
                  Hablemos →
                </a>
              </li>
            </ul>
          </nav>

          <button
            className="sc-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : undefined }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : undefined }} />
          </button>
        </div>

        <div className={`sc-mobile-nav ${menuOpen ? "show" : ""}`}>
          <a href="#services" onClick={handleSmoothScroll}>Servicios</a>
          <a href="#plans" onClick={handleSmoothScroll}>Planes</a>
          <a href="#portfolio" onClick={handleSmoothScroll}>Proyectos</a>
          <a
            href="https://wa.me/5493815502176?text=Hola%21%20Quiero%20consultar%20sobre%20sus%20servicios."
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00E5FF" }}
          >
            💬 WhatsApp
          </a>
        </div>
      </header>
    </>
  );
}