import Express from 'express'
import {
  createQuizQuestion,
  getQuizQuestions
} from '../controller/quizQuestion.js'
import { verifyToken } from '../utils/authorizer.js'

const router = Express.Router()

router.post('/create/:quizId', verifyToken, createQuizQuestion)
router.post('/', verifyToken, getQuizQuestions)
export default router
