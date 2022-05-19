import Tweet from '../models/tweet.js'
import User from '../models/user.js'

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
        .populate('user', ["name", "username", "profilePicture"])
        .then(response => res.send(response))
        .catch(err => res.send(err))
}

export const getFollowingsTweets = (req, res) => {

    Tweet.find({ user: { "$in": req.body.followings } }).sort({ 'createdAt': -1 }).limit(10)
        .populate('user', ["name", "username", "profilePicture"])
        .then(response => res.send(response))
        .catch(err => res.send(err))
}


export const getTweetsByUsername = async (req, res) => {

    const user = await User.findOne({ username: req.params.username })
    if (!user) return;

    Tweet.find({ user: user._id }).sort({ createdAt: -1 })
        .populate('user', ["name", "username", "profilePicture"])
        .then(response => res.send(response))
        .catch(err => res.send(err))

}

export const deleteTweet = (req, res) => {
    Tweet.findByIdAndDelete(req.params.id)
        .then(() => res.send({ message: "Tweet was deleted successfully" }))
        .catch(err => res.send(err))
}

export const updateTweet = (req, res) => {
    let likes = req.body.tweet.likes;

    if (likes.length === 0) {
        likes.push(req.body.likeId)
    }
    else {
        for (let i = 0; i < likes.length; i++) {
            if (likes[i] === req.body.likeId) {
                likes = likes.filter(id => id !== req.body.likeId)
                break;
            }
            else if (i === (likes.length - 1)) {
                likes.push(req.body.likeId)
                break;
            }
        }
    }


    Tweet.findByIdAndUpdate(req.params.id, { likes: likes })
        .then(() => getTweetById(req, res))
        .catch(err => res.send(err))
}
