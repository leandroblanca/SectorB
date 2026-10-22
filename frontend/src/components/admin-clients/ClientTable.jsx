import ClientRow from "./ClientRow";

function ClientsTable({clients}) {
    return (
        <section className="clients-table-container">
            <div className="clients-table-title">
                <h2>Directorio de clientes</h2>
                <span>
                    {clients.length} {clients.length === 1 ? "cliente" : "clientes"}
                </span>
            </div>

            <div className="clients-table-scroll">
                <table className="clients-table">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Ultima Visita</th>
                            <th>Ultimo Servicio</th>
                            <th>Barbero</th>
                            <th>Gasto Acumulado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.length > 0 ?(
                            clients.map((client) => (
                                <ClientRow key={client._id} client={client} />
                            ))
                        ): (
                            <tr>
                                <td colSpan={5} className="clients-empty">
                                    No se encontraron los clientes.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default ClientsTable;