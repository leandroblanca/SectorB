import { useState, useEffect } from "react";
import "./DashboardCards.css";
import { getUsers } from "../../services/useService";

function DashboardCards() {
  const [totalClients, setTotalClients] = useState(0);
 /* async function clientsTotal(params) {
      const users = await getUsers();
      const clients = users.filter((user) => user.role === "client");
      setTotalClients(clients.length)
    
  }*/
 
 useEffect(() => {
  async function loadClients() {
    try {
      const users = await getUsers();
      const clients = users.filter(
        (user) => user.role === "client"
      );

      setTotalClients(clients.length);
    } catch (error) {
      
    }
  }

  loadClients();
}, []);
    
  
  
  return (
      <section className="dashboard-card">
      <div className="dashboard-cards">
        <span>Clientes</span>
        <strong>
            {totalClients}
        </strong>
      </div>
      <div className="dashboard-cards">
        <span>Tuenos hoy</span>
        <strong>10</strong>
      </div>
      <div className="dashboard-cards">
        <span>Servicios</span>
        <strong>8</strong>
      </div>
      <div className="dashboard-cards">
        <span>Cancelados</span>
        <strong>3</strong>
      </div>
    </section>
  );
}

export default DashboardCards;
