import "./Topbar.css";
import useAuthStore from "../store/authStore";

function Topbar() {
  const user = useAuthStore((state) => state.user);
  return (
    <header className="topbar">
      <div>
        <h1>Dashboard</h1>
        <p>Bienvenido Nuevamente. {user?.name}</p>
      </div>
    </header>
  );
}

export default Topbar;
