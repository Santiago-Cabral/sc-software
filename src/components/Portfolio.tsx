import "./portfolio.css";

export default function Portfolio() {
  const projects = [
     {
    title: "E-commerce Moderno",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop",
    tag: "Web",
  },
    {
      title: "App de Turnos Médicos",
      img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1000&q=80",
      tag: "App",
    },
    {
      title: "Sistema de Gestión",
      img: "https://images.unsplash.com/photo-1556155092-8707de31f9c4?auto=format&fit=crop&w=1000&q=80",
      tag: "Sistema",
    },
  ];

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container fade-in">

        <header className="portfolio-header">
          <h2>Proyectos</h2>
          <p className="subtitle">
            Algunos trabajos, diseños y sistemas desarrollados.
          </p>
        </header>

        <div className="portfolio-grid">
          {projects.map((p, i) => (
            <article key={i} className="portfolio-card">
              <div className="p-img">
                <img src={p.img} alt={p.title} />
              </div>

              <div className="p-body">
                <span className="p-tag">{p.tag}</span>
                <h3>{p.title}</h3>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
