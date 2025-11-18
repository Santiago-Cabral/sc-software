import "./MobileApps.css";
import useInView from "./useInView";

export default function MobileApps() {
  const { ref, isIntersecting } = useInView<HTMLDivElement>();

  const sendGeneralWhats = () => {
    const msg =
      "Hola! Estoy interesado en *Apps Mobile* y también en el plan de *Soporte & Mantenimiento*. Me gustaría recibir más información.";
    window.open(
      `https://wa.me/5493815502176?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const sendWhats = (serviceName: string) => {
    const msg = `Hola! Estoy interesado en la *${serviceName}*. ¿Podrías darme más información?`;
    window.open(
      `https://wa.me/5493815502176?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <section className="ma-section">
      <div className="ma-container">
        <h1 className="ma-title">Apps Mobile</h1>
        <p className="ma-desc">
          Desarrollo aplicaciones Android + iOS rápidas, modernas y conectadas a
          tu negocio. Con panel administrativo, APIs y notificaciones push.
        </p>

        <div
          ref={ref}
          className={`ma-grid ${isIntersecting ? "is-visible" : ""}`}
        >
          <div className="ma-card">
            <h3>App de Servicios</h3>
            <p>Reservas, turnos, pagos y notificaciones automáticas.</p>
            <ul>
              <li>Panel admin</li>
              <li>Push Notifications</li>
              <li>Pasarelas de pago</li>
            </ul>
            <button
              className="ma-btn"
              onClick={() => sendWhats("App de Servicios")}
            >
              Consultar →
            </button>
          </div>

          <div className="ma-card">
            <h3>App Comercial</h3>
            <p>Catálogo, ventas, estados de pedidos y seguimiento.</p>
            <ul>
              <li>Carrito</li>
              <li>Inventario</li>
              <li>Usuarios y permisos</li>
            </ul>
            <button
              className="ma-btn"
              onClick={() => sendWhats("App Comercial")}
            >
              Consultar →
            </button>
          </div>

          <div className="ma-card">
            <h3>App con GPS & Real Time</h3>
            <p>
              Envíos, tracking en vivo, logística y apps tipo Uber/Rappi.
            </p>
            <ul>
              <li>Mapas en tiempo real</li>
              <li>Rutas automáticas</li>
              <li>Panel operativo</li>
            </ul>
            <button
              className="ma-btn"
              onClick={() => sendWhats("App con GPS & Tiempo Real")}
            >
              Consultar →
            </button>
          </div>

          <div className="ma-card ma-support">
            <h3>Soporte & Mantenimiento</h3>
            <p>Actualización, estabilidad y seguridad para tu app.</p>
            <ul>
              <li>Actualizaciones de librerías</li>
              <li>Corrección de errores</li>
              <li>Monitoreo 24/7</li>
              <li>Optimización</li>
            </ul>
            <button
              className="ma-btn"
              onClick={() => sendWhats("Soporte & Mantenimiento Mobile")}
            >
              Consultar →
            </button>
          </div>
        </div>

        <button className="ma-btn ma-general" onClick={sendGeneralWhats}>
          Servicio + Soporte →
        </button>
      </div>
    </section>
  );
}
