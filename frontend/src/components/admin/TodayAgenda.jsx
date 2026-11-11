import { useState } from "react";
import "./TodayAgenda.css"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getAppointmets } from "../../services/appointments";



function TodayAgenda() {
    const navigate = useNavigate()
    const [appointments, setAppointments] = useState([])
    useEffect(() => {
        async function loadAppointments() {
            try {
                const data = await getAppointmets()
                setAppointments(data)

            } catch (error) {
                toast.error("Error al obtener los turnos de hoy")
            }
        }
        loadAppointments()
    }, [])
    const today = new Date();

    const todayAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);

    return (
        appointmentDate.getDate() === today.getDate() &&
        appointmentDate.getMonth() === today.getMonth() &&
        appointmentDate.getFullYear() === today.getFullYear()
    )
    })
    .sort((a,b) => a.time.localeCompare(b.time))
    return (
        <section className="today-agenda">
            <div className="agenda-header">
                <h2>
                    Agenda de hoy
                </h2>
                <button
                onClick={() => navigate("/admin/appointments")}>
                    VER TODOS
                    </button>
            </div>
            <div className="appointments">
                    {todayAppointments.length > 0 ? (
                        todayAppointments.map((appointment, index) => (
                            <div className={`appointment ${index === 0 ? "appointment-active" : ""}`}
                            key={appointment._id}>
                                <span className="appointment-time">
                                    {appointment.time}
                                </span>
                                <h3>
                                    {appointment.client?.name} {appointment.client?.lastname}
                                </h3>
                                <p>{appointment.service?.title}</p>
                            </div>
                        )) 
                    ) : (
                        <p>No hay turnos programados par hoy.</p>
                    )
                    }
            </div>
            <button className="new-appointment"
            onClick={() => navigate("/admin/appointments")}>
                + Nuevo turno
            </button>

        </section>
    )
}

export default TodayAgenda;