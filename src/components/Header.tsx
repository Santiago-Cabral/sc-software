import { useState, useEffect } from "react";

const NAV = [
  { label: "Servicios",           href: "#services" },
  { label: "IA & Automatización", href: "#ia" },
  { label: "Planes",              href: "#plans" },
  { label: "Proyectos",           href: "#portfolio" },
  { label: "FAQ",                 href: "#faq" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const smooth = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
          backdrop-filter: blur(20px);
          transition: all 0.3s;
          border-bottom: 1px solid transparent;
        }
        .sc-header.scrolled {
          background: rgba(8,12,16,0.9);
          border-bottom-color: var(--border);
        }
        .sc-nav-container {
          max-width: 1200px; margin: 0 auto; padding: 0 24px;
          height: 80px; display: flex; align-items: center; justify-content: space-between;
        }
        .sc-logo {
          font-family: var(--font-display); font-size: 1.4rem; font-weight: 800;
          color: #fff; text-decoration: none; display: flex; align-items: center; gap: 8px;
        }
        .sc-logo-dot { width: 8px; height: 8px; background: #00E5FF; border-radius: 50%; box-shadow: 0 0 12px #00E5FF; }
        .sc-nav-list { display: flex; gap: 32px; list-style: none; align-items: center; }
        .sc-nav-list a { 
          color: var(--muted); text-decoration: none; font-size: 0.9rem; font-weight: 500; transition: color 0.2s;
        }
        .sc-nav-list a:hover { color: #fff; }
        .sc-nav-cta {
          background: #fff; color: #080C10 !important; padding: 10px 20px; border-radius: 10px; font-weight: 700 !important;
        }
        @media (max-width: 850px) { .sc-nav-list { display: none; } }
      `}</style>

      <header className={`sc-header ${scrolled ? "scrolled" : ""}`}>
        <div className="sc-nav-container">
          <a href="/" className="sc-logo">
            SC Software <span className="sc-logo-dot" />
          </a>

          <nav>
            <ul className="sc-nav-list">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} onClick={smooth}>{n.label}</a>
                </li>
              ))}
              <li>
                <a
                  href="https://wa.me/5493815502176?text=Hola!%20Quiero%20consultar%20sobre%20sus%20servicios."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sc-nav-cta"
                >
                  Hablemos →
                </a>
              </li>
            </ul>
          </nav>

          <button className="sc-burger" onClick={() => setMenuOpen(!menuOpen)}>
             <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : undefined }} />
             <span style={{ opacity: menuOpen ? 0 : 1 }} />
             <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : undefined }} />
          </button>
        </div>
      </header>
    </>
  );
}