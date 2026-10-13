import api from "./api";

async function getBarber() {
    const response = await api.get("/barbers")
    return response.data.barbers
}

export {
    getBarber
}