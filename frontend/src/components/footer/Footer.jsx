import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { ADDRESS, EMAIL, PHONE } from "../../constants/contact.js";

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
          <span><FiMapPin className="ui-icon" aria-hidden="true" /> {ADDRESS}</span>
          <span><FiPhone className="ui-icon" aria-hidden="true" /> {PHONE}</span>
          <span><FiMail className="ui-icon" aria-hidden="true" /> {EMAIL}</span>
        </div>
      </div>
      <div className="footer-navigation">
        <h3>Navegacion</h3>
        <Link to="/home">Inicio</Link>
        <Link to="/book-appointment">Reservar Turno</Link>
        <Link to="/my-appointments">Mis turnos</Link>
        <Link to="/profile">Mi Perfil</Link>
        <Link to="/contacto"><FiMail className="ui-icon" aria-hidden="true" /> Contacto</Link>
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
