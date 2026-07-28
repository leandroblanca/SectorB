import "./Hero.css";

function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
            <h1>
                Eleva tu estilo a un <br/>
                <span>nuevo estandar de excelencia</span>
            </h1>
            <p>
                Mantene tu imagen impecable. Reserva tu turno en sectorB y vivi una experiencia unica
            </p>
            <div className="hero-cards">
                <div className="content-card">
                    <span className="card-subtitle">
                        PROXIMO TURNO
                    </span>
                    <h2>
                        Corte Clasico
                    </h2>
                    <div className="info-card">
                        <span>📅 20 Julio </span>
                        <span>🕒 18:30 </span>
                    </div>
                    <div className="buttons-card">
                        <button>Ver detalles</button>
                        <button className="secondary-btn">
                            Reprogramar
                        </button>
                    </div>
                </div>

                <div className="member-card">
                    <span className="card-subtitle">
                        SECTORB CLUB
                    </span>
                    <h2>
                        Miembro Gold
                    </h2>
                    <div className="progress-bar">
                        <div className="progress"></div>
                    </div>
                    <p>
                        Faltan 2 visitas para un servicio de cortesia
                    </p>

                </div>
            </div>


            
            </div>
        </section>
    )
}

export default Hero;