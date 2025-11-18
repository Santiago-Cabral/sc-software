import { useState } from "react";
import "./header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");

    if (href?.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setMenuOpen(false); // cerrar en mobile
    }
  };

  return (
    <header className="header">
      <div className="header-container">

        {/* LOGO */}
        <a href="/" className="logo-wrap">
          <img src="/Logo.jpg" alt="SC Software" className="logo" />
          <span className="brand">SC Software</span>
        </a>

        {/* NAV (DESKTOP) */}
        <nav className="nav">
          <a href="#services" onClick={handleSmoothScroll}>Servicios</a>
          <a href="#plans" onClick={handleSmoothScroll}>Planes</a>
          <a href="#portfolio" onClick={handleSmoothScroll}>Proyectos</a>
        </nav>

        {/* BOTÓN MENU MOBILE */}
        <button
          className={`menu-btn ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* NAV MOBILE */}
      <div className={`mobile-nav ${menuOpen ? "show" : ""}`}>
        <a href="#services" onClick={handleSmoothScroll}>Servicios</a>
        <a href="#plans" onClick={handleSmoothScroll}>Planes</a>
        <a href="#portfolio" onClick={handleSmoothScroll}>Proyectos</a>
      </div>
    </header>
  );
}
