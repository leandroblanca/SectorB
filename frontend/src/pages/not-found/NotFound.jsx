import { FiArrowRight, FiCalendar, FiMapPin, FiScissors, FiUser } from "react-icons/fi";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import useAuthStore from "../../components/store/authStore.js";
import "./NotFound.css";

const destinations = [
  { title: "Nuestros servicios", text: "Conocé los cortes y tratamientos de SectorB.", action: "Explorar", to: "/home#servicios", Icon: FiScissors },
  { title: "Sacar turno", text: "Elegí un servicio, tu barbero y el horario.", action: "Reservar", to: "/book-appointment", Icon: FiCalendar },
  { title: "Mi perfil", text: "Consultá tus turnos y los datos de tu cuenta.", action: "Ingresar", to: "/profile", Icon: FiUser },
  { title: "Atelier y contacto", text: "Encontrá nuestra dirección y cómo comunicarte.", action: "Contactar", to: "/contacto", Icon: FiMapPin },
];

function NotFound() {
  const user = useAuthStore((state) => state.user);
  const home = user?.role === "admin" ? "/admin" : user ? "/home" : "/login";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="not-found-page" aria-labelledby="not-found-title">
        <header className="not-found-intro">
          <p className="not-found-badge">● Extravío de ruta</p>
          <p className="not-found-code">404</p>
          <h1 id="not-found-title">Un sendero fuera del itinerario.</h1>
          <p className="not-found-description">La página que buscás no existe o cambió de ubicación. Podés volver al inicio o seguir por alguno de estos destinos.</p>
          <div className="not-found-actions">
            <Link className="not-found-primary" to={home}>Volver al inicio</Link>
            <Link to="/book-appointment">Agendar tu cita</Link>
          </div>
        </header>

        <nav className="not-found-destinations" aria-labelledby="not-found-destinations-title">
          <h2 id="not-found-destinations-title">Destinos recomendados</h2>
          <div className="not-found-grid">
            {destinations.map(({ title, text, action, to, Icon }) => (
              <Link key={to} to={to} className="not-found-card">
                <Icon className="not-found-card-icon" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
                <span>{action} <FiArrowRight aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </nav>

        <figure className="not-found-quote">
          <blockquote>«Incluso en el extravío, la compostura permanece intacta».</blockquote>
          <figcaption>— SectorB</figcaption>
        </figure>
      </main>
      <Footer />
    </>
  );
}

export default NotFound;
