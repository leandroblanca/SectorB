import { useState } from "react";
import { FiScissors } from "react-icons/fi";
import { toast } from "react-toastify";
import { createBarber } from "../../services/barberService.js";

function CreateBarberForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (isLoading) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = data.get("name").trim();
    const lastname = data.get("lastname").trim();

    if (name.length < 3 || name.length > 50) {
      toast.error("Ingresá un nombre de entre 3 y 50 caracteres.");
      return;
    }
    if (!lastname || lastname.length > 50) {
      toast.error("Ingresá un apellido de hasta 50 caracteres.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await createBarber({ name, lastname });
      toast.success(response.message || "Barbero creado correctamente");
      form.reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "No se pudo crear el barbero");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="profile-admin-details profile-admin-barber-form" aria-labelledby="create-barber-title">
      <div className="profile-admin-section-header">
        <div>
          <h2 id="create-barber-title"><FiScissors className="ui-icon" aria-hidden="true" /> Crear barbero</h2>
          <p>Agregá un barbero para que aparezca en las reservas.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="profile-admin-form-grid">
          <div className="profile-admin-field">
            <label htmlFor="barber-name">Nombre</label>
            <input id="barber-name" name="name" type="text" minLength={3} maxLength={50} required disabled={isLoading} />
          </div>
          <div className="profile-admin-field">
            <label htmlFor="barber-lastname">Apellido</label>
            <input id="barber-lastname" name="lastname" type="text" maxLength={50} required disabled={isLoading} />
          </div>
        </div>
        <div className="profile-admin-form-actions">
          <button type="submit" className="profile-admin-save-button" disabled={isLoading}>
            {isLoading ? "Creando…" : "Crear barbero"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreateBarberForm;
