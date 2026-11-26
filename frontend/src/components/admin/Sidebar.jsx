import { FiGrid, FiScissors, FiCalendar, FiUsers, FiUser, FiLogOut } from "react-icons/fi";
import "./Sidebar.css"
import { NavLink, useNavigate } from "react-router-dom"
import useAuthStore from "../store/authStore"

function Sidebar () {
    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate("/login", { replace: true })
    }
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
                    <FiGrid className="ui-icon" aria-hidden="true" /> Dashboard
                </NavLink>
                <NavLink to="/admin/services">
                    <FiScissors className="ui-icon" aria-hidden="true" /> Servicios
                </NavLink>
                <NavLink to="/admin/appointments">
                    <FiCalendar className="ui-icon" aria-hidden="true" /> Turnos
                </NavLink>
                <NavLink to="/admin/clients">
                    <FiUsers className="ui-icon" aria-hidden="true" /> Clientes
                </NavLink>
                <NavLink to="/admin/profile">
                    <FiUser className="ui-icon" aria-hidden="true" /> Perfil
                </NavLink>
                <button type="button" className="sidebar-logout" onClick={handleLogout}>
                    <FiLogOut className="ui-icon" aria-hidden="true" /> Cerrar sesión
                </button>
            </nav>
        </aside>
    )
}

export default Sidebar;
