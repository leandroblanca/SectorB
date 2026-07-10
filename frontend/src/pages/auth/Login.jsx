import "../auth/Auth.css";
import {Link} from "react-router-dom"

function Login() {
    return (
        <main className="login-page">
            <div className="login-container">
                <h1>SectorB</h1>
                <h2>Bienvenido</h2>

                <p>Introduce tu gmail y contraseña para entrar</p>

                <form>
                    <div>
                        <label> Email </label>
                        <input type="text"
                        placeholder="leoblank@gmail.com" />
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <input type="password"
                         placeholder="*******" />
                    </div>
                    <button type="submit">
                        Entrar
                    </button>
                </form>
                <p>No tengo una cuenta<Link to="/register" className="login-link">Registrate</Link></p>
            </div>
        </main>
    );
}

export default Login;