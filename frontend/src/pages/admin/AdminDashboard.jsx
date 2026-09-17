import DashboardCards from "../../components/admin/DashboardCards"
import DashboardCalendar from "../../components/admin/DashboardCalendar"
import TodayAgenda from "../../components/admin/TodayAgenda"
import "./AdminDashboard.css"
import RecentCustomers from "../../components/admin/RecentCustomers"


function AdminDashboard() {
    return (    
        <>
                <DashboardCards/>

                <div className="dashboard-main">
                  <DashboardCalendar/>

                  <TodayAgenda/>
                </div>

                <RecentCustomers/>

        </>

    )
}



export default AdminDashboard

