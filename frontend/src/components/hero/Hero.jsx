import { toast } from "react-toastify";
import { getMyappointments } from "../../services/appointments";
import "./Hero.css";
import { useEffect, useState } from "react";

function Hero() {
  const [nextAppointment, setNextAppointment] = useState(null);
  const [completedCuts, setCompletedCuts] = useState(0);

  useEffect(() => {
    const loadMyAppointments = async () => {
      try {
        const response = await getMyappointments();
        const appointments = response.appointments || [];
        const totalCuts = appointments.filter(
          (appointment) => appointment.status === "completed",
        ).length;

        setCompletedCuts(totalCuts);
        const now = new Date();

        const upcomingAppointments = appointments
          .filter((appointment) => {
            if (
              appointment.status === "cancelled" ||
              appointment.status === "rejected" ||
              appointment.status === "completed"
            ) {
              return false;
            }
            const datePart = appointment.date.slice(0, 10);
            const appointmentDate = new Date(
              `${datePart}T${appointment.time}:00`,
            );
            return appointmentDate >= now;
          })
          .sort((a, b) => {
            const dateA = new Date(`${a.date.slice(0, 10)}T${a.time}:00`);
            const dateB = new Date(`${b.date.slice(0, 10)}T${b.time}:00`);

            return dateA - dateB;
          });
        console.log("TURNOS FUTUROS:", upcomingAppointments);
        console.log("PRÓXIMO TURNO:", upcomingAppointments[0]);
        setNextAppointment(upcomingAppointments[0] || null);
      } catch (error) {
        console.error("ERROR EN HERO:", error);
        toast.error("No se pudo obtener tu proximo turno");
      }
    };
    loadMyAppointments();
  }, []);
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Eleva tu estilo a un <br />
          <span>nuevo estandar de excelencia</span>
        </h1>
        <p>
          Mantene tu imagen impecable. Reserva tu turno en sectorB y vivi una
          experiencia unica
        </p>
        <div className="hero-cards">
          <div className="content-card">
            <span className="card-subtitle">PROXIMO TURNO</span>
            {nextAppointment ? (
              <>
                <h2>{nextAppointment.service?.title}</h2>
                <div className="info-card">
                  <span>
                    📅{" "}
                    {new Date(
                      `${nextAppointment.date.slice(0, 10)}T${nextAppointment.time}:00`,
                    ).toLocaleDateString("es-AR", {
                      day: "numeric",
                      month: "long",
                    })}
                  </span>
                  <span>{nextAppointment.time}</span>
                </div>
                <p>Barbero: {nextAppointment.barber?.name}</p>
                <p>Estado: {nextAppointment.status}</p>
              </>
            ) : (
              <div className="no-appointment">
                <h2>¡Todavía no tenés turnos!</h2>
                <p>
                  Cuando reserves un servicio, vas a poder consultar acá los
                  detalles de tu próximo turno.
                </p>
              </div>
            )}
          </div>

          <div className="member-card">
            <span className="card-subtitle">SECTORB CLUB</span>
            <h2>Miembro Gold</h2>

            <p>Cortes realizados: {completedCuts}</p>

            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${Math.min((completedCuts % 7) / 7, 1) * 100}%`,
                }}
              ></div>
            </div>

            {completedCuts >= 7 && completedCuts % 7 === 0 ? (
              <p>Tenes un corte gratis por ser fiel a SectorB.</p>
            ) : (
              <p>
                Te faltan {7 - (completedCuts % 7)} cortes para conseguir tu
                corte gratis.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
