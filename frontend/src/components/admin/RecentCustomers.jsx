import "./RecentCustomers.css";

function RecentCustomers(params) {
  const customers = [
    {
      name: "Leandro Blanca",
      joinedDate: "11 ago, 2026",
      preferredBarber: "James",
      status: "Activo",
    },
    {
      name: "Mateo Blanca",
      joinedDate: "18 ago, 2026",
      preferredBarber: "James",
      status: "Activo",
    },
    {
      name: "Pedro Blanca",
      joinedDate: "9 ago, 2026",
      preferredBarber: "James",
      status: "Activo",
    },
    {
      name: "Juan Blanca",
      joinedDate: "13 ago, 2026",
      preferredBarber: "Marcos",
      status: "Pemdiente",
    },
  ];
  return (
    <section className="recent-customer">
      <div className="recent-customer-header">
        <h2>Clientes Recientes</h2>
        <button className="filter-button">Filtrar</button>
      </div>
      <div className="customers-table">
        <div className="customers-table-header">
          <span>CLIENTE</span>
          <span>FECHA DE REGISTRO</span>
          <span>BARBERO</span>
          <span>ESTADO</span>
          <span>ACCIONES</span>
        </div>
        {customers.map((customer, index) => (
          <div className="customer-row" key={index}>
            <div className="customer-name">
              <div className="customer-avatar"></div>
              <span>{customer.name}</span>
            </div>
            <span>{customer.joinedDate}</span>
            <span>{customer.preferredBarber}</span>
            <span>
                <span className= {`customer-status ${customer.status === "Activo" ? "status-active" : "status pending"}`}>
                    {customer.status}
                </span>
            </span>
            <button className="customers-action"> 
                ✎
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}


export default RecentCustomers;