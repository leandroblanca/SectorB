import "./Footer.css"
import { FaInstagram, FaWhatsapp, FaFacebookF } from "react-icons/fa";


function Footer() {
    return(
        <footer className="footer">
            <div className="footer-content">
                <h2>
                    SectorB
                </h2>
                <p>
                    Elegancia • Estilo • Precisión
                </p>
            </div>
            <div className="footer-contact">
                <span>
                    Av. Roca 1234
                </span>
                <span>
                    +54 381 627 6191
                </span>
                <span>
                    ✉ contacto@sectorb.com
                </span>
            </div>
            <div className="footer-social">
                <FaFacebookF/>

                <FaInstagram/>

                <FaWhatsapp/>
            </div>
            <div className="footer-copy">
                © 2026 SectorB - Todos los derechos reservados.
            </div>
        </footer>
    )
}

export default Footer;