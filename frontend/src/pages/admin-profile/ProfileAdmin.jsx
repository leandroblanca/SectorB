import { useState } from "react";
import { createAdmin } from "../../services/profileService";
import { toast } from "react-toastify";
import "./ProfileAdmin.css";

function ProfileAdmin() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await createAdmin(formData);

      toast.success(
        response.message || "El administrador se creo correctamente.",
      );
      setFormData({
        name: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "No se pudo craer el administrador",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="profile-admin">
      <div className="profile-admin-header">
        <div>
          <h1>Mi Perfil</h1>
          <p>Administra tu cuenta y los accesos al sistema</p>
        </div>
      </div>
      <div className="profile-admin-content">
        <aside className="profile-admin-card">
          <div className="profile-admin-avatar">
            <span>AD</span>
          </div>
          <h2>Administrador Principa</h2>
          <p className="profile-admin-role">Administrador del sistema</p>
          <div className="profile-admin-divider"></div>
          <div className="profile-admin-summary">
            <div>
              <span>Tipo de cuenta</span>
              <strong>Principal</strong>
            </div>
            <div>
              <span>Permisos</span>
              <strong>Administracion completa</strong>
            </div>
            <div>
              <span>Estados de la cuenta</span>
              <strong className="profile-admin-status">Activa</strong>
            </div>
          </div>
        </aside>
        <div className="profile-admin-details">
          <div className="profile-admin-section-header">
            <div>
              <h2>Crear administrador secundario </h2>
              <p>Completa los datos para dar de alta un nuevo administrador</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="profile-admin-form-grid">
              <div className="profile-admin-field">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ingresa el nombre"
                  minLength={3}
                  maxLength={50}
                  pattern="[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]+( [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]+)*"
                  title="Ingresá entre 3 y 50 caracteres."
                  required
                />
              </div>
              <div className="profile-admin-field">
                <label htmlFor="lastname">Apellido</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Ingresa el apellido"
                  minLength={3}
                  maxLength={50}
                  pattern="[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]+( [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]+)*"
                  title="Ingresá entre 3 y 50 caracteres."
                  required
                />
              </div>
              <div className="profile-admin-field">
                <label htmlFor="email">Correo electronico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ingresa el correo electronico"
                  maxLength={50}
                  required
                />
              </div>
              <div className="profile-admin-field">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Crea una contraseña"
                  autoComplete="new-password"
                  minLength={8}
                  maxLength={50}
                  pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9\s]).{8,50}"
                  title="Debe contener mayuscula, minuscula, numero y caracter especial"
                  required
                />
              </div>
              <div className="profile-admin-field">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeti la contrseña"
                  autoComplete="new-password"
                  minLength={8}
                  maxLength={50}
                  pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9\s]).{8,50}"
                  title="Debe contener mayuscula, minuscula, numero y caracter especial"
                  required
                />
              </div>
            </div>

            <div className="profile-admin-form-actions">
              <button
                type="submit"
                className="profile-admin-save-button"
                disabled={isLoading}
              >
                {isLoading ? "Creando..." : "Crear administrador"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ProfileAdmin;
