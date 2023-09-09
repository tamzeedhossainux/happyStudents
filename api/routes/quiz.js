import Express from 'express'
import {
  createQuiz,
  getQuizes,
  getQuiz,
  updateQuiz
} from '../controller/quiz.js'
import { verifyToken } from '../utils/authorizer.js'

const router = Express.Router()

router.post('/create', verifyToken, createQuiz)
router.get('/quizes', verifyToken, getQuizes)
router.get('/quizes/:id', verifyToken, getQuiz)
router.post('/quizes/:id', verifyToken, updateQuiz)
export default router
