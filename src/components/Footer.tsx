export default function Footer() {
  return (
    <>
      <style>{`
        .sc-footer {
          background: var(--surface);
          border-top: 1px solid var(--border);
          padding: 60px 0 32px;
        }
        .sc-footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
        }
        @media (max-width: 720px) {
          .sc-footer-grid { grid-template-columns: 1fr; gap: 32px; }
        }
        .sc-footer-brand-name {
          font-family: var(--font-display);
          font-size: 1.3rem; font-weight: 800;
          color: var(--white); margin-bottom: 10px;
          display: flex; align-items: center; gap: 8px;
        }
        .sc-footer-brand-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #00E5FF; box-shadow: 0 0 10px #00E5FF;
          flex-shrink: 0;
        }
        .sc-footer-brand-desc {
          color: var(--muted); font-size: 0.9rem;
          line-height: 1.7; max-width: 280px;
          margin-bottom: 20px;
        }
        .sc-footer-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(0,229,255,0.08);
          border: 1px solid rgba(0,229,255,0.2);
          color: #00E5FF;
          font-size: 0.72rem; font-weight: 600;
          padding: 5px 12px; border-radius: 100px;
          letter-spacing: 0.06em;
        }
        .sc-footer-badge span {
          width: 5px; height: 5px; border-radius: 50%;
          background: #00E5FF;
          animation: footerPulse 1.5s ease-in-out infinite;
        }
        @keyframes footerPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .sc-footer-col-title {
          font-family: var(--font-display);
          font-size: 0.8rem; font-weight: 700;
          color: var(--white); letter-spacing: 0.1em;
          text-transform: uppercase; margin-bottom: 16px;
        }
        .sc-footer-list {
          list-style: none; display: flex; flex-direction: column; gap: 10px;
        }
        .sc-footer-list li { color: var(--muted); font-size: 0.88rem; }
        .sc-footer-list a {
          color: var(--muted); text-decoration: none;
          transition: color 0.2s;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .sc-footer-list a:hover { color: #00E5FF; }
        .sc-footer-divider {
          height: 1px;
          background: var(--border);
          margin-bottom: 28px;
        }
        .sc-footer-bottom {
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 12px;
        }
        .sc-footer-copy {
          color: var(--muted); font-size: 0.8rem;
        }
        .sc-footer-location {
          color: var(--muted); font-size: 0.8rem;
          display: flex; align-items: center; gap: 5px;
        }
      `}</style>

      <footer className="sc-footer">
        <div className="sc-container">
          <div className="sc-footer-grid">
            <div>
              <div className="sc-footer-brand-name">
                <div className="sc-footer-brand-dot" />
                SC Software
              </div>
              <p className="sc-footer-brand-desc">
                Desarrollo de software, diseño web y apps mobile desde Tucumán, Argentina. Soluciones a medida para cada negocio.
              </p>
              <div className="sc-footer-badge">
                <span />
                Disponible para nuevos proyectos
              </div>
            </div>

            <div>
              <div className="sc-footer-col-title">Contacto</div>
              <ul className="sc-footer-list">
                <li>📩 s1c.softwares@gmail.com</li>
                <li>
                  <a
                    href="https://wa.me/5493815502176"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💬 WhatsApp directo
                  </a>
                </li>
                <li>📍 Tucumán, Argentina</li>
              </ul>
            </div>

            <div>
              <div className="sc-footer-col-title">Redes</div>
              <ul className="sc-footer-list">
                <li>
                  <a
                    href="https://www.linkedin.com/in/santiago-nahuel-cabral-058620212"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💼 LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/sc_software.tuc"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📸 Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="sc-footer-divider" />

          <div className="sc-footer-bottom">
            <div className="sc-footer-copy">
              © {new Date().getFullYear()} SC Software — Todos los derechos reservados.
            </div>
            <div className="sc-footer-location">
              🇦🇷 Hecho con ☕ en Tucumán, Argentina
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}