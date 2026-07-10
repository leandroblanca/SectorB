import "../auth/Auth.css"
function Register(params) {
    return (
        <main className="login-page">
                    <div className="login-container">
                        <h1>SectorB</h1>
                        <h2>Bienvenido</h2>
        
                        <p>Introduce tu gmail y contraseña para entrar</p>
        
                        <form>
                            <div>
                                <label> Nombre </label>
                                <input type="text"
                                placeholder="leo" />
                            </div>
                            <div>
                                <label> Apellido </label>
                                <input type="text"
                                placeholder="Blanca" />
                            </div>
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
                            <div>
                                <label>Confirmar Contraseña</label>
                                <input type="password"
                                 placeholder="*******" />
                            </div>
                            <button type="submit">
                                Register
                            </button>
                        </form>
                        <p>Ya tengo una cuenta?<Link to="/login">Login</Link></p>
                    </div>
                </main>
    )
}

export default Register;