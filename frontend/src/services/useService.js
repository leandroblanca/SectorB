import api from "./api"

async function getUsers() {
    const response = await api.get("/users")

    return response.data.users;

}

async function updateUserStatus(id, status) {
    const response = await api.patch(
        `/users/${id}/status`,
        {status}
    )
    return response.data
}

async function updateUser(id, userData) {
        const response = await api.patch(
            `/users/${id}`,
            userData
        )
        return response.data;
}

async function createUser(userData) {
    const response = await api.post(
        "/users",
        userData
    );
    return response.data
}



export {
    getUsers,
    updateUserStatus,
    updateUser,
    createUser
}