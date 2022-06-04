import express from 'express'
import { createConversation, getConversation } from '../controllers/conversation-controller.js'

const router = express.Router()

router.get("/:userId", getConversation)
router.post("/", createConversation)

export default router