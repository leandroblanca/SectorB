import api from "./api";
import { avatar } from "../assets/imagenes.js";

const barberAvatars = [avatar.avatar1, avatar.avatar2, avatar.avatar3, avatar.avatar4];

async function getBarber() {
    const response = await api.get("/barbers")
    return response.data.barbers
}

async function createBarber(barber) {
    // The API lists the newest barbers first.
    const barbers = await getBarber()
    const latestAvatar = barbers.find(({ image }) => barberAvatars.includes(image))?.image
    const latestIndex = latestAvatar ? barberAvatars.indexOf(latestAvatar) : 0
    const image = barberAvatars[(latestIndex + 1) % barberAvatars.length]
    const response = await api.post("/barbers", { ...barber, image })
    return response.data
}

function getBarberName(barber) {
    if (typeof barber === "string") return barber
    return [barber?.name, barber?.lastname].filter(Boolean).join(" ")
}

export {
    getBarber,
    createBarber,
    getBarberName
}
