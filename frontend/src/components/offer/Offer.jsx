import "./Offer.css"

function Offer(params) {
    return(
        <section className="offer">
            <div className="offer-content">
                <div className="offer-text">
                    <span>
                        OFERTA EXCLUSIVA
                    </span>
                    <h2>
                        Combo SectorB: 20% OFF
                    </h2>
                    <p>
                        Reserva tu turno los martes y miercoles entre las
                        10:00 y las 14:00 y obtene un descuento exclusivo
                        en cualquier servicio.
                    </p>
                    <button>
                        Reserva ahora
                    </button>
                </div>
                <div className="offer-image">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDyS1oAi7A6qy2z8Aoktwb3KK8ToWGfz7aPQ&s" alt="Oferta SectorB" />
                </div>

            </div>
        </section>

        
    )
}
export default Offer;