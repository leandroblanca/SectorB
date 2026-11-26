import "./LoyaltyProgram.css";
import { FiAward, FiInfo } from "react-icons/fi";

export default function LoyaltyProgram({ completedVisits }) {
  const goal = 7;
  const visits = completedVisits > 0 && completedVisits % goal === 0 ? goal : completedVisits % goal;

  return (
    <section className="client-profile-card client-profile-loyalty">
      <header className="client-profile-card-heading">
        <div><p className="client-profile-kicker">Programa de fidelidad</p><h2>SectorB Club</h2></div>
        <span className="client-profile-badge"><FiAward /> Miembro Gold</span>
      </header>
      <div className="client-profile-split">
        <strong>Progreso para servicio de cortesía</strong>
        {completedVisits !== null && <strong className="client-profile-kicker">{visits} / {goal} visitas</strong>}
      </div>
      {completedVisits !== null && <progress value={visits} max={goal} aria-label="Visitas para servicio de cortesía" />}
      <p className="client-profile-muted client-profile-inline"><FiInfo /> {completedVisits === null ? "Progreso sin datos" : visits === goal ? "Tenés un corte de cortesía." : `Te faltan ${goal - visits} visitas para tu corte de cortesía.`}</p>
    </section>
  );
}
