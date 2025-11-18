import "./WebServices.css";
import useInView from "./useInView";

export default function WebServices() {
  const { ref, isIntersecting } = useInView<HTMLDivElement>();

  const sendGeneralWhats = () => {
    const msg =
      "Hola! Estoy interesado en *Páginas Web* y también en el plan de *Soporte & Mantenimiento*. Me gustaría recibir más información.";
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
    <section className="ws-section">
      <div className="ws-container">
        <h1 className="ws-title">Páginas Web</h1>
        <p className="ws-desc">
          Sitios modernos, rápidos, seguros y optimizados para generar ventas.
          Ideal para empresas, tiendas online, servicios profesionales y marcas
          personales.
        </p>

        <div
          ref={ref}
          className={`ws-grid ${isIntersecting ? "is-visible" : ""}`}
        >
          <div className="ws-card">
            <h3>Landing Page Premium</h3>
            <p>
              Una página impactante diseñada para convertir clientes desde redes
              sociales y anuncios.
            </p>
            <ul>
              <li>Sección hero animada</li>
              <li>SEO básico</li>
              <li>WhatsApp automático</li>
              <li>Optimizada para móviles</li>
            </ul>
            <button className="ws-btn" onClick={() => sendWhats("Landing Page Premium")}>
              Consultar →
            </button>
          </div>

          <div className="ws-card">
            <h3>Web Corporativa</h3>
            <p>
              Ideal para empresas y estudios profesionales que necesitan
              presencia sólida en internet.
            </p>
            <ul>
              <li>5–10 secciones completas</li>
              <li>Branding personalizado</li>
              <li>Formularios avanzados</li>
              <li>Panel de administración opcional</li>
            </ul>
            <button className="ws-btn" onClick={() => sendWhats("Web Corporativa")}>
              Consultar →
            </button>
          </div>

          <div className="ws-card">
            <h3>Tienda Online</h3>
            <p>
              Sistema de ventas con carrito, panel administrativo y pagos en
              línea.
            </p>
            <ul>
              <li>Mercado Pago integrado</li>
              <li>Gestión de stock</li>
              <li>Panel de productos</li>
              <li>Automatización de órdenes</li>
            </ul>
            <button className="ws-btn" onClick={() => sendWhats("Tienda Online")}>
              Consultar →
            </button>
          </div>

          <div className="ws-card ws-support">
            <h3>Soporte & Mantenimiento</h3>
            <p>Mantengo tu web rápida, segura y funcionando 24/7.</p>
            <ul>
              <li>Actualizaciones</li>
              <li>Backups semanales</li>
              <li>Monitoreo y seguridad</li>
              <li>Correcciones y mejoras</li>
            </ul>
            <button className="ws-btn" onClick={() => sendWhats("Soporte & Mantenimiento Web")}>
              Consultar →
            </button>
          </div>
        </div>

        <button className="ws-btn ws-general" onClick={sendGeneralWhats}>
          Servicio + Soporte →
        </button>
      </div>
    </section>
  );
}
