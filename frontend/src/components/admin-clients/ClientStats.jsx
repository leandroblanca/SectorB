function ClientStats({ stats }) {
  return (
    <section className="clients-stats">
      <article className="client-stat-card">
        <span>Total Clientes</span>
        <h2>{stats.totalClients}</h2>
        <p>Clientes resgistrado en el sistema</p>
      </article>
      <article className="client-stat-card">
        <span>Nuevos Clientes Este Mes</span>
        <h2>{stats.newClients ?? 0}</h2>
        <p>Nuevos resgistros durante el mes actual</p>
      </article>
      <article className="client-stat-card">
        <span>Clientes VIP </span>
        <h2>{stats.vipClients ?? "-"}</h2>
        <p>Clientes destacados de SectorB.</p>
      </article>
    </section>
  );
}


export default ClientStats;