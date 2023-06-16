import Express from 'express'
import {
  createQuizCategory,
  updateQuizCategoryStatus,
  getQuizCatagories
} from '../controller/quizCatagory.js'
import { verifyAdmin, verifyUser } from '../utils/authorizer.js'

const router = Express.Router()

router.post('/create', verifyAdmin, createQuizCategory)
router.post('/update/:id', verifyAdmin, updateQuizCategoryStatus)
router.get('/categories', verifyUser, getQuizCatagories)

export default router
