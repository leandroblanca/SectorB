import { FiCheck } from "react-icons/fi";
import { avatar } from "../../assets/imagenes";
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
          <button
            key={barber._id}
            type="button"
            aria-pressed={selectedBarber?._id === barber._id}
            className={`booking-barber-option ${
              selectedBarber?._id === barber._id ? "selected" : ""
            }`}
            onClick={() => onSelectedBarber(barber)}
          >
            <span className="booking-barber-image">
              <img
                src={avatar.avatar1}
                alt=""
              />

              {selectedBarber?._id === barber._id && (
                <span className="booking-barber-check"><FiCheck className="ui-icon" aria-hidden="true" /></span>
              )}
            </span>
            <span className="booking-barber-name">{barber.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
export default BookingBarber;
