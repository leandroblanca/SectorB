import "./TodayAgenda.css"

function TodayAgenda(params) {
    const appointments =  [
        {
            time: "8:00 AM",
            client: "Pedro fernandez",
            service: "Corte clasico",
        },
        {
            time: "10:00 AM",
            client: "Pedro orellana",
            service: "Corte clasico",
        },
        {
            time: "2:00 PM",
            client: "Pedro bro",
            service: "Corte clasico",
        },
        {
            time: "9:00 PM",
            client: "Pedro menta",
            service: "Corte clasico",
        },
    ]
    return (
        <section className="today-agenda">
            <div className="agenda-header">
                <h2>
                    Agenda de hoy
                </h2>
                <button>VER TODOS</button>
            </div>
            <div className="appointments">
                    {appointments.map((appointment, index) => (
                        <div className={`appointment ${index === 0 ? "appointment-active" : ""}`}
                        key={index}>
                            <span className="appointment-time">
                                {appointment.time}
                            </span>
                            <h3>
                                {appointment.client}
                            </h3>
                            <p>
                                {appointment.service}
                            </p>
                        </div>
                    ))}
            </div>
            <button className="new-appointment">
                + Nuevo turno
            </button>

        </section>
    )
}

export default TodayAgenda;