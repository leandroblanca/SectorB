import api from "./api";

async function getServices() {
    const response = await api.get("/services")

    return response.data.services
}

export{getServices}