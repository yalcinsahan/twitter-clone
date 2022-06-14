import axios from 'axios'

const API_URL = "http://localhost:8000"

export const getConversations = async (userId) => {
    const res = await axios.get(`${API_URL}/conversations/${userId}`)

    return res.data
}

export const getMessages = async (chatId) => {
    const res = await axios.get(`${API_URL}/messages/${chatId}`)

    return res.data
}

export const postMessage = async (message) => {
    const res = await axios.post("http://localhost:8000/messages", message)

    return res.data
}