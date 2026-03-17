const ITEMS = [
  "Páginas Web",
  "Apps Mobile",
  "Sistemas de Escritorio",
  "Automatizaciones con IA",
  "CRM a Medida",
  "Bots de WhatsApp",
  "Integración de APIs",
  "Dashboards & Reportes",
  "Software a Medida",
  "E-commerce",
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="sc-marquee-section">
      <div className="sc-marquee-track">
        {doubled.map((item, i) => (
          <div className="sc-marquee-item" key={i}>
            <span className="sc-marquee-dot" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}