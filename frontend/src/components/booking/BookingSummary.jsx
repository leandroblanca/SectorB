import { getBarberName } from "../../services/barberService.js";
import { FiArrowRight, FiAward, FiClock, FiInfo } from "react-icons/fi";
import { APPOINTMENT_DURATION } from "../../constants/appointments.js";
import "./BookingSummary.css";

const formatPrice = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

const formatDate = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  timeZone: "UTC",
});

function BookingSummary({ service, barber, date, time, submitting, onConfirm }) {
  const price = service ? formatPrice.format(service.price) : "—";
  const dateLabel = date ? formatDate.format(new Date(`${date}T00:00:00Z`)) : "Elegí una fecha";
  const canConfirm = service && barber && date && time;

  async function handleSubmit(event) {
    event.preventDefault();
    if (canConfirm && !submitting) {
      const form = event.currentTarget;
      const reserved = await onConfirm(new FormData(form).get("notes").trim());
      if (reserved) form.reset();
    }
  }

  return (
    <aside className="booking-summary" aria-labelledby="booking-summary-title">
      <form className="booking-summary-card" onSubmit={handleSubmit} aria-busy={submitting}>
        <header className="booking-summary-heading">
          <h2 id="booking-summary-title">Resumen del Turno</h2>
          <span>SectorB</span>
        </header>

        <dl className="booking-summary-details">
          <div>
            <dt>Servicio</dt>
            <dd><strong>{service?.title || "Elegí un servicio"}</strong><span className="booking-summary-price">{price}</span></dd>
          </div>
          <div>
            <dt>Especialista</dt>
            <dd>{getBarberName(barber) || "Elegí un barbero"}</dd>
          </div>
          <div>
            <dt>Fecha y horario {service && <span><FiClock aria-hidden="true" /> {APPOINTMENT_DURATION} min</span>}</dt>
            <dd>{dateLabel}{time && ` — ${time} hs`}</dd>
          </div>
        </dl>

        <div className="booking-summary-gold">
          <FiAward aria-hidden="true" />
          <div><strong>Club Gold</strong><small>Sin descuento aplicado</small></div>
          <span>—</span>
        </div>

        <label className="booking-summary-notes">
          Notas especiales o preferencias
          <textarea name="notes" rows={2} maxLength={500} placeholder="Ej. Bebida de cortesía favorita, corte a navaja" disabled={submitting} />
        </label>

        <dl className="booking-summary-totals">
          <div><dt>Subtotal</dt><dd>{price}</dd></div>
          <div><dt>Descuento Miembro Gold</dt><dd>—</dd></div>
          <div><dt>Total a abonar</dt><dd>{price}</dd></div>
        </dl>

        <button className="booking-summary-confirm" type="submit" disabled={!canConfirm || submitting}>
          {submitting ? "Reservando…" : "Confirmar y reservar cita"}<FiArrowRight aria-hidden="true" />
        </button>
        <p className="booking-summary-hint"><FiInfo aria-hidden="true" /> {canConfirm ? "Horario de Buenos Aires (GMT-3)" : "Completá la selección para reservar."}</p>
      </form>
      <div className="booking-summary-specialists">
        <FiAward aria-hidden="true" />
        <div><strong>Especialistas SectorB</strong><p>Elegí tu servicio y tu barbero de preferencia.</p></div>
      </div>
    </aside>
  );
}

export default BookingSummary;
