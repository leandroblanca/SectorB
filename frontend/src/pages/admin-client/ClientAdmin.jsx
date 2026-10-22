import { useState } from "react";
import "./ClientAdmin.css";
import { useEffect } from "react";
import ClientStats from "../../components/admin-clients/ClientStats";
import ClientsTable from "../../components/admin-clients/ClientTable";
import { getClientDashboard } from "../../services/clientService";
import { toast } from "react-toastify";

 function ClientsAdmin() {
  const [clients, setClients] = useState([]);
  const [stats, setStats] = useState({
    totalClients: 0,
    newClients: 0,
  });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadingClient() {
      try {
        const data = await getClientDashboard();
        setClients(data.clients || []);
        setStats({
          totalClients: data.stats?.totalClients ?? data.clients?.length ?? 0,
          newClients: data.stats?.newClients ?? 0,
          vipClients: data.stats?.vipClients ?? null,
        });
      } catch (error) {
        console.error(
          "Error al obtener el dashboard de clientes",
          error.response?.data || error.message,
        );
        toast.error("No se pudo cargar el dashboard de clientes.");
      } finally {
        setLoading(false);
      }
    }
    loadingClient();
  }, []);

  const filteredClients = clients.filter((client) => {
    const fullName =
      `${client.name || ""} ${client.lastname || ""}`.toLowerCase();

    const email = (client.email || "").toLowerCase();
    const searchText = search.trim().toLowerCase();

    const matchesSearch =
      fullName.includes(searchText) || email.includes(searchText);

    const now = new Date();
    const createdAt = client.createdAt ? new Date(client.createdAt) : null;

    const matchesNew =
      createdAt &&
      createdAt.getMonth() === now.getMonth() &&
      createdAt.getFullYear() === now.getFullYear();
    const matchesFilter = filter === "all" || (filter === "new" && matchesNew);

    return matchesSearch && matchesFilter;
  });
  if (loading) {
    return <p className="client-loading">Cargando Clientes...</p>;
  }
  return (
    <main className="clients-admin">
      <header className="clients-header">
        <div>
          <span className="clients-title-admin">Administracion</span>
          <h1>Directorio de clientes</h1>
          <p>Consulta y gestion de los clientes registrado en sectorB.</p>
        </div>
        <input
          type="text"
          className="client-search"
          placeholder="Buscar Cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ClientStats stats={stats} />
        <nav className="clients-filters">
          <button
            type="button"
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            Todos ({stats.totalClients})
          </button>

          <button
            type="button"
            className={filter === "new" ? "active" : ""}
            onClick={() => setFilter("new")}
          >
            Nuevos ({stats.newClients})
          </button>
        </nav>

        <ClientsTable clients={filteredClients} />
      </header>
    </main>
  );
}

export default ClientsAdmin;
