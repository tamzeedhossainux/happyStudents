import Express from 'express'
import {
  createQuizQuestion,
  getQuizQuestions
} from '../controller/quizQuestion.js'
import { verifyUser } from '../utils/authorizer.js'

const router = Express.Router()

router.post('/create/:quizId', verifyUser, createQuizQuestion)
router.post('/', verifyUser, getQuizQuestions)
export default router
