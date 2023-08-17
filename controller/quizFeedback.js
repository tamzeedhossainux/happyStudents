import { checkRequiredFields } from '../helper/helper.js'
import { quizFeedBackCollection } from '../db/models/QuizFeedback.js'
export const createQuizFeedback = async (req, res, next) => {
  try {
    const { user, body } = req
    checkRequiredFields(['id'], user, next)
    checkRequiredFields(['rating', 'feedback', 'complexityLevel'], body, next)
    const newFeedBack = {
      rating: body.rating,
      feedback: body?.feedback,
      complexityLevel: body?.complexityLevel,
      userId: user.id,
      quizId: body.quizId
    }
    await quizFeedBackCollection.create(newFeedBack)
    res.status(200).send('Feedback added!')
  } catch (err) {
    next(err)
  }
}
