import { APPOINTMENT_DURATION } from "../../constants/appointments.js";

function AppointmentRow({ appointment, onUpdateStatus }) {
  const date = appointment.date?.slice(0, 10);

  return (
    <div className="appointment-row">
      <div className="appointment-date">
        {date ? <time dateTime={date}>{date.split("-").reverse().join("/")}</time> : "—"}
      </div>
      <div className="appointment-time">
        <strong>{appointment.time}</strong>
      </div>
      <div className="appointment-client">
        <strong>
          {appointment.client?.name}
          {appointment.client?.lastname}
        </strong>
      </div>
      <div className="appointment-service">
        <strong>{appointment.service?.name}</strong>
        <small>{APPOINTMENT_DURATION} min</small>
      </div>
      <div className="appointment-barber">
        <strong>{appointment.barber?.name}</strong>
      </div>
      <div className="appointment-status-container">
        <span className={`appointment-status status-${appointment.status}`}>
          {appointment.status}
        </span>
      </div>
      <div className="appointment-actions">
        {appointment.status === "pending" && (
          <button onClick={() => onUpdateStatus(appointment._id, "confirmed")}>
            Aprobar
          </button>
        )}
        {appointment.status === "pending" && (
          <button onClick={() => onUpdateStatus(appointment._id, "rejected")}>
            X
          </button>
        )}
        {appointment.status === "confirmed" && (
          <button
            onClick={() => onUpdateStatus(appointment._id, "in_progress")}
          >
            Check-in
          </button>
        )}
        {appointment.status === "confirmed" && (
          <button
            onClick={() => onUpdateStatus(appointment._id, "Cancelar")}
          >
            Cancelar
          </button>
        )}
        {appointment.status === "in_progress" && (
          <button onClick={() => onUpdateStatus(appointment._id, "completed")}>
            Finalizar
          </button>
        )}
        {appointment.status === "completed" && <span> Ver recibo </span>}
      </div>
    </div>
  );
}

export default AppointmentRow;
