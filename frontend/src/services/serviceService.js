import api from "./api";

async function getServices() {
    try {
        const response = await api.get("/services")
    
        return response.data.services
        
    } catch (error) {
        console.error(
      "ERROR AL OBTENER SERVICIOS:",
      error.response?.data || error.message
    );

    throw error;
    }
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