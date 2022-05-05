import axios from 'axios'
import { useSelector } from 'react-redux';

const API_URL = "http://localhost:8000/tweets"

const user = JSON.parse(localStorage.getItem('user'));

export const createTweet = async (tweet, accessToken) => {
    const response = await axios.post(API_URL + "/create", tweet, { headers: { 'x-access-token': accessToken } })
    return response.data
}

export const getTweets = async (username) => {
    const response = await axios.get(API_URL + "/" + username)
    return response.data
}

export const getFollowingsTweets = async (followings, accessToken) => {
    const response = await axios.post(API_URL + "/followings", { followings: followings }, { headers: { 'x-access-token': accessToken } })
    return response.data
}