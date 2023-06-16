import Express from 'express'
import { answerQuizQuestion } from '../controller/quizAnswer.js'
import { verifyUser } from '../utils/authorizer.js'

const router = Express.Router()

router.post('/create/:quizId', verifyUser, answerQuizQuestion)
export default router
