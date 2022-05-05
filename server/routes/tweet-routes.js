import express from 'express'
import { createTweet, deleteTweet, getAllTweets, getFollowingsTweets, getTweetById, getTweetsByUsername, updateTweet } from '../controllers/tweet-controller.js'
import { verifyToken } from '../middlewares/auth-jwt.js'

const router = express.Router()

router.get('/', getAllTweets)
router.get('/:username', getTweetsByUsername)
router.get('/tweet/:id', getTweetById)
router.post('/followings', verifyToken, getFollowingsTweets)
router.post('/create', verifyToken, createTweet)
router.patch('/update/:id', verifyToken, updateTweet)
router.delete('/delete/:id', verifyToken, deleteTweet)

export default router;