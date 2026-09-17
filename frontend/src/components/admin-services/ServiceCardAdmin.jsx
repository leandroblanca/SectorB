import "./ServiceCardAdmin.css";

function ServiceCardAdmin({ title, description, price, duration, active, onInactivo, onEdit }) {
  return (
    <div className="service-card-admin">
      <div className="service-card-top">
        <span className="service-category">SERVICIO</span>
        <div className= "service-actions">
          <button onClick={onEdit}>✎</button>
          <button onClick={onInactivo}
          title={active ? "Desactivar servicio" : "Activar servicio"}> {active ? "⏻" : "↻"}</button>
        </div>
      </div>
      <h3>{title}</h3>

      <p className="service-description">{description}</p>

      <div className="service-divider"></div>
      <div className="service-info">
        <div>
          <span className="service-info-label">DURACION</span>
          <strong>◷ {duration} min</strong>
        </div>
        <div className="service-price-container">
          <span className="service-info-label">PRECIO</span>
          <strong className="service-price">${price}</strong>
        </div>
      </div>

      <div className="service-card-bottom">
        <div className="service-status">
          <span
            className={active ? "status-dot active" : "status-dot inactive"}
          ></span>

          {active ? "Activo" : "Inactivo"}
        </div>
        <div
          className={active ? "service-toggle toggle-active" : "service-toggle"}
        >
          <div className="toggle-circle"></div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCardAdmin;
