import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import config from './config/index.js'
import userRouter from './routes/user-routes.js'
import authRouter from './routes/auth-routes.js'
import tweetRouter from './routes/tweet-routes.js'


dotenv.config()

const app = express()

app.use(cors({ origin: "*" }))

config.connectToDatabase()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/tweets', tweetRouter)


app.listen(process.env.PORT, () => console.log(`server is running port ${process.env.PORT}`));