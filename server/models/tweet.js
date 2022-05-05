import mongoose from 'mongoose'

const tweetSchema = mongoose.Schema({
    text: { type: String, maxLength: 280 },
    image: { type: String },
    ownerUsername: { type: String, required: true },
    ownerName: { type: String, required: true },
    ownerProfilePicture: { type: String },
    likes: { type: Array },
    replies: { type: Array },
},
    { timestamps: true }
)

export default mongoose.model('tweet', tweetSchema)