import axios from 'axios'

const API_URL = "http://localhost:8000/auth"

const login = async (userData) => {
    const response = await axios.post(API_URL + '/login', userData)

    if (!response.data._id) return null;

    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data
}

const signup = async (userData) => {
    const response = await axios.post(API_URL + '/signup', userData)

    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = { login, signup, logout }
export default authService