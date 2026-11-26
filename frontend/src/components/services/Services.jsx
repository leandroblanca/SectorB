import "./Services.css";
import ServiceCard from "./ServiceCard";
import { getServices } from "../../services/serviceService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import images from "../../assets/imagenes";
function Services() {
  const [services, setServices] = useState([])
  useEffect(() => {
    const loadServices = async() => {
      try {
        const data = await getServices();
        setServices(data);
      } catch {
        toast.error("No se pudieron cargar los servicios", { toastId: "servicios" });
      }
    }
    loadServices();
  }, [])
  return (
    <section className="services" id="servicios">
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
          image={images.peluqueria1}
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
