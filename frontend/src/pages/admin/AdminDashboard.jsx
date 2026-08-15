import Sidebar from "../../components/admin/Sidebar"
import Topbar from "../../components/admin/Topbar"
import DashboardCards from "../../components/admin/DashboardCards"
import DashboardCalendar from "../../components/admin/DashboardCalendar"
import TodayAgenda from "../../components/admin/TodayAgenda"
import "./AdminDashboard.css"
import RecentCustomers from "../../components/admin/RecentCustomers"

function AdminDashboard(params) {
    return (
        <div className="admin-layout">
            <Sidebar/>
            <main className="admin-content">
                <Topbar />
                <DashboardCards/>
                <div className="dashboard-main">

                  <DashboardCalendar/>

                  <TodayAgenda/>

                </div>
                <RecentCustomers/>
            </main>
        </div>

    )
}



export default AdminDashboard

