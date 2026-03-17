const METRICS = [
  { val: "80%", lbl: "Reducción de trabajo manual" },
  { val: "48h", lbl: "Primera entrega garantizada" },
  { val: "3x",  lbl: "Más seguimientos de venta"  },
  { val: "∞",   lbl: "Escalabilidad del sistema"  },
];

export default function Metrics() {
  return (
    <section className="px-6 pb-28 bg-[#080C10]">
      <div className="sc-container">
        <div className="sc-metrics-grid sc-reveal">
          {METRICS.map((m) => (
            <div className="sc-metric-cell" key={m.lbl}>
              <div className="sc-metric-value">{m.val}</div>
              <div className="sc-metric-label">{m.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}