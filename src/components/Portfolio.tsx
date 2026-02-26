import { useState } from "react";

type Project = {
  title: string;
  tag: string;
  desc: string;
  color: string;
  url?: string;
  img: string;
  tech: string[];
};

const projects: Project[] = [
  {
    title: "Forrajería Jovita",
    tag: "E-commerce",
    desc: "Tienda online completa con catálogo de productos, carrito, pagos con tarjeta, gestión de stock en tiempo real y panel admin completo.",
    color: "#00E5FF",
    url: "https://www.jovita.store",
    img: "https://images.unsplash.com/photo-1601598851547-4302969d0614?q=80&w=900&auto=format&fit=crop",
    tech: ["React", ".NET", "SQL Server", "Payway"],
  },
  {
    title: "Sole Costilla Group",
    tag: "Web Corporativa",
    desc: "Sitio corporativo profesional para grupo inmobiliario. Diseño moderno, formulario de contacto y presentación de servicios.",
    color: "#7B61FF",
    url: "https://solecostillagroup.com",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=900&auto=format&fit=crop",
    tech: ["React", "Vite", "CSS Modules"],
  },
  {
    title: "App de Turnos Médicos",
    tag: "App Mobile",
    desc: "Aplicación iOS y Android para gestión de turnos médicos con calendario avanzado, notificaciones push y panel para profesionales.",
    color: "#FFA500",
    url: undefined,
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80",
    tech: ["React Native", "Node.js", "Push Notifications"],
  },
  {
    title: "Sistema de Gestión",
    tag: "Sistema Desktop",
    desc: "Software de escritorio para ventas, stock e inventario con reportes automáticos, roles de usuario y exportación Excel/PDF.",
    color: "#00FFA3",
    url: undefined,
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=900&q=80",
    tech: ["C# .NET", "WPF", "SQL Server"],
  },
];

export default function Portfolio() {
  const [preview, setPreview] = useState<Project | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const openPreview = (p: Project) => {
    if (!p.url) return;
    setIframeLoaded(false);
    setPreview(p);
  };
  const closePreview = () => setPreview(null);

  return (
    <>
      <style>{`
        .sc-portfolio {
          padding: 100px 0;
          background: var(--surface);
          position: relative;
        }
        .sc-portfolio::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--border) 30%, var(--border) 70%, transparent);
        }
        .sc-portfolio-header { text-align: center; margin-bottom: 60px; }
        .sc-portfolio-sub { color: var(--muted); font-size: 1rem; margin-top: 8px; }
        .sc-portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        /* ── Card ── */
        .sc-p-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 18px; overflow: hidden;
          transition: all 0.3s;
          display: flex; flex-direction: column;
        }
        .sc-p-card:hover {
          transform: translateY(-6px);
          border-color: var(--p-color);
          box-shadow: 0 0 40px rgba(0,0,0,0.3);
        }

        /* ── Thumb ── */
        .sc-p-thumb {
          width: 100%; height: 200px;
          overflow: hidden; position: relative;
        }
        .sc-p-thumb img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.5s ease;
          filter: brightness(0.65) saturate(0.7);
        }
        .sc-p-card:hover .sc-p-thumb img {
          transform: scale(1.06);
          filter: brightness(0.82) saturate(1);
        }
        .sc-p-thumb-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 30%, var(--bg));
          pointer-events: none;
        }
        .sc-p-preview-hover {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.2s;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(2px);
          cursor: pointer; border: none;
        }
        .sc-p-card:hover .sc-p-preview-hover { opacity: 1; }
        .sc-p-preview-pill {
          display: flex; align-items: center; gap: 8px;
          background: var(--p-color); color: #080C10;
          font-family: var(--font-body);
          font-size: 0.85rem; font-weight: 700;
          padding: 9px 22px; border-radius: 100px;
          transition: transform 0.15s;
        }
        .sc-p-preview-hover:hover .sc-p-preview-pill { transform: scale(1.05); }

        /* ── Body ── */
        .sc-p-body { padding: 20px 22px 24px; flex: 1; display: flex; flex-direction: column; }
        .sc-p-top {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 10px;
        }
        .sc-p-tag {
          display: inline-block; padding: 3px 11px; border-radius: 100px;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase; border: 1px solid;
        }
        .sc-p-live {
          display: flex; align-items: center; gap: 5px;
          font-size: 0.7rem; color: #4ade80; font-weight: 600;
        }
        .sc-p-live-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #4ade80;
          animation: livePulse 1.5s ease-in-out infinite;
        }
        @keyframes livePulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .sc-p-title {
          font-family: var(--font-display);
          font-size: 1.1rem; font-weight: 700;
          color: var(--white); margin-bottom: 8px;
        }
        .sc-p-desc {
          font-size: 0.85rem; color: var(--muted);
          line-height: 1.65; margin-bottom: 16px; flex: 1;
        }
        .sc-p-tech {
          display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px;
        }
        .sc-p-tech span {
          font-size: 0.68rem; font-weight: 600;
          padding: 3px 9px; border-radius: 100px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border); color: var(--muted);
        }
        .sc-p-actions { display: flex; gap: 8px; flex-wrap: wrap; }

        .sc-p-btn-preview {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 7px;
          background: var(--p-color); color: #080C10;
          font-family: var(--font-body); font-size: 0.82rem; font-weight: 700;
          padding: 9px 14px; border-radius: 8px;
          border: none; cursor: pointer; transition: all 0.2s;
        }
        .sc-p-btn-preview:hover { filter: brightness(1.12); transform: translateY(-1px); }

        .sc-p-btn-ext {
          display: flex; align-items: center; gap: 6px;
          background: transparent; border: 1px solid var(--border);
          color: var(--muted); font-family: var(--font-body);
          font-size: 0.82rem; font-weight: 500;
          padding: 9px 14px; border-radius: 8px;
          text-decoration: none; transition: all 0.2s;
        }
        .sc-p-btn-ext:hover { border-color: var(--p-color); color: var(--p-color); }

        .sc-p-btn-private {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 7px;
          background: rgba(255,255,255,0.04); border: 1px solid var(--border);
          color: var(--muted); font-family: var(--font-body);
          font-size: 0.82rem; padding: 9px 14px; border-radius: 8px; cursor: default;
        }

        /* ── CTA ── */
        .sc-portfolio-cta { text-align: center; margin-top: 48px; }
        .sc-portfolio-cta a {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; border: 1px solid rgba(0,229,255,0.3);
          color: #00E5FF; font-family: var(--font-body);
          font-size: 0.9rem; font-weight: 600;
          padding: 12px 26px; border-radius: 10px;
          text-decoration: none; transition: all 0.2s;
        }
        .sc-portfolio-cta a:hover { background: rgba(0,229,255,0.07); border-color: rgba(0,229,255,0.6); }

        /* ── MODAL ── */
        .sc-modal-backdrop {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.88);
          backdrop-filter: blur(10px);
          z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          animation: bdIn 0.2s ease;
        }
        @keyframes bdIn { from{opacity:0} to{opacity:1} }

        .sc-modal {
          background: #0E1318;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px; overflow: hidden;
          width: 100%; max-width: 1100px;
          max-height: 90vh;
          display: flex; flex-direction: column;
          box-shadow: 0 40px 100px rgba(0,0,0,0.7);
          animation: modalIn 0.25s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes modalIn {
          from { opacity:0; transform: scale(0.96) translateY(20px); }
          to   { opacity:1; transform: scale(1) translateY(0); }
        }

        /* Browser bar */
        .sc-modal-bar {
          display: flex; align-items: center;
          padding: 10px 14px; gap: 10px;
          background: #131A22;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          flex-shrink: 0;
        }
        .sc-modal-dots { display: flex; gap: 6px; flex-shrink: 0; }
        .sc-modal-dot { width: 11px; height: 11px; border-radius: 50%; cursor: pointer; }
        .sc-modal-dot.r { background: #FF5F57; }
        .sc-modal-dot.y { background: #FEBC2E; }
        .sc-modal-dot.g { background: #28C840; }

        .sc-modal-url-bar {
          flex: 1; background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px; padding: 5px 12px;
          font-size: 0.76rem; color: var(--muted);
          font-family: 'Courier New', monospace;
          display: flex; align-items: center; gap: 6px;
          overflow: hidden; white-space: nowrap;
          min-width: 0;
        }
        .sc-modal-url-bar span { overflow: hidden; text-overflow: ellipsis; }

        .sc-modal-bar-actions { display: flex; gap: 8px; flex-shrink: 0; }
        .sc-modal-ext {
          display: flex; align-items: center; gap: 5px;
          background: rgba(0,229,255,0.1); border: 1px solid rgba(0,229,255,0.25);
          color: #00E5FF; font-size: 0.72rem; font-weight: 600;
          padding: 5px 12px; border-radius: 6px;
          text-decoration: none; cursor: pointer; white-space: nowrap;
          transition: background 0.2s;
        }
        .sc-modal-ext:hover { background: rgba(0,229,255,0.2); }
        .sc-modal-x {
          width: 28px; height: 28px; border-radius: 6px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          color: var(--muted); cursor: pointer; font-size: 0.85rem;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s; flex-shrink: 0;
        }
        .sc-modal-x:hover { background: rgba(255,80,80,0.15); color: #ff6b6b; }

        /* iframe area */
        .sc-modal-body { flex: 1; position: relative; min-height: 0; }
        .sc-modal-spinner {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 14px; background: var(--bg); z-index: 2;
          transition: opacity 0.3s;
        }
        .sc-modal-spinner.gone { opacity: 0; pointer-events: none; }
        .sc-spin-ring {
          width: 38px; height: 38px; border-radius: 50%;
          border: 3px solid rgba(0,229,255,0.12);
          border-top-color: #00E5FF;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to{transform:rotate(360deg)} }
        .sc-spin-txt { color: var(--muted); font-size: 0.82rem; }

        .sc-modal-iframe {
          width: 100%; height: 100%; border: none; display: block; min-height: 560px;
        }

        /* footer */
        .sc-modal-foot {
          padding: 12px 18px;
          background: #131A22; border-top: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 8px; flex-shrink: 0;
        }
        .sc-modal-foot-title {
          font-family: var(--font-display);
          font-size: 0.88rem; font-weight: 700; color: var(--white);
          display: flex; align-items: center; gap: 8px;
        }
        .sc-modal-foot-tag {
          font-size: 0.65rem; font-weight: 700;
          padding: 2px 8px; border-radius: 100px; border: 1px solid;
        }
        .sc-modal-foot-note {
          font-size: 0.72rem; color: var(--muted);
        }
        .sc-modal-foot-note a { color: #00E5FF; }

        @media (max-width: 600px) {
          .sc-modal { border-radius: 12px; max-height: 96vh; }
          .sc-modal-iframe { min-height: 380px; }
          .sc-modal-url-bar { display: none; }
          .sc-modal-ext span { display: none; }
        }
      `}</style>

      <section id="portfolio" className="sc-portfolio">
        <div className="sc-container">
          <div className="sc-portfolio-header sc-reveal">
            <div className="sc-section-label">Trabajos</div>
            <h2 className="sc-section-title">Proyectos que hablan<br />por sí solos</h2>
            <p className="sc-portfolio-sub">
              Hacé clic en "Vista previa" para ver los sitios en vivo directamente acá.
            </p>
          </div>

          <div className="sc-portfolio-grid sc-reveal">
            {projects.map((p) => (
              <article
                key={p.title}
                className="sc-p-card"
                style={{ "--p-color": p.color } as React.CSSProperties}
              >
                {/* Thumbnail */}
                <div className="sc-p-thumb">
                  <img src={p.img} alt={p.title} loading="lazy" />
                  <div className="sc-p-thumb-overlay" />
                  {p.url && (
                    <button
                      className="sc-p-preview-hover"
                      onClick={() => openPreview(p)}
                      aria-label={`Vista previa de ${p.title}`}
                    >
                      <div className="sc-p-preview-pill">
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                        Vista previa
                      </div>
                    </button>
                  )}
                </div>

                {/* Body */}
                <div className="sc-p-body">
                  <div className="sc-p-top">
                    <span className="sc-p-tag" style={{ color: p.color, borderColor: p.color, background: `${p.color}11` }}>
                      {p.tag}
                    </span>
                    {p.url && (
                      <div className="sc-p-live">
                        <div className="sc-p-live-dot" />
                        Live
                      </div>
                    )}
                  </div>

                  <h3 className="sc-p-title">{p.title}</h3>
                  <p className="sc-p-desc">{p.desc}</p>

                  <div className="sc-p-tech">
                    {p.tech.map((t) => <span key={t}>{t}</span>)}
                  </div>

                  <div className="sc-p-actions">
                    {p.url ? (
                      <>
                        <button className="sc-p-btn-preview" onClick={() => openPreview(p)}>
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                          </svg>
                          Vista previa
                        </button>
                        <a href={p.url} target="_blank" rel="noopener noreferrer" className="sc-p-btn-ext">
                          <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                          </svg>
                          Abrir
                        </a>
                      </>
                    ) : (
                      <div className="sc-p-btn-private">🔒 Proyecto privado</div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="sc-portfolio-cta sc-reveal">
            <a href="https://wa.me/5493815502176?text=Hola%21%20Me%20gustar%C3%ADa%20ver%20m%C3%A1s%20proyectos%20y%20consultar%20sobre%20sus%20servicios." target="_blank" rel="noopener noreferrer">
              💬 Ver más proyectos por WhatsApp →
            </a>
          </div>
        </div>
      </section>

      {/* ── MODAL ── */}
      {preview && (
        <div className="sc-modal-backdrop" onClick={closePreview}>
          <div className="sc-modal" onClick={(e) => e.stopPropagation()}>

            {/* Browser bar */}
            <div className="sc-modal-bar">
              <div className="sc-modal-dots">
                <div className="sc-modal-dot r" onClick={closePreview} title="Cerrar" />
                <div className="sc-modal-dot y" />
                <div className="sc-modal-dot g" />
              </div>

              <div className="sc-modal-url-bar">
                <span style={{ color: "#4ade80", flexShrink: 0 }}>🔒</span>
                <span>{preview.url?.replace("https://", "")}</span>
              </div>

              <div className="sc-modal-bar-actions">
                <a href={preview.url} target="_blank" rel="noopener noreferrer" className="sc-modal-ext">
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                  <span>Abrir en nueva pestaña</span>
                </a>
                <button className="sc-modal-x" onClick={closePreview} aria-label="Cerrar">✕</button>
              </div>
            </div>

            {/* iframe */}
            <div className="sc-modal-body">
              <div className={`sc-modal-spinner ${iframeLoaded ? "gone" : ""}`}>
                <div className="sc-spin-ring" />
                <span className="sc-spin-txt">Cargando {preview.title}...</span>
              </div>
              <iframe
                src={preview.url}
                className="sc-modal-iframe"
                title={`Vista previa — ${preview.title}`}
                onLoad={() => setIframeLoaded(true)}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              />
            </div>

            {/* Footer */}
            <div className="sc-modal-foot">
              <div className="sc-modal-foot-title">
                {preview.title}
                <span className="sc-modal-foot-tag" style={{ color: preview.color, borderColor: preview.color, background: `${preview.color}11` }}>
                  {preview.tag}
                </span>
              </div>
              <span className="sc-modal-foot-note">
                Si no carga →{" "}
                <a href={preview.url} target="_blank" rel="noopener noreferrer">abrilo en nueva pestaña</a>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}