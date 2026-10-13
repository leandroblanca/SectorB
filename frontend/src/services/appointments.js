import api from "./api.js"

async function getAppointmets() {
    const response = await api.get("/appointments");
    
    return response.data.appointments;
}

async function getAppointmetsById(id) {
    const response = await api.get(`/appointments/${id}`);
    
    return response.data.appointment;
}

async function updateAppointmetsStatus(id, status) {
    const response = await api.patch(`/appointments/${id}/status`,{status});
    
    return response.data.appointment;
}

async function createAppointmets(appointmentData) {
    const response = await api.post("/appointments",
        appointmentData
    );

    return response.data.appointment;
}


export{
    getAppointmets,
    getAppointmetsById,
    updateAppointmetsStatus,
    createAppointmets
}