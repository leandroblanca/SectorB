import "../auth/Auth.css";
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"

function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("se ejecuto el handleSub")
        try {
            const response = await axios.post("http://localhost:3000/api/auth/login",
                formData
            )
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))

        } catch (error) {
            console.error(error.response.data)
            
        }

        if (response.data.user.role === "admin") {
            navigate("/admin")
        } else {
            navigate("cliente")
        }
    }
    return (
        <main className="login-page">
            <div className="login-container">
                <h1>SectorB</h1>
                <h2>Bienvenido</h2>

                <p>Introduce tu gmail y contraseña para entrar</p>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label> Email </label>
                        <input type="email"
                        name="email"
                        placeholder="leoblank@gmail.com"
                        value={formData.email}
                        onChange={handleChange} />
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <input type="password"
                         name="password"
                         placeholder="*******"
                         value={formData.password}
                         onChange={handleChange} />
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