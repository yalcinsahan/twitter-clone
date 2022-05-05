import mongoose from 'mongoose'

export const connectToDatabase = () => {
    mongoose.connect('mongodb://localhost:27017/social-media')
        .then(() => console.log("connected to database"))
        .catch(err => console.log(err))
}