import axios from 'axios'

const API_URL = "http://localhost:8000/users"

export const getUser = async (username) => {
    const response = await axios.get(API_URL + "/username/" + username)

    return response.data;
}

export const getUserById = async (id) => {
    const response = await axios.get(API_URL + "/" + id)
    return response.data;
}

export const followUser = async (user, userId) => {
    const response = await axios.patch(API_URL + "/follow/" + user.username, { following: userId }, { headers: { 'x-access-token': user.accessToken } })

    return response.data
}

export const updateUser = async (user) => {
    return await axios.patch(API_URL + "/update/" + user.username, user, { headers: { 'x-access-token': user.accessToken } })
}