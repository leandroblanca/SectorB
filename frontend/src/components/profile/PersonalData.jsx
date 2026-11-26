import "./PersonalData.css";
import { FiLock, FiMail, FiSave, FiUser } from "react-icons/fi";

const fields = [
  ["name", "Nombre", "text", FiUser, 101, "given-name"],
  ["lastname", "Apellido", "text", FiUser, 101, "family-name"],
  ["email", "Correo electrónico", "email", FiMail, 254, "email"],
];

export default function PersonalData({ user, onSave, saving }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSave(Object.fromEntries(new FormData(event.currentTarget)));
  }

  return (
    <section className="client-profile-card" id="datos-personales">
      <header className="client-profile-card-heading">
        <div>
          <p className="client-profile-kicker">Registro privado</p>
          <h2>Datos Personales &amp; Cuenta</h2>
          <p className="client-profile-muted">Información de contacto y credenciales de acceso</p>
        </div>
        <span className="client-profile-badge"><FiLock /> Cuenta privada</span>
      </header>
      {user ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="client-profile-fields" disabled={saving}>
            {fields.map(([name, label, type, Icon, maxLength, autoComplete]) => (
              <label key={name}>{label}
                <span><input name={name} type={type} defaultValue={user[name] || ""} maxLength={maxLength} autoComplete={autoComplete} required /><Icon aria-hidden="true" /></span>
              </label>
            ))}
          </fieldset>
          <details className="client-profile-password">
            <summary><FiLock /> Cambiar contraseña</summary>
            <fieldset className="client-profile-fields" disabled={saving}>
              <label>Contraseña actual<input name="currentPassword" type="password" autoComplete="current-password" /></label>
              <label>Nueva contraseña<input name="newPassword" type="password" autoComplete="new-password" minLength={8} maxLength={72} /></label>
            </fieldset>
          </details>
          <div className="client-profile-actions client-profile-form-actions">
            <button className="client-profile-button" type="reset" disabled={saving}>Descartar</button>
            <button className="client-profile-button primary" disabled={saving}><FiSave /> {saving ? "Guardando…" : "Guardar cambios"}</button>
          </div>
        </form>
      ) : <p className="client-profile-empty">Datos de la cuenta sin cargar.</p>}
    </section>
  );
}
