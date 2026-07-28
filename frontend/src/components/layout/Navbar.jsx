import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css"
import { useState } from "react";

function NavBar() {
    const navigate = useNavigate()
    
    const user= JSON.parse(localStorage.getItem("user"))
    const [showMenu, setShowMenu] = useState(false)
    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")

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
                            <button onClick={logout}>
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