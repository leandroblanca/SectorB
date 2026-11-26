import { getBarberName } from "../../services/barberService.js";
import "./NextAppointment.css";
import { FiCalendar, FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { APPOINTMENT_DURATION } from "../../constants/appointments.js";

export default function NextAppointment({ appointment, loading, failed }) {
  const date = appointment && new Date(`${appointment.date.slice(0, 10)}T12:00:00Z`);

  return (
    <section className="client-profile-card">
      <div className="client-profile-split">
        <p className="client-profile-kicker">Próximo turno confirmado</p>
        {appointment && <span className="client-profile-badge">● Agendado</span>}
      </div>
      {appointment ? (
        <>
          <h2 className="client-profile-appointment-title">{appointment.service?.title || "Turno"}</h2>
          <p className="client-profile-muted">Barbero especialista · <strong>{getBarberName(appointment.barber) || "—"}</strong></p>
          <div className="client-profile-slot">
            <div><span><FiCalendar /> {date.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" })}</span><strong>{date.getUTCFullYear()}</strong></div>
            <div><span><FiClock /> {appointment.time} hs ({APPOINTMENT_DURATION} min)</span>{appointment.service?.price != null && <strong className="client-profile-kicker">${appointment.service.price.toLocaleString("es-AR")}</strong>}</div>
          </div>
          <details className="client-profile-details">
            <summary className="client-profile-button primary">Ver detalles</summary>
            <p className="client-profile-muted">{appointment.notes || "Este turno no tiene notas especiales."}</p>
          </details>
        </>
      ) : (
        <>
          <p className="client-profile-empty">{loading ? "Cargando turnos…" : failed ? "Turnos sin datos" : "Todavía no tenés turnos confirmados."}</p>
          {!loading && !failed && <Link className="client-profile-button primary" to="/book-appointment">Reservar turno</Link>}
        </>
      )}
    </section>
  );
}
