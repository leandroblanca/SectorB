import api from "./api";

async function getServices() {
    const response = await api.get("/services")
    return response.data.services
}
async function createService(serviceData) {
    const response = await api.post(
        "/services",
        serviceData
    );
    return response.data
}

async function deleteService(id) {
    const response = await api.delete(`/services/${id}`)

    return response.data
}

async function updateService(id,dataService) {
    const response = await api.put(
        `/services/${id}`,
        dataService
    )
    return response.data
}


export{getServices, createService, deleteService, updateService}
