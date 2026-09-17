import { useState, useEffect } from "react";
import ServiceCardAdmin from "../../components/admin-services/ServiceCardAdmin.jsx";
import "./AdminService.css";
import { toast } from "react-toastify";
import {
  getServices,
  createService,
  deleteService,
  updateService,
} from "../../services/serviceService.js";

function ServiceAdmin() {
  const [services, setServices] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newService, setNewService] = useState({
    title: " ",
    description: " ",
    price: " ",
    duration: " ",
  });
  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
  });
  const [filterStatus, setFilterStatus] = useState("all");
  useEffect(() => {
    const loadService = async () => {
      try {
        const data = await getServices();
        console.log("SERVICIOS RECIBIDOS:", data);
        setServices(data);
      } catch (error) {
        toast.error("Error al obtener servicio", error);
      }
    };
    loadService();
  }, []);
  function handleCreateChange(e) {
    const { name, value } = e.target;

    setNewService({
      ...newService,
      [name]: value,
    });
  }

  async function handleCreateService() {
    try {
      const response = await createService(newService);
      toast.success("Servicio creado correctamente");
      setServices((previousService) => [...previousService, response.service]);
      setShowCreateModal(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error al crear un servicio",
      );
    }
  }
  const filterServicio = services.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(search.toLowerCase())
     let matchesStatus = true;

  if (filterStatus === "active") {
    matchesStatus = service.active === true;
  }

  if (filterStatus === "inactive") {
    matchesStatus = service.active === false;
  }

  return matchesSearch && matchesStatus;
  });


  async function handleToggleService(service) {
    try {
      const response = await updateService(service._id, {
        active: !service.active,
      });
      setServices((previousService) =>
        previousService.map((item) => item._id === service._id ? response.service : item),
      );
      toast.success(response.service.active ?"Servicio activado correctamente" : "Servicio desactivado correctamente");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error al cambiar el estado",
      );
    }
  }
  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  }
  async function handleEditService() {
    try {
      const response = await updateService(selectedService._id, editForm);
      setServices((edit) =>
        edit.map((service) =>
          service._id === selectedService._id ? response.service : service,
        ),
      );
      toast.success("Servicio eliminado correctamente");
      closeModal()
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error al eliminar un servicio",
      );
    }
  }
  function closeModal() {
    setShowCreateModal(null);
    setNewService({
      title: "",
      description: "",
      price: "",
      duration: "",
    });
  }
  return (
    <section className="service-admin">
      <div className="service-header">
        <div className="service-title">
          <h1>Gestion de servicios</h1>
          <p>Administra los servicios y precios de la barberia</p>
        </div>
        <button
          className="add-service-button"
          onClick={() => setShowCreateModal(true)}
        >
          + Agregar servicio
        </button>
      </div>

      <div className="service-filters">
        <input
          type="text"
          placeholder="Buscar servicios..."
          className="service-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-buttons">
          <button className={filterStatus === "all" ? "filter-active" : ""}
          onClick={() => setFilterStatus("all")}>Todos</button>
          <button className={filterStatus === "active" ? "filter-active" : ""}
          onClick={() => setFilterStatus("active")} >Activos</button>
          <button className={filterStatus === "inactive" ? "filter-active" : ""}
          onClick={() => setFilterStatus("inactive")}>Inactivos</button>
        </div>
      </div>
      <div className="services-admin-container">
        {filterServicio.map((service) => (
          <ServiceCardAdmin
            key={service._id}
            title={service.title}
            description={service.description}
            price={service.price}
            duration={service.duration}
            active={service.active}
            onInactivo={() => handleToggleService(service)}
            onEdit={() => {
              setSelectedService(service);
              setEditForm({
                title: service.title,
                description: service.description,
                price: service.price,
                duration: service.duration,
              });
            }}
          />
        ))}
      </div>
      {showCreateModal && (
        <div className="edit-modal-overlay">
          <div className="edit-modal">
            <div className="edit-modal-header">
              <h2>Agregar Servicio</h2>
              <button
                className="edit-modal-close"
                onClick={closeModal}
              >
                ×
              </button>
            </div>
            <div className="edit-form-group">
              <label>Nombre del servicio</label>
              <input
                type="text"
                name="title"
                value={newService.title}
                onChange={handleCreateChange}
              />
            </div>
            <div className="edit-form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={newService.description}
                onChange={handleCreateChange}
              />
            </div>
            <div className="edit-form-group">
              <label>Precio</label>
              <input
                type="number"
                name="price"
                value={newService.price}
                onChange={handleCreateChange}
              />
            </div>
            <div className="edit-form-group">
              <label>Duracion</label>
              <input
                type="number"
                name="duration"
                value={newService.duration}
                onChange={handleCreateChange}
              />
            </div>
            <div className="edit-modal-actions">
              <button
                className="edit-cancel-button"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button
                className="edit-save-button"
                onClick={handleCreateService}
              >
                Guardar servicio
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedService && (
        <div className="edit-modal-overlay">
          <div className="edit-modal">
            <div className="edit-modal-header">
              <h2>Editar Servicio</h2>
              <button
                className="edit-modal-close"
                onClick={() => setSelectedService(null)}
              >
                ×
              </button>
            </div>
            <div className="edit-form">
              <div className="edit-form-group">
                <label>Titulo</label>
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                />
              </div>
              <div className="edit-form-group">
                <label>Descripcion</label>
                <input
                  type="text"
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                />
              </div>
              <div className="edit-form-group">
                <label>Precio</label>
                <input
                  type="number"
                  name="price"
                  value={editForm.price}
                  onChange={handleEditChange}
                />
              </div>
              <div className="edit-form-group">
                <label>Duracion</label>
                <input
                  type="number"
                  name="duration"
                  value={editForm.duration}
                  onChange={handleEditChange}
                />
              </div>
            </div>
            <div className="edit-modal-actions">
              <button
                className="edit-cancel-button"
                onClick={() => setSelectedService(null)}
              >
                Cancelar
              </button>

              <button className="edit-save-button" onClick={handleEditService}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ServiceAdmin;
