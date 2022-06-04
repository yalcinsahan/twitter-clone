import express from 'express'
import { getMessages, createMessage } from '../controllers/message-controller.js'

const router = express.Router()

router.get("/:conversationId", getMessages)
router.post("/", createMessage)

export default router