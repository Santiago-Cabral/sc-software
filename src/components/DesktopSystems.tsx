import "./DesktopSystems.css";
import useInView from "./useInView";

export default function DesktopSystems() {
  const { ref, isIntersecting } = useInView<HTMLDivElement>();

  const sendGeneralWhats = () => {
    const msg =
      "Hola! Estoy interesado en *Sistemas a Medida para Escritorio* y también en el servicio de *Soporte & Mantenimiento*. Me gustaría recibir más información.";
    window.open(
      `https://wa.me/5493815502176?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const sendWhats = (serviceName: string) => {
    const msg = `Hola! Estoy interesado en el servicio de *${serviceName}*. ¿Podrías darme más información?`;
    window.open(
      `https://wa.me/5493815502176?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <section className="ds-section">
      <div className="ds-container">
        <h1 className="ds-title">Sistemas de Escritorio</h1>
        <p className="ds-desc">
          Software profesional instalado en PC o red local. Ultra rápidos,
          estables y diseñados para automatizar tareas críticas de tu negocio.
        </p>

        <div
          ref={ref}
          className={`ds-grid ${isIntersecting ? "is-visible" : ""}`}
        >
          <div className="ds-card">
            <h3>Gestión de Ventas</h3>
            <p>Sistema completo para ventas, clientes, reportes y facturación.</p>
            <ul>
              <li>Historial detallado</li>
              <li>Métricas diarias/mensuales</li>
              <li>Exportación Excel/PDF</li>
            </ul>
            <button
              className="ds-btn"
              onClick={() => sendWhats("Sistema de Gestión de Ventas")}
            >
              Consultar →
            </button>
          </div>

          <div className="ds-card">
            <h3>Gestión de Stock</h3>
            <p>Control de inventario en tiempo real con alertas inteligentes.</p>
            <ul>
              <li>Movimientos automáticos</li>
              <li>Alertas de stock bajo</li>
              <li>Gestión de proveedores</li>
            </ul>
            <button
              className="ds-btn"
              onClick={() => sendWhats("Sistema de Gestión de Stock")}
            >
              Consultar →
            </button>
          </div>

          <div className="ds-card">
            <h3>Turnos & Agenda</h3>
            <p>Ideal para clínicas, talleres, barberías y centros de servicio.</p>
            <ul>
              <li>Multiusuario</li>
              <li>Notificaciones</li>
              <li>Calendario avanzado</li>
            </ul>
            <button
              className="ds-btn"
              onClick={() => sendWhats("Sistema de Turnos & Agenda")}
            >
              Consultar →
            </button>
          </div>

          <div className="ds-card ds-support">
            <h3>Soporte & Mantenimiento</h3>
            <p>Mantené tu sistema rápido, seguro y siempre funcionando.</p>
            <ul>
              <li>Optimización de base de datos</li>
              <li>Parches y mejoras</li>
              <li>Actualizaciones importantes</li>
              <li>Atención prioritaria</li>
            </ul>

            <button
              className="ds-btn"
              onClick={() => sendWhats("Soporte & Mantenimiento de Sistemas de Escritorio")}
            >
              Consultar →
            </button>
          </div>
        </div>

        <button className="ds-btn ds-general" onClick={sendGeneralWhats}>
            Servicio + Soporte →
        </button>
      </div>
    </section>
  );
}
