import { quizCollection } from "../db/models/Quiz";

export const createQuiz = async (req, res) =>{
      const { user } = req
      const newQuiz = {
            title: req.body.title,
            instruction: req?.body?.instruction,
            tag: req?.body?.tag,
            isPublished: req?.body?.isPublished || false,
            isCompleted: req?.body?.isCompleted || false,
            isDeleted: req?.body?.isDeleted || false,
            totalMark: res?.body?.totalMark || 0,
            openDate: req?.body?.openDate || new Date(),
            closeDate: req?.body?.closeDate || new Date()

      }
}