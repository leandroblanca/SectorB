import "./Sidebar.css"
import { NavLink } from "react-router-dom"
import useAuthStore from "../store/authStore"

function Sidebar () {
    const user = useAuthStore((state) => state.user)
    return(
        <aside className="sidebar">
            <div className="sidebar-logo">
                <h2>
                    SectorB
                </h2>
            </div>
            <div className="sidebar-user">
                <h3>{user?.name}</h3>
                <span>Administrador</span>
            </div>
            <nav className="sidebar-menu">
                <NavLink to="/admin">
                    Dashboard
                </NavLink>
                <NavLink to="/admin/services">
                    Servicios
                </NavLink>
                <NavLink to="/admin/appointmets">
                    Turnos
                </NavLink>
                <NavLink to="/admin/clients">
                    Clientes
                </NavLink>
                <NavLink to="/admin/perfile">
                    Perfil
                </NavLink>
            </nav>
        </aside>
    )
}

export default Sidebar;