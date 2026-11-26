import { FiArrowUpRight, FiCalendar, FiMail, FiMapPin, FiMessageCircle, FiNavigation, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import { images } from "../../assets/imagenes.js";
import { ADDRESS, EMAIL, PHONE } from "../../constants/contact.js";
import "./Contact.css";

const mapsQuery = encodeURIComponent(`SectorB, ${ADDRESS}`);
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
const channels = [
  { Icon: FiPhone, label: "Atención telefónica", title: PHONE, description: "Llamanos para consultar por servicios o por un turno.", action: "Llamar ahora", href: `tel:${PHONE.replaceAll(" ", "")}` },
  { Icon: FiMessageCircle, label: "WhatsApp", title: "Chat directo", description: "Escribinos para consultar por tu reserva o por los servicios de SectorB.", action: "Iniciar chat", href: "https://wa.me/5493816276191", external: true },
  { Icon: FiMail, label: "Correo electrónico", title: EMAIL, description: "Enviá tu consulta por correo con los datos que nos ayuden a responderte.", action: "Enviar correo", href: `mailto:${EMAIL}` },
];

function Contact() {
  return (
    <>
      <Navbar />
      <main className="contact-page">
        <div className="contact-container">
          <header className="contact-intro">
            <p className="contact-kicker">● SectorB · Barbería ●</p>
            <h1>Atelier &amp; Ubicación</h1>
            <p>Te esperamos en SectorB. Encontrá nuestra dirección o comunicate con nosotros para consultar por tu próximo turno.</p>
          </header>

          <section className="contact-location" aria-labelledby="contact-location-title">
            <div className="contact-card contact-address">
              <p className="contact-kicker">Nuestra sede</p>
              <h2 id="contact-location-title">SectorB Atelier</h2>
              <div className="contact-address-block">
                <p className="contact-label">Dirección</p>
                <address>{ADDRESS}</address>
                <div className="contact-actions">
                  <a className="contact-button contact-primary" href={mapsUrl} target="_blank" rel="noreferrer"><FiMapPin /> Abrir en Google Maps</a>
                  <a className="contact-button" href={directionsUrl} target="_blank" rel="noreferrer"><FiNavigation /> Cómo llegar</a>
                </div>
              </div>
              <div className="contact-reservation">
                <FiCalendar aria-hidden="true" />
                <div><h3>Disponibilidad de turnos</h3><p>Consultá los días y horarios habilitados en el calendario de reservas.</p></div>
                <Link to="/book-appointment" className="contact-link">Ver horarios <FiArrowUpRight /></Link>
              </div>
            </div>

            <figure className="contact-photo">
              <img src={images.peluqueria3} alt="Interior de barbería" />
              <figcaption><span className="contact-kicker">El atelier</span><strong>La experiencia SectorB</strong></figcaption>
            </figure>
          </section>

          <section className="contact-channels" aria-labelledby="contact-channels-title">
            <header>
              <div><p className="contact-kicker">Líneas directas</p><h2 id="contact-channels-title">Canales de comunicación</h2></div>
              <p>Elegí cómo querés contactarnos.</p>
            </header>
            <div className="contact-channel-grid">
              {channels.map(({ Icon, label, title, description, action, href, external }) => (
                <article className="contact-card contact-channel" key={label}>
                  <div className="contact-icon"><Icon aria-hidden="true" /></div>
                  <p className="contact-label">{label}</p>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <a className="contact-link" href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{action} <FiArrowUpRight /></a>
                </article>
              ))}
            </div>
          </section>

          <figure className="contact-quote">
            <blockquote>“La distinción no precisa de artificios, solo de un punto de encuentro excepcional.”</blockquote>
            <figcaption className="contact-label">SectorB Atelier</figcaption>
          </figure>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Contact;
