import { useEffect, useState } from "react";
import {
    createAppointmets,
  getAppointmets,
  updateAppointmetsStatus,
} from "../../services/appointments.js";
import { getUsers } from "../../services/useService.js";
import { getBarber } from "../../services/barberService.js";
import { getServices } from "../../services/serviceService.js";
import { toast } from "react-toastify";
import AppointmentRow from "../../components/admin-appointments/AppointmentRow.jsx";
import "./Appointments.css";

function AppointementsAdmin() {
  const [appointment, setAppointment] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [searchClient, setSearchClient] = useState("")
  const [newAppointment, setNewAppointment] = useState({
    client: "",
    service: "",
    barber: "",
    date: "",
    time: ""
  });
  useEffect(() => {
    const loadAppointemets = async () => {
      try {
        const appointmentsData = await getAppointmets();
        const usersData = await getUsers();
        const servicesData = await getServices();
        const barbersData = await getBarber();
        
        setAppointment(appointmentsData);
        setClients(usersData.filter((user) => user.role === "client"))
        setServices(servicesData)
        setBarbers(barbersData)
      } catch (error) {
        toast.error("Error al obtener los Turnos");
      }
    };
    loadAppointemets();
  }, []);
  const totalAppointments = appointment.length;

  const pendingAppointments = appointment.filter(
    (appointment) => appointment.status === "pending",
  ).length;

  const confirmedAppointments = appointment.filter(
    (appointment) => appointment.status === "confirmed",
  ).length;

  const inProgressAppointments = appointment.filter(
    (appointment) => appointment.status === "in_progress",
  ).length;

  const completedAppointments = appointment.filter(
    (appointment) => appointment.status === "completed",
  ).length;
  const cancelledAppointments = appointment.filter(
    (appointment) => appointment.status === "cancelled",
  ).length;
  const rejectedAppointments = appointment.filter(
    (appointment) => appointment.status === "rejected",
  ).length;

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateAppointmetsStatus(id, status);
      setAppointment((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === id ? { ...appointment, status } : appointment,
        ),
      );
      toast.success("Estado del turno actualizado");
    } catch (error) {
      toast.error("Error al actualizar el turno");
    }
  };

  async function handleCreateAppointment() {
    if( !newAppointment.client ||
    !newAppointment.service ||
    !newAppointment.barber ||
    !newAppointment.date ||
    !newAppointment.time){
      toast.error("Completa todos los campos")
      return
    }
    try {
      await createAppointmets(newAppointment);
      const data = await getAppointmets();

      setAppointment(data);

      toast.success("Turno creado correctamente");

      setNewAppointment({
        client: "",
        service: "",
        barber: "",
        date: "",
        time: "",
      });
      setShowCreateModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al crear un turno");
    }
  }
    function handleCreateChange(e) {
    const { name, value } = e.target;
    setNewAppointment({
      ...newAppointment,
      [name]: value,
    });
  }
  const filteredAppointments = appointment.filter((appointment) => {
    const matchesStatus = filterStatus === "all" || appointment.status === filterStatus;
    const clientName = `${appointment.client?.name || "" } ${appointment.client?.lastname || ""}`
    .toLowerCase()
    const matchesClient = clientName.includes(searchClient.toLowerCase())

    return matchesStatus && matchesClient
  })

  return (
    <div className="appointments-admin">
      <div className="appointments-header">
        <div>
          <h1>Gestion de Turnos</h1>
          <p>Control y manejo de turnos</p>
        </div>
        <div className="appointments-header-actions">
          <input
            type="text"
            placeholder="Buscar Cliente"
            value={searchClient}
            className="search-appointment"
            onChange={(e) => setSearchClient(e.target.value)}
          />
          <button className="new-appointment-button" onClick={() => setShowCreateModal(true)}>+ Nuevo Turno</button>
        </div>
      </div>
      <div className="appointments-cards">
        <div className="appointment-card">
          <div className="card-top">
            <div>
              <span>OCUPACION DEL DIA</span>
              <h2>
                {totalAppointments}
                <small>/ 32 turnos</small>
              </h2>
            </div>
            <div className="card-icon">📅</div>
          </div>
          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min((totalAppointments / 32) * 100, 100)}%`,
                }}
              ></div>
            </div>
            <span>
              {Math.round(Math.min((totalAppointments / 32) * 100, 100))}%
            </span>
          </div>
        </div>
        <div className="appointment-card">
          <div className="card-top">
            <div>
              <span>APROBACION PENDIENTE</span>
              <h2>{pendingAppointments}</h2>
            </div>
            <div className="card-icon">🔔</div>
          </div>
          <div className="card-bottom">
            <span>Requiere atencion prioritaria</span>
          </div>
        </div>
        <div className="appointment-card">
          <div className="card-top">
            <div>
              <span>EN SILLON AHORA</span>
              <h2>
                {inProgressAppointments}
                <small>/ 06 puestos</small>
              </h2>
            </div>
            <div className="card-icon">💺</div>
          </div>
          <div className="card-bottom">
            <span>
              {Math.max(6 - inProgressAppointments, 0)} Sillones disponibles
            </span>
          </div>
        </div>
      </div>
      <div className="appointment-filters">
        <button
          className={filterStatus === "all" ? "active" : ""}
          onClick={() => setFilterStatus("all")}
        >
          Todos <span>{totalAppointments}</span>
        </button>
        <button
          className={filterStatus === "pending" ? "active" : ""}
          onClick={() => setFilterStatus("pending")}
        >
          Pendientes <span>{pendingAppointments}</span>
        </button>
        <button
          className={filterStatus === "confirmed" ? "active" : ""}
          onClick={() => setFilterStatus("confirmed")}
        >
          Confirmados <span>{confirmedAppointments}</span>
        </button>
        <button
          className={filterStatus === "in_progress" ? "active" : ""}
          onClick={() => setFilterStatus("in_progress")}
        >
          En proceso <span>{inProgressAppointments}</span>
        </button>
        <button
          className={filterStatus === "completed" ? "active" : ""}
          onClick={() => setFilterStatus("completed")}
        >
          Completados <span>{completedAppointments}</span>
        </button>
        <button
          className={filterStatus === "cancelled" ? "active" : ""}
          onClick={() => setFilterStatus("cancelled")}
        >
          Cancelados <span>{cancelledAppointments}</span>
        </button>
        <button
          className={filterStatus === "rejected" ? "active" : ""}
          onClick={() => setFilterStatus("rejected")}
        >
          Rechazados <span>{rejectedAppointments}</span>
        </button>
      </div>
      <div className="apppointments-table-container">
        <div className="table-header">
          <h2>Agenda diaria de clientes</h2>
          <span>{filteredAppointments.length} turnos visualizados</span>
        </div>
        <div className="appointments-table-header">
          <span>HORA</span>
          <span>CLIENTE</span>
          <span>SERVICIO</span>
          <span>BARBERO</span>
          <span>ESTADO</span>
          <span>ACCIONES</span>
        </div>
        <div className="appointments-table-body">
          {filteredAppointments.map((appointment) => (
            <AppointmentRow
              key={appointment._id}
              appointment={appointment}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      </div>
      {showCreateModal && (
        <div className="edit-modal-overlay">
          <div className="edit-modal">
            <div className="edit-modal-header">
              <h2>Agregar turnos</h2>
              <button
                className="edit-modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>
            <div className="edit-form">
              <div className="edit-form-group">
                <label> Cliente</label>
                <select
                  name="client"
                  value={newAppointment.client}
                  onChange={handleCreateChange}
                >
                  <option value=""> Seleccionar cliente</option>
                  {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.name} {client.lastname}
                    </option>
                  ))}
                  </select>
              </div>
              <div className="edit-form-group">
                <label> Servicio</label>
                <select
                  name="service"
                  value={newAppointment.service}
                  onChange={handleCreateChange}
                >
                <option value="">Seleccionar servicio</option>
                {services.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.title}
                  </option>
                ))}
                </select>
              </div>
              <div className="edit-form-group">
                <label> Barbero</label>
                <select
                  name="barber"
                  value={newAppointment.barber}
                  onChange={handleCreateChange}
                >
                  <option value="">Seleccionar barbero</option>
                  {barbers.map((barber) => (
                    <option key={barber._id} value={barber._id}>
                      {barber.name}
                    </option>
                  ))}
                  </select>
              </div>
              <div className="edit-form-group">
                <label>Fecha</label>
                <input
                  type="date"
                  name="date"
                  value={newAppointment.date}
                  onChange={handleCreateChange}
                />
              </div>
              <div className="edit-form-group">
                <label>Hora</label>
                <input
                  type="time"
                  name="time"
                  value={newAppointment.time}
                  onChange={handleCreateChange}
                />
              </div>
            </div>
            <div className="edit-modal-actions">
              <button
                className="edit-cancel-button"
                onClick={() => setShowCreateModal(false)}
              >
                Cancelar
              </button>

              <button className="edit-save-button" onClick={handleCreateAppointment}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointementsAdmin;
