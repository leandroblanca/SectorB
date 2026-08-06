import { Navigate } from "react-router-dom";
import useAuthStore from "./store/authStore";

function ProtectedRoute({children, allowedRoles}) {
    const token = useAuthStore((state) => state.token)
    const user = useAuthStore((state) => state.user)

    if (!token) {
        return <Navigate to="/login" replace
        />
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/login" replace
        />
    }
    
    return children;
}

export default ProtectedRoute;