import express from 'express'
import {addComment ,getAllComments} from '../controller/commentController.js'
import { requireAuth } from '../Middleware/authMiddleware.js'
const router = express.Router()

router.post('/add/:postId',requireAuth, addComment);
router.get('/all/:postId' , getAllComments)


export default router