import Tweet from '../models/tweet.js'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'

export const getAllTweets = (req, res) => {
    Tweet.find({})
        .then(response => res.send(response))
        .catch(err => res.send(err))
}

export const createTweet = (req, res) => {
    Tweet.create({ ...req.body })
        .then(response => res.send(response))
        .catch(err => res.send(err))
}

export const getTweetById = (req, res) => {
    Tweet.findById(req.params.id)
        .then(response => res.send(response))
        .catch(err => res.send(err))
}

export const getFollowingsTweets = (req, res) => {

    Tweet.find({ ownerUsername: { "$in": req.body.followings } }).sort({ 'createdAt': -1 }).limit(10)
        .then(response => res.send(response))
        .catch(err => res.send(err))
}


export const getTweetsByUsername = async (req, res) => {

    Tweet.find({ ownerUsername: req.params.username }).sort({ createdAt: -1 })
        .then(response => res.send(response))
        .catch(err => res.send(err))
}

export const deleteTweet = (req, res) => {
    Tweet.findByIdAndDelete(req.params.id)
        .then(() => res.send({ message: "Tweet was deleted successfully" }))
        .catch(err => res.send(err))
}

export const updateTweet = (req, res) => {
    Tweet.findByIdAndUpdate(req.params.id, req.body)
        .then(() => getTweetById(req, res))
        .catch(err => res.send(err))
}