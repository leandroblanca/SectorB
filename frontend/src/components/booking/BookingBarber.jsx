import { FiCheck } from "react-icons/fi";
import "./BookingBarber.css";

function BookingBarber({ barbers, selectedBarber, onSelectedBarber }) {
  return (
    <section className="booking-barbers">
      <div className="booking-section-header">
        <h2>
          <span>2</span>
          SELECCIONA BARBERO
        </h2>
        <p>{barbers.length} OPCIONES DISPONIBLES</p>
      </div>

      <div className="booking-barbers-grid">
        {barbers.map((barber) => (
          <article
            key={barber._id}
            className={`booking-barber-card ${
              selectedBarber?._id === barber._id ? "selected" : ""
            }`}
            onClick={() => onSelectedBarber(barber)}
          >
                        <div className="booking-barber-image">
              <img
                src={barber.image || "/images/barber-placeholder.jpg"}
                alt={`Barbero ${barber.name}`}
              />

              {selectedBarber?._id === barber._id && (
                <span className="booking-barber-check"><FiCheck className="ui-icon" aria-hidden="true" /></span>
              )}
            </div>
            <div className="booking-barber-info">
              <h3>{barber.name}</h3>
              <p>BARBEROS</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export default BookingBarber;
