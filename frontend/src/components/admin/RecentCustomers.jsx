import "./RecentCustomers.css";
import {
  getUsers,
  updateUserStatus,
  updateUser,
  createUser
} from "../../services/useService.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function RecentCustomers(params) {
  async function handleStatusChange(id, currentStatus) {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await updateUserStatus(id, newStatus);
      setCustomers((currentCustomers) =>
        currentCustomers.map((customer) =>
          customer._id === id ? { ...customer, status: newStatus } : customer,
        ),
      );
      toast.success("estado actualizado correctamente");
    } catch (error) {
      toast.error("Error al actualizar el estado: ");
    }
  }

  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    lastname: "",
    email: "",
    status: "active",
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  }
  function handleCreateChange(e) {
    const { name, value } = e.target;
    setNewCustomer({
      ...newCustomer,
      [name]: value,
    });
  }
  async function handleCreateUser() {
    try {
       await createUser(newCustomer)
       const data = await getUsers()
       const clients = data.filter(
        (user) => user.role === "client"
       );
       setCustomers(clients)
       
      toast.success("Cliente agregado correctamente")
        setNewCustomer({
          name: "",
          lastname: "",
          email: "",
          password: ""
        })
      setShowCreateModal(false)
    } catch (error) {
      toast.error( error.response?.data?.message) || "Error al crear un usuario"
    }
  }
  async function handleEditSubmit() {
    try {
      const response = await updateUser(selectedCustomer._id, editForm);
      setCustomers((currentCustomers) =>
        currentCustomers.map((customers) =>
          customers._id === selectedCustomer._id
            ? {
                ...customers,
                ...editForm,
              }
            : customers,
        ),
      );
      toast.success("Cliente actualizado correctamente");
      setSelectedCustomer(null);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Error al actulizar el cliente",
      );
    }
  }

  const filteredCustomers = customers.filter((customer) => {
    if (filter === "active") {
      return customer.status === "active";
    }
    if (filter === "inactive") {
      return customer.status === "inactive";
    }
    return true;
  });

  useEffect(() => {
    const loadUsers = async () => {
      const data = await getUsers();
      const clients = data.filter((user) => user.role === "client");
      setCustomers(clients);
    };
    loadUsers();
  }, []);
  return (
    <section className="recent-customer">
      <div className="recent-customer-header">
        <h2>Clientes Recientes</h2>
        <div className="customer-header-actions">
          <button
            className="add-customer-button"
            onClick={() => setShowCreateModal(true)}
          >
            + Agregar cliente
          </button>
          <div className="filter-container">
            <button
              className="filter-button"
              onClick={() => setShowFilter(!showFilter)}
            >
              Filtrar
            </button>
            {showFilter && (
              <div className="filter-menu">
                <button
                  onClick={() => {
                    setFilter("all");
                    setShowFilter(false);
                  }}
                >
                  Todos
                </button>
                <button
                  onClick={() => {
                    setFilter("active");
                    setShowFilter(false);
                  }}
                >
                  Activos
                </button>
                <button
                  onClick={() => {
                    setFilter("inactive");
                    setShowFilter(false);
                  }}
                >
                  Inactivos
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="customers-table">
        <div className="customers-table-header">
          <span>CLIENTE</span>
          <span>FECHA DE REGISTRO</span>
          <span>EMAIL</span>
          <span>ESTADO</span>
          <span>ACCIONES</span>
        </div>
        {filteredCustomers.map((customer, index) => (
          <div className="customer-row" key={customer._id}>
            <div className="customer-name">
              <div className="customer-avatar"></div>
              <span>{customer.name + " " + customer.lastname}</span>
            </div>
            <span>{customer.createdAt}</span>
            <span>{customer.email}</span>
            <span>
              <span
                className={`customer-status ${customer.status === "active" ? "status-active" : "status-pending"}`}
              >
                {customer.status === "active" ? "ACTIVO" : "INACTIVO"}
              </span>
            </span>
            <button
              className="customers-action"
              onClick={() => {
                setSelectedCustomer(customer);
                setEditForm({
                  name: customer.name,
                  lastname: customer.lastname,
                  email: customer.email,
                  status: customer.status,
                });
              }}
            >
              ✎
            </button>
          </div>
        ))}
      </div>
      {selectedCustomer && (
        <div className="edit-modal-overlay">
          <div className="edit-modal">
            <div className="edit-modal-header">
              <h2>Editar cliente</h2>
              <button
                className="edit-modal-close"
                onClick={() => setSelectedCustomer(null)}
              >
                ×
              </button>
            </div>
            <div className="edit-form">
              <div className="edit-form-group">
                <label> Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                />
              </div>
              <div className="edit-form-group">
                <label> Apellido</label>
                <input
                  type="text"
                  name="lastname"
                  value={editForm.lastname}
                  onChange={handleEditChange}
                />
              </div>
              <div className="edit-form-group">
                <label> Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                />
              </div>
              <div className="edit-form-group">
                <label> Estado</label>
                <select
                  name="status"
                  value={editForm.status}
                  onChange={handleEditChange}
                >
                  <option value="active">ACTIVO</option>
                  <option value="inactive">INACTIVO</option>
                </select>
              </div>
            </div>
            <div className="edit-modal-actions">
              <button
                className="edit-cancel-button"
                onClick={() => setSelectedCustomer(null)}
              >
                Cancelar
              </button>

              <button className="edit-save-button" onClick={handleEditSubmit}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
      {showCreateModal && (
        <div className="edit-modal-overlay">
          <div className="edit-modal">
            <div className="edit-modal-header">
              <h2>Agregar cliente</h2>
              <button
                className="edit-modal-close"
                onClick={() => setShowCreateModal(null)}
              >
                ×
              </button>
            </div>
            <div className="edit-form">
              <div className="edit-form-group">
                <label> Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={newCustomer.name}
                  onChange={handleCreateChange}
                />
              </div>
              <div className="edit-form-group">
                <label> Apellido</label>
                <input
                  type="text"
                  name="lastname"
                  value={newCustomer.lastname}
                  onChange={handleCreateChange}
                />
              </div>
              <div className="edit-form-group">
                <label> Email</label>
                <input
                  type="email"
                  name="email"
                  value={newCustomer.email}
                  onChange={handleCreateChange}
                />
              </div>
              <div className="edit-form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={newCustomer.password}
                  onChange={handleCreateChange}
                />
              </div>
            </div>
            <div className="edit-modal-actions">
              <button
                className="edit-cancel-button"
                onClick={() => setShowCreateModal(null)}
              >
                Cancelar
              </button>

              <button className="edit-save-button" onClick={handleCreateUser}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default RecentCustomers;
