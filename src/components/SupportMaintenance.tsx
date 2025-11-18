import "./SupportMaintenance.css";
import useInView from "./useInView";

export default function SupportMaintenance() {
  const { ref: r1, isIntersecting: v1 } = useInView<HTMLDivElement>();
  const { ref: r2, isIntersecting: v2 } = useInView<HTMLDivElement>();
  const { ref: r3, isIntersecting: v3 } = useInView<HTMLDivElement>();

  const sendWhats = (topic: string) => {
    const phone = "5493815502176";
    const msg = `Hola! Estoy interesado en el plan de *${topic}* de soporte y mantenimiento. ¿Podemos hablar sobre precios y frecuencia?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <main className="sup-section">
      <div className="sup-container">
        <header className="sup-header">
          <h1 className="sup-title">Soporte & Mantenimiento</h1>
          <p className="sup-lead">
            Mantenemos tu web, app o sistema 100% operativo con actualizaciones,
            mejoras, monitoreo y asistencia técnica directa. Evitá caídas,
            errores y pérdida de clientes.
          </p>
        </header>

        <div className="sup-grid">
          <article ref={r1} className={`sup-card ${v1 ? "is-visible" : ""}`}>
            <h3>Plan Básico</h3>
            <p>Ideal para proyectos pequeños que necesitan estabilidad.</p>
            <ul>
              <li>Actualizaciones esenciales</li>
              <li>Corrección de errores menores</li>
              <li>Backups mensuales</li>
              <li>Tiempo de respuesta: 48h</li>
            </ul>
            <div className="sup-actions">
              <button className="sup-cta" onClick={() => sendWhats("Plan Básico")}>
                Solicitar Info
              </button>
              <a className="sup-more" href="/">Volver al inicio</a>
            </div>
          </article>

          <article ref={r2} className={`sup-card ${v2 ? "is-visible" : ""}`}>
            <h3>Plan Profesional</h3>
            <p>Perfecto para webs, apps o sistemas activos con tráfico constante.</p>
            <ul>
              <li>Monitoreo y optimización regular</li>
              <li>Backups semanales</li>
              <li>Actualizaciones de seguridad</li>
              <li>Soporte prioritario (24h)</li>
            </ul>
            <div className="sup-actions">
              <button className="sup-cta" onClick={() => sendWhats("Plan Profesional")}>
                Solicitar Info
              </button>
              <a className="sup-more" href="/">Volver al inicio</a>
            </div>
          </article>

          <article ref={r3} className={`sup-card ${v3 ? "is-visible" : ""}`}>
            <h3>Plan Full Enterprise</h3>
            <p>Para operaciones críticas donde el tiempo es dinero.</p>
            <ul>
              <li>Monitoreo 24/7</li>
              <li>Backups diarios</li>
              <li>Optimización avanzada</li>
              <li>Atención inmediata</li>
              <li>Actualización continua del proyecto</li>
            </ul>
            <div className="sup-actions">
              <button className="sup-cta" onClick={() => sendWhats("Plan Full Enterprise")}>
                Solicitar Info
              </button>
              <a className="sup-more" href="/">Volver al inicio</a>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
