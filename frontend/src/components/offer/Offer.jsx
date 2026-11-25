import images from "../../assets/imagenes";
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
                        Combo SectorB
                        <strong>20% OFF</strong>
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
                    <img src={images.peluqueria3} alt="Oferta SectorB" />
                </div>

            </div>
        </section>

        
    )
}
export default Offer;