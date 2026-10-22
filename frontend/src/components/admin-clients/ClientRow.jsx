function ClientRow({client}) {
 const fullName = `${client.name || ""} ${client.lastname || ""}`.trim();

 const lastVisit = client.lastVisit
 ? new Date(client.lastVisit).toDateString("es-AR")
 : "Sin visitas";

 const lastService = client.lastService || "Sin servicios";

 const barberName  = client.lastBarber?.name || "Sin asignar";
 
 const totalSpent = new Intl.NumberFormat("es-AR",{
    style: "currency",
    currency: "ARS",
 }).format(client.totalSpent || 0);

 return (
    <tr>
        <td>
            <div className="client-info">
                <strong>{fullName || "Sin nombre"}</strong>
                <span className="client-email">{client.email}</span>
            </div>
        </td>
        <td>{lastVisit}</td>
        <td>{lastService}</td>
        <td>{barberName}</td>
    </tr>
 )
}

export default ClientRow;