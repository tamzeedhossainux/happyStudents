import { quizCollection } from '../db/models/Quiz.js'
import { quizCategoryCollection } from '../db/models/QuizCategory.js'
import { quizPerticipentHistoryCollection } from '../db/models/QuizPerticipentHistory.js'
import { checkRequiredFields } from '../helper/helper.js'
import { createError } from '../utils/error.js'

export const createQuiz = async (req, res, next) => {
  try {
    const { user, body } = req
    checkRequiredFields(['id'], user, next)
    checkRequiredFields(
      ['title', 'instruction', 'tag', 'quizCategotyId'],
      body,
      next
    )
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
  } catch (err) {
    next(err)
  }
}

export const getQuizes = async (req, res, next) => {
  try {
    const { user } = req
    checkRequiredFields(['id'], user, next)
    const filter = {
      order: [['createdAt', 'DESC']]
    }
    filter.where = {
      isDeleted: false
    }
    if (!user.isAdmin) {
      filter.where.createdBy = user.id
    }

    filter.include = [{ model: quizCategoryCollection }]

    const quizes = await quizCollection.findAll(filter)

    const participantFilter = {
      where: {
        userId: user.id,
        quizId: quizes.map((quiz) => quiz.id)
      },
      attributes: ['quizId']
    }

    const participants = await quizPerticipentHistoryCollection.findAll(
      participantFilter
    )
    console.log('participants', participants)

    const participantSet = new Set(
      participants.map((participant) => participant.quizId)
    )
    console.log('participantSet', participantSet)

    const quizzesWithParticipantFlag = quizes.map((quiz) => ({
      ...quiz.toJSON(),
      isParticipant: participantSet.has(quiz.id)
    }))

    res.status(200).send(quizzesWithParticipantFlag)
  } catch (err) {
    next(err)
  }
}

export const getQuiz = async (req, res, next) => {
  try {
    const { user, params } = req
    checkRequiredFields(['id'], user, next)
    const filter = {
      where: {
        isDeleted: false,
        id: params.id
      }
    }
    if (!user.isAdmin) {
      filter.where.createdBy = user.id
    }

    const quize = await quizCollection.findOne(filter)
    if (!quize) return next(createError(404, 'Quiz not found!'))
    res.status(200).send(quize)
  } catch (err) {
    next(err)
  }
}

export const updateQuiz = async (req, res, next) => {
  try {
    const { user, body, params } = req
    checkRequiredFields(['id'], user, next)
    const filter = {
      where: {
        isDeleted: false,
        id: params.id
      }
    }
    if (!user.isAdmin) {
      filter.where.createdBy = user.id
    }

    const quize = await quizCollection.findOne(filter)
    if (!quize) return next(createError(404, 'Quiz not found!'))
    ;(quize.title = body?.title || quize.title),
      (quize.instruction = body?.instruction || quize.instruction),
      (quize.tag = body?.tag || quize.tag),
      (quize.isPublished = body?.isPublished || quize.isPublished),
      (quize.isCompleted = body?.isCompleted || quize.isCompleted),
      (quize.isDeleted = body?.isDeleted || quize.isDeleted),
      (quize.totalMark = body?.totalMark || quize.totalMark),
      (quize.openDate = body?.openDate || quize.openDate),
      (quize.closeDate = body?.closeDate || quize.closeDate)

    await quize.save()

    res.status(200).send('Quiz Updated!')
  } catch (err) {
    next(err)
  }
}
