import api from "./api";

async function getClientDashboard() {
    const response = await api.get("/clients/dashboard");
    return response.data;
}


export{
    getClientDashboard
}