import axios from "axios";

const api = axios.create(
    {
        baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api"
    }
)
api.interceptors.request.use((config) => {
    const authStorage = localStorage.getItem("auth-storage")
    if (authStorage) {
        const authData = JSON.parse(authStorage)
        const token = authData.state?.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
    }
    return config
})

api.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401) {
            const isAuthRoute = error.config?.url?.includes("/auth");

            if (!isAuthRoute) {
                localStorage.removeItem("token")
                localStorage.removeItem("user")
            }
        }
        return Promise.reject(error)
    }
)

export default api;