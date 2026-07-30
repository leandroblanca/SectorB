import "./Services.css";
import ServiceCard from "./ServiceCard";

function Services() {
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
        <ServiceCard
        image="https://media.istockphoto.com/id/1473584880/es/foto/hombre-negro-en-una-peluquer%C3%ADa.jpg?s=612x612&w=0&k=20&c=Bh21J9FH3w1ZThEIh453Lxa_pnAsP4djqngvMdRjEAo="
        title="Corte"
        description="Degradado a medida"
        price="2500"
        />
        <ServiceCard
        image="https://media.istockphoto.com/id/1473584880/es/foto/hombre-negro-en-una-peluquer%C3%ADa.jpg?s=612x612&w=0&k=20&c=Bh21J9FH3w1ZThEIh453Lxa_pnAsP4djqngvMdRjEAo="
        title="Barba"
        description="Perfilado con toalla caliente"
        price="1800"
        />
        <ServiceCard
        image="https://media.istockphoto.com/id/1473584880/es/foto/hombre-negro-en-una-peluquer%C3%ADa.jpg?s=612x612&w=0&k=20&c=Bh21J9FH3w1ZThEIh453Lxa_pnAsP4djqngvMdRjEAo="
        title="Color"
        description="Cambio de tono"
        price="4500"
        />
        <ServiceCard
        image="https://media.istockphoto.com/id/1473584880/es/foto/hombre-negro-en-una-peluquer%C3%ADa.jpg?s=612x612&w=0&k=20&c=Bh21J9FH3w1ZThEIh453Lxa_pnAsP4djqngvMdRjEAo="
        title="Tijera"
        description="Dale forma a tu pelo con elegancia"
        price="1250"
        />
      </div>
    </section>
  );
}

export default Services;
