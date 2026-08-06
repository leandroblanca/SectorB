import "./Services.css";
import ServiceCard from "./ServiceCard";
import { getServices } from "../../services/serviceService";
import { useEffect, useState } from "react";

function Services() {
  const [services, setServices] = useState([])
  useEffect(() => {
    const loadServices = async() => {
        const data = await getServices()

        console.log("Datos recibidos:", data);
        setServices(data)
    }
    loadServices();
  }, [])
  console.log(services)
  return (
    <section className="services">
      <div className="services-header">
        <div className="services-title">
          <h2>Nuestros servicios</h2>
          <p>Selecciona el tratamiento que define tu estilo.</p>
        </div>
        <span className="view-all">VER TODOS</span>
      </div>
      <div className="services-grid">
        {services.map((service) =>
        (
          <ServiceCard
          key={service._id}
          image={service.image}
          title={service.title}
          description={service.description}
          price={service.price}
          />

        ))}
        
      </div>
    </section>
  );
}

export default Services;
