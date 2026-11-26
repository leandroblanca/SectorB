import "./AppointmentHistory.css";
import AppointmentHistoryItem from "./AppointmentHistoryItem.jsx";

export default function AppointmentHistory({ appointments, loading, failed }) {
  const recent = appointments.slice(0, 3);

  return (
    <section className="client-profile-card">
      <header className="client-profile-card-heading">
        <div><p className="client-profile-kicker">Archivos de SectorB</p><h2>Historial de Turnos &amp; Visitas</h2></div>
        {recent.length > 0 && <span className="client-profile-caption">Últimos {recent.length} servicios</span>}
      </header>
      {recent.length > 0 ? (
        <ul className="client-profile-history">
          {recent.map((appointment) => <AppointmentHistoryItem key={appointment._id} appointment={appointment} />)}
        </ul>
      ) : <p className="client-profile-empty">{loading ? "Cargando historial…" : failed ? "Historial sin datos" : "Todavía no tenés turnos completados."}</p>}
    </section>
  );
}
