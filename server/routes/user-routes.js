import express from 'express'
import { createUser, deleteUser, followUser, getAllUsers, getUserById, getUserByUsername, updateUser } from '../controllers/user-controller.js';
import { verifyToken } from '../middlewares/auth-jwt.js'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.get('/username/:username', getUserByUsername)
router.post('/create', createUser)
router.patch('/update/:username', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.patch("/follow/:username", verifyToken, followUser)

export default router;