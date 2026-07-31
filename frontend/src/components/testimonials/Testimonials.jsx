import "./Testimonials.css";
import { FaStar } from "react-icons/fa";

function Testimonials() {
  return (
    <section className="testimonials">
      <h2>"No es solo un corte, es un ritual."</h2>
      <div className="testimonials-grid">
        <div className="testimonial-card">
          <div className="stars">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>

          <p>
            "La atención fue excelente. Siempre salgo con el corte exactamente
            como quería."
          </p>

          <span>Juan R.</span>
        </div>

        <div className="testimonial-card">
          <div className="stars">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>

          <p>
            "Muy buena atención y el ambiente espectacular. Volveré sin dudas."
          </p>

          <span>Marcos G.</span>
        </div>

        <div className="testimonial-card">
          <div className="stars">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>

          <p>"Reservar fue rapidísimo y el servicio impecable."</p>

          <span>Santiago P.</span>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
