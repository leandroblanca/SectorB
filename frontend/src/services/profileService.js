import api from "./api";

async function createAdmin(formData) {
    const {confirmPassword, ...adminData} = formData

    const response = await api.post("/admin/create-admin", adminData)
    return response.data
}

async function getMyProfile() {
    const response = await api.get("/users/me")
    return response.data.user
}

async function updateMyProfile(data) {
    const response = await api.patch("/users/me", data)
    return response.data.user
}

export {createAdmin, getMyProfile, updateMyProfile}
