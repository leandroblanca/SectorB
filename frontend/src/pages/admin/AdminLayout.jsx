import { Outlet } from "react-router-dom";

import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import "./AdminLayout.css"

function AdminLayout() {
    return (
        <div className="admin-layout">
            <Sidebar/>
            <main className="admin-content">
                <Topbar/>
                <Outlet/>
            </main>
        </div>
    )
}

export default AdminLayout;