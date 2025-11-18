import './footer.css';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h3>SC Softwares</h3>
          <p>Desarrollo • Diseño • Soluciones a medida</p>
        </div>

        <div className="footer-contact">
          <h4>Contacto</h4>
          <ul>
            <li>📩 <strong>s1c.softwares@gmail.com</strong></li>
            <li>
              📱{" "}
              <a
                href="https://wa.me/3815502176"
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar por WhatsApp
              </a>
            </li>
            <li>📍 Tucumán, Argentina</li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Redes</h4>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/santiago-nahuel-cabral-058620212" target="_blank">💼 LinkedIn</a>
            </li>
            <li>
              <a href="https://www.instagram.com/sc_software.tuc" target="_blank">📸 Instagram</a>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-copy">
        © {new Date().getFullYear()} SC Softwares — Todos los derechos reservados.
      </div>
    </footer>
  );
}
