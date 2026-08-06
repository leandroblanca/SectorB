import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css"
import { useState } from "react";
import useAuthStore from "../store/authStore";

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
                    Inicio
                </NavLink>
                <NavLink to="/">
                    Reserva Turno
                </NavLink>
                <NavLink to="/">
                    Mis Turnos
                </NavLink>
                <NavLink to="/">
                    Perfil
                </NavLink>
            </nav>
            <div className="navbar-user">
                <button
                className="user-button"
                onClick={() => setShowMenu(!showMenu)}>
                    {user?.name}
                </button>
                {
                    showMenu && (
                        <div className="dropdown-menu">
                            <NavLink to="">
                                Mi Perfil
                            </NavLink>
                            <NavLink to="">
                                Mi Turno
                            </NavLink>
                            <button onClick={handleLogout}>
                                Cerrar sesion
                            </button>
                        </div>
                    )
                }
            </div>
        </header>
    )
}

export default NavBar;