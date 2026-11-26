import "./AppointmentHistoryItem.css";
import { FiCheck, FiRotateCcw } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function AppointmentHistoryItem({ appointment }) {
  const date = new Date(`${appointment.date.slice(0, 10)}T12:00:00Z`);

  return (
    <li className="client-profile-history-item">
      <span className="client-profile-history-icon"><FiCheck aria-hidden="true" /></span>
      <div>
        <div className="client-profile-inline"><h3>{appointment.service?.title || "Turno"}</h3><span className="client-profile-caption">Completado</span></div>
        <p className="client-profile-muted">
          Barbero: {appointment.barber?.name || "—"} · {date.toLocaleDateString("es-AR", { dateStyle: "medium", timeZone: "UTC" })}
          {appointment.service?.price != null && ` · $${appointment.service.price.toLocaleString("es-AR")}`}
        </p>
      </div>
      {appointment.service?._id && (
        <Link className="client-profile-button" to={`/book-appointment?service=${appointment.service._id}`}><FiRotateCcw /> Repetir servicio</Link>
      )}
    </li>
  );
}
