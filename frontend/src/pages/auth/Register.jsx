import "../auth/Auth.css";
import {Link} from "react-router-dom";



function Register() {
    return (
        <main className="login-page">
            <div className="login-container">
                <h1>SectorB</h1>
                <h2>Bienvenido</h2>

                <p>Registrate para iniciar sesion </p>

                <form>
                    <div>
                        <label> Nombre </label>
                        <input type="text"
                        placeholder="Leandro"
                         />
                    </div>
                    <div>
                        <label> Apellido </label>
                        <input type="text"
                        placeholder="Blanca"
                         />
                    </div>
                    <div>
                        <label> Email </label>
                        <input type="email"
                        name="email"
                        placeholder="leoblank@gmail.com"
                         />
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <input type="password"
                         name="password"
                         placeholder="*******"
                         />
                    </div>
                    <div>
                        <label>Repetir Contraseña</label>
                        <input type="password"
                         name="password"
                         placeholder="*******"
                         />
                    </div>
                    <button type="submit">
                        Entrar
                    </button>
                </form>
                <p>No tengo una cuenta<Link to="/login" className="login-link">Login</Link></p>
            </div>
        </main>
    );
}

export default Register;