import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Home from "./pages/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ServiceAdmin from "./pages/admin-service/AdminService.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AppointementsAdmin from "./pages/admin-appointments/Appointments.jsx";
import ClientsAdmin from "./pages/admin-client/ClientAdmin.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
        <Route index element={<AdminDashboard />} />
        <Route path="services" element={<ServiceAdmin />} />
        <Route path="appointments" element={<AppointementsAdmin />} />
        <Route path="clients" element={<ClientsAdmin />} />
        </Route>

        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}

export default App;
