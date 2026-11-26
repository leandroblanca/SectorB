import { FiHome, FiCalendar, FiInfo, FiUser, FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css"
import { useState } from "react";
import useAuthStore from "../store/authStore";
import { client } from "../../assets/imagenes.js";

function NavBar() {
    const navigate = useNavigate()
    const logout = useAuthStore((state) => state.logout)
    const user = useAuthStore((state) => state.user)
    const [showMenu, setShowMenu] = useState(false)
    const handleLogout = () => {
        logout()
        navigate("/login");
    }

    return (
        <header className="navbar">
            <div className="navbar-logo">
                <h1>SectorB</h1>
            </div>
            <nav className="navbar-links">
                <NavLink to="/home">
                    <FiHome className="ui-icon" aria-hidden="true" /> Inicio
                </NavLink>
                <NavLink to="/book-appointment">
                    <FiCalendar className="ui-icon" aria-hidden="true" /> Reserva Turno
                </NavLink>
                <NavLink to="/nosotros">
                    <FiInfo className="ui-icon" aria-hidden="true" /> Nosotros
                </NavLink>
                <NavLink to="/profile">
                    <FiUser className="ui-icon" aria-hidden="true" /> Mi Perfil
                </NavLink>
            </nav>
            <div className="navbar-user">
                <button
                className="user-button"
                type="button"
                aria-expanded={showMenu}
                onClick={() => setShowMenu(!showMenu)}>
                    {user ? <img className="navbar-avatar" src={client.client} alt="" /> : <FiUser className="ui-icon" aria-hidden="true" />}
                    <span>{user?.name || "Cuenta"}</span>
                </button>
                {
                    showMenu && (
                        <div className="dropdown-menu">
                            <NavLink to="/profile">
                                Mi Perfil
                            </NavLink>
                            <NavLink to="/home">
                                Inicio
                            </NavLink>
                            <button onClick={handleLogout}>
                                <FiLogOut className="ui-icon" aria-hidden="true" /> Cerrar sesión
                            </button>
                        </div>
                    )
                }
            </div>
        </header>
    )
}

export default NavBar;
