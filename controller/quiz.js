import { quizCollection } from "../db/models/Quiz.js";
import{createError} from "../utils/error.js"

export const createQuiz = async (req, res, next) =>{
      try{
            const { user, body } = req
            const newQuiz = {
                  title: body.title,
                  instruction: body?.instruction,
                  tag: body?.tag,
                  isPublished: body?.isPublished || false,
                  isCompleted: body?.isCompleted || false,
                  isDeleted: body?.isDeleted || false,
                  totalMark: body?.totalMark || 0,
                  openDate: body?.openDate || new Date(),
                  closeDate: body?.closeDate || new Date(),
                  quizCategotyId: body?.quizCategotyId,
                  createdBy: user.id

            }
            await quizCollection.create(newQuiz)
            res.status(200).send('Quiz added!')

      } catch(err){
            next(err)
      }
}

export const getQuizes = async (req, res, next) =>{
      try{
            const { user, body } = req
            let filter = {
                  order:[['createdAt', 'DESC']]
      
              };
              filter.where = {
                  "isDeleted": false
              }
            if(!user.isAdmin){
                  filter.where.createdBy = user.id
            }

            if(isAdmin && body?.userId) {
                  filter.where.createdBy = body.userId
            }

            const quizes = await quizCollection.findAll(filter)
            res.status(200).send(quizes)

      } catch(err){
            next(err)
      }
}

export const getQuiz = async (req, res, next) =>{
      try{
            const { user, params } = req
            let filter = {
                  where: {
                        "isDeleted": false,
                        "id": params.id
                  }
              };
            if(!user.isAdmin){
                  filter.where.createdBy = user.id
            }

            const quize = await quizCollection.findOne(filter)
            if(!quize) return next(createError(404, 'Quiz not found!'))
            res.status(200).send(quize)

      } catch(err){
            next(err)
      }
}

export const updateQuiz = async (req, res, next) =>{
      try{
            const { user, body, params } = req
            let filter = {
                  where: {
                        "isDeleted": false,
                        "id": params.id
                  }
              };
            if(!user.isAdmin){
                  filter.where.createdBy = user.id
            }

            const quize = await quizCollection.findOne(filter)
            if(!quize) return next(createError(404, 'Quiz not found!'))
            
            quize.title = body?.title || quize.title,
            quize.instruction = body?.instruction || quize.instruction,
            quize.tag = body?.tag || quize.tag,
            quize.isPublished = body?.isPublished || quize.isPublished,
            quize.isCompleted = body?.isCompleted || quize.isCompleted,
            quize.isDeleted = body?.isDeleted || quize.isDeleted,
            quize.totalMark = body?.totalMark || quize.totalMark,
            quize.openDate = body?.openDate || quize.openDate,
            quize.closeDate = body?.closeDate || quize.closeDate

            await quize.save()

            res.status(200).send('Quiz Updated!')

      } catch(err){
            next(err)
      }
}