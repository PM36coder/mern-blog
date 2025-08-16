import express from 'express'
import {userRegister, userLogin, updateProfile,getUserProfile,userLogout,forgotPassword,resetPassword} from '../controller/userController.js'
import { requireAuth } from '../Middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', userRegister)
router.post('/login', userLogin)
router.post('/logout', userLogout) 
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
// Profile routes
router.get('/profile', requireAuth, getUserProfile);
router.put('/update-profile', requireAuth,   updateProfile)
export default router