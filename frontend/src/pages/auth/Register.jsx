import { useState } from "react";
import "../auth/Auth.css";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";



function Register() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        repeatPassword:"",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:3000/api/auth/register",
                formData
            )
            toast.success(response.data.message)
            navigate("/login")
        } catch (error) {
            console.log(error.response)
            if (error.response) {
                console.log(error.response.data)
                toast.error(error.response.data.message)
            }else{
                toast.error(" No se pudo conectar al servidor ")
            }
        }
    }
    return (
        <main className="login-page">
            <div className="login-container">
                <h1>SectorB</h1>
                <h2>Bienvenido</h2>

                <p>Registrate para iniciar sesion </p>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label> Nombre </label>
                        <input type="text"
                        placeholder="Leandro"
                        name="name"
                        onChange={handleChange}
                         />
                    </div>
                    <div>
                        <label> Apellido </label>
                        <input type="text"
                        placeholder="Blanca"
                        name="lastname"
                        onChange={handleChange}
                         />
                    </div>
                    <div>
                        <label> Email </label>
                        <input type="email"
                        name="email"
                        placeholder="leoblank@gmail.com"
                        onChange={handleChange}
                         />
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <input type="password"
                         name="password"
                         placeholder="*******"
                         onChange={handleChange}
                         />
                    </div>
                    <div>
                        <label>Repetir Contraseña</label>
                        <input type="password"
                         name="repeatPassword"
                         placeholder="*******"
                         onChange={handleChange}
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