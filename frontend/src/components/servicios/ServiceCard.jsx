import "./ServiceCard.css";

function ServiceCard({image, title,description,price}) {
    return(
        <div className="service-card">
            <img
                className="service-image"
                src={image}
                alt={title} />
            <div className="service-info">
                <h3>{title}</h3>

                <p>{description}</p>

                <span>${price}</span>

            </div>
        </div>
    )
    
}

export default ServiceCard;
