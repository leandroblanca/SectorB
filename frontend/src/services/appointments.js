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
async function getMyappointments() {
    const response = await api.get("/appointments/my-appointments")
    return response.data
}
async function getAvailability(barberId, date) {
  const response = await api.get("/appointments/availability", {
    params: {
      barber: barberId,
      date,
    },
  });

  const { availableTimes } = response.data;
  if (!Array.isArray(availableTimes)) {
    throw new Error("La API no devolvió una lista de horarios.");
  }

  return availableTimes;
}

export{
    getAppointmets,
    getAppointmetsById,
    updateAppointmetsStatus,
    createAppointmets,
    getMyappointments,
    getAvailability
}
