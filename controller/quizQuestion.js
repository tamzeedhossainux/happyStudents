import { quizQuestionCollection } from "../db/models/QuizQuestion.js"
import{createError} from "../utils/error.js"


export const createQuizQuestion = async (req, res, next) =>{
      try{
            const { user, body, params } = req
            let filter = {
                  where: {
                        "isDeleted": false,
                        "id": params.quizId
                  }
              };
            if(!user.isAdmin){
                  filter.where.createdBy = user.id
            }

            const quiz = await quizCollection.findOne(filter)
            if(!quiz) return next(createError(404, 'Quiz not found!'))
            const newQuizQuestion = {
                  quizId: params.quizId,
                  title: body?.title,
                  description: body?.description,
                  type: body?.type,
                  tag: body?.tag,
                  option1: body?.option1,
                  option2: body?.option2,
                  option3: body?.option3,
                  option4: body?.option4,
                  isOption1Correct: body?.isOption1Correct || false,
                  isOption2Correct: body?.isOption2Correct || false,
                  isOption3Correct: body?.isOption3Correct || false,
                  isOption4Correct: body?.isOption4Correct || false,
                  complexityLevel: body?.complexityLevel || 0
            }
            await quizQuestionCollection.create(newQuizQuestion)
            res.status(200).send('Quiz Question added!')

      } catch(err){
            next(err)
      }
}

export const getQuizQuestions = async (req, res, next) =>{
      try{
            const { user, body } = req
            let filter = {
                  order:[['createdAt', 'ASC']]
              };

            const quizeQuestions = await quizQuestionCollection.findAll(filter)
            res.status(200).send(quizes)

      } catch(err){
            next(err)
      }
}
