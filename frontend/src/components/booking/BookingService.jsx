import { FiClock } from "react-icons/fi";
import "./BookingService.css"
import { APPOINTMENT_DURATION } from "../../constants/appointments.js";
function BookingService({services, selectedService, onSelectService}) {
    return(
        <section className="booking-services">
            <div className="booking-section-header">
                <h2>
                    <span>1</span>
                    Seleccioná tu servicio
                </h2>
                <p>{services.length} OPCIONES DISPONIBLES</p>
            </div>
            <div className="booking-services-grid">
                {services.map((service) => (
                    <article
                    key={service._id}
                    className={`booking-service-card ${
                        selectedService?._id === service._id ? "selected" : ""
                    }`}
                    onClick={() => onSelectService(service)}
                    >
                        <div className="booking-service-info">
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                        <div className="booking-service-details">
                            <span className="booking-service-price"> 
                                ${service.price.toLocaleString("es-AR")}
                            </span>
                            <span className="booking-service-duration">
                                <FiClock className="ui-icon" aria-hidden="true" /> {APPOINTMENT_DURATION} min
                            </span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default BookingService;
