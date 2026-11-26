import "./ProfileHeader.css";
import { FiCalendar, FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ProfileHeader({ user, onEdit }) {
  const name = [user?.name, user?.lastname].filter(Boolean).join(" ");
  const initials = [user?.name, user?.lastname].map((part) => part?.[0]).join("");

  return (
    <section className="client-profile-card client-profile-header">
      <div className="client-profile-avatar" aria-hidden="true">{initials || "SB"}</div>
      <div>
        <p className="client-profile-kicker">Cuenta exclusiva {user?.createdAt && <span>· Miembro desde {user.createdAt.slice(0, 4)}</span>}</p>
        <h1>{name || "Mi perfil"}</h1>
        <p className="client-profile-muted">SectorB Club</p>
      </div>
      <div className="client-profile-actions">
        <Link className="client-profile-button primary" to="/book-appointment"><FiCalendar /> Reservar turno</Link>
        <button className="client-profile-button" type="button" onClick={onEdit}><FiEdit /> Editar perfil</button>
      </div>
    </section>
  );
}
