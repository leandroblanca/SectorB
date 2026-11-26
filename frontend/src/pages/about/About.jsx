import { FiAward, FiClock, FiScissors, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import { images } from "../../assets/imagenes.js";
import "./About.css";

const values = [
  { title: "Distinción", Icon: FiAward, description: "Elegancia sobria y libre de artificios. Cada propuesta respeta la fisonomía individual, realzando la postura y prestancia con discreción impecable." },
  { title: "Calma", Icon: FiClock, description: "Respeto inquebrantable por el tiempo ajeno. Garantizamos sesiones privadas, sin superposiciones ni prisas, en un entorno de silencios medidos y atmósfera templada." },
  { title: "Oficio puro", Icon: FiScissors, description: "Artesanía en su máxima pureza. Navajas japonesas forjadas a mano, pomadas de formulación botánica propia y el pulso sereno de maestros barberos." },
];

function About() {
  return (
    <>
      <Navbar />
      <main className="about-page">
        <header className="about-intro about-container">
          <p className="about-kicker">Atelier de grooming · Manifiesto</p>
          <h1>La Esencia de SectorB</h1>
          <p>Un santuario para el caballero contemporáneo, donde el tiempo se detiene para dar paso a la precisión, la calma y el rigor del oficio tradicional.</p>
        </header>

        <section className="about-philosophy about-container" aria-labelledby="about-philosophy-title">
          <div>
            <p className="about-kicker">Nuestra filosofía</p>
            <h2 id="about-philosophy-title">El arte de la pausa y el filo perfecto</h2>
            <blockquote>“No creemos en la prisa de las tendencias efímeras, sino en la serenidad de una técnica consagrada por generaciones.”</blockquote>
            <p>SectorB nace de la convicción de que el arreglo personal masculino no es una rutina utilitaria, sino un ritual íntimo de presencia y carácter. Concebimos nuestro espacio como una extensión de un club privado, un remanso de penumbra acogedora donde el murmullo de la ciudad se disuelve tras las puertas de roble.</p>
            <p>Aquí, cada corte a tijera y cada afeitado a navaja abierta con toalla tibia responde a un estudio milimétrico de las facciones y a una dedicación reverente. Entendemos el cabello y la barba como la arquitectura viva del rostro del caballero.</p>
          </div>
          <figure className="about-chair">
            <div className="about-chair-photo">
              <img src={images.peluqueria2} alt="Sillón tradicional de cuero en una barbería de madera oscura" />
            </div>
            <figcaption>Sillón tradicional · Atelier central</figcaption>
          </figure>
        </section>

        <section className="about-values" aria-labelledby="about-values-title">
          <div className="about-container">
            <header>
              <p className="about-kicker">Fundamentos</p>
              <h2 id="about-values-title">Valores que forjan el carácter</h2>
            </header>
            <div className="about-values-grid">
              {values.map(({ title, description, Icon }) => (
                <article key={title}>
                  <Icon aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <figure className="about-quote about-container">
          <span aria-hidden="true">❞</span>
          <blockquote>“La verdadera distinción reside en el cuidado de los detalles invisibles.”</blockquote>
          <figcaption className="about-kicker">SectorB · Tratado de barbería</figcaption>
        </figure>

        <section className="about-booking" aria-labelledby="about-booking-title">
          <p className="about-kicker">Cita en el atelier</p>
          <h2 id="about-booking-title">Descubre la Experiencia SectorB</h2>
          <p>Permítase un instante de pausa absoluta en manos expertas. Seleccione su momento predilecto y viva el auténtico ritual de grooming tradicional.</p>
          <Link to="/book-appointment"><FiCalendar className="ui-icon" aria-hidden="true" /> Reservar turno</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default About;
