import Express from 'express'
import { createQuizFeedback } from '../controller/quizFeedback.js'
import { verifyUser } from '../utils/authorizer.js'

const router = Express.Router()

router.post('/create', verifyUser, createQuizFeedback)
export default router
