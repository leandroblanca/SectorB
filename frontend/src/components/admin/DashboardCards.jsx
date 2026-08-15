import "./DashboardCards.css";


function DashboardCards() {
    return (
        <section className="dashboard-card">
            <div className="dashboard-cards">
                <span>
                  Clientes
                </span>
                <strong>
                 1233
                </strong>
            </div>
            <div className="dashboard-cards">
                <span>
                  Tuenos hoy
                </span>
                <strong>
                 10
                </strong>
            </div>
            <div className="dashboard-cards">
                <span>
                  Servicios
                </span>
                <strong>
                 8
                </strong>
            </div>
            <div className="dashboard-cards">
                <span>
                  Cancelados
                </span>
                <strong>
                 3
                </strong>
            </div>
        </section>
    )
}

export default DashboardCards;