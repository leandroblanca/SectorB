import api from "./api";

async function createAdmin(formData) {
    const {confirmPassword, ...adminData} = formData

    const response = await api.post("/admin/create-admin", adminData)
    return response.data
}

export {createAdmin}