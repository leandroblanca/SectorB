import "./Footer.css";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaFacebookF } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>SECTORB</h2>
        <p>
          Elevando el estándar del grooming masculino a través de la maestría
          técnica y una atención excepcional.
        </p>

        <div className="footer-contact">
          <span>Av. Roca 1234</span>
          <span>+54 381 627 6191</span>
          <span>✉ contacto@sectorb.com</span>
        </div>
      </div>
      <div className="footer-navigation">
        <h3>Navegacion</h3>
        <Link to="/home">Inicio</Link>
        <Link to="/book-appointment">Reservar Turno</Link>
        <Link to="/my-appointments">Mis turnos</Link>
        <Link to="/profile">Mi Perfil</Link>
      </div>
      <div className="footer-social">
        <h3>Seguinos</h3>
         <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
            <FaFacebookF />
          </a>

          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>

          <a href="https://www.whatsapp.com/" target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
      </div>
      <div className="footer-copy">
        <p>© 2026 SECTORB. TODOS LOS DERECHOS RESERVADOS</p>
        <span>Elegancia • Estilo • Precision</span>
      </div>
    </footer>
  );
}

export default Footer;
