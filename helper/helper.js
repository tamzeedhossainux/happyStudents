import fs from 'fs'
import { quizAnswerCollection } from '../db/models/QuizAnswer.js'
import { quizPerticipentHistoryCollection } from '../db/models/QuizPerticipentHistory.js'
import { quizQuestionCollection } from '../db/models/QuizQuestion.js'
import { createError } from '../utils/error.js'

const difference = (array1, array2) => {
  const result = []

  for (let i = 0; i < array1.length; i++) {
    if (!array2.includes(array1[i])) {
      result.push(array1[i])
    }
  }
  return result
}

export const checkRequiredFields = (requiredFields = [], data = {}, next) => {
  const missingFields = difference(requiredFields, Object.keys(data))
  console.log(missingFields)
  if (missingFields.length > 0) {
    return next(createError(400, `Missing ${missingFields}`))
  }
}

export const perticipentHistoryCreation = async (user, body, params) => {
  const newHistory = {
    userId: user.id,
    quizId: params.quizId,
    startDate: body?.startDate || new Date(),
    endDate: body?.endDate || new Date(),
    isCompleted: body?.isCompleted || true,
    score: 0
  }

  return await quizPerticipentHistoryCollection.create(newHistory)
}

export const createQuizAnswer = async (answers, createPerticipentHistory) => {
  const newAnswer = {
    quizPerticipentHistoryId: createPerticipentHistory.id
  }

  let score = 0

  for (const answer of answers) {
    newAnswer.isOption1Checked = answer.isOption1Checked
    newAnswer.isOption2Checked = answer.isOption2Checked
    newAnswer.isOption3Checked = answer.isOption3Checked
    newAnswer.isOption4Checked = answer.isOption4Checked
    newAnswer.quizQuestionId = answer.quizQuestionId

    await quizAnswerCollection.create(newAnswer)

    const quizQuestion = await getQuizQuestion(answer.quizQuestionId)

    if (quizQuestion.isOption1Correct && answer.isOption1Checked)
      score = score + 1
    if (quizQuestion.isOption2Correct && answer.isOption2Checked)
      score = score + 1
    if (quizQuestion.isOption3Correct && answer.isOption3Checked)
      score = score + 1
    if (quizQuestion.isOption4Correct && answer.isOption4Checked)
      score = score + 1
  }
  return score
}

const getQuizQuestion = async (quizQuestionId) =>
  await quizQuestionCollection.findOne({
    where: {
      id: quizQuestionId
    }
  })

export const updateAperticipentHistory = async (createAnswer, params) => {
  const perticipantHistory = await quizPerticipentHistoryCollection.findOne({
    where: {
      quizId: params.quizId
    }
  })

  await perticipantHistory.update({ score: createAnswer })
}

export const handleImageUpload = async (buffer, destination) => {
  fs.writeFile(destination, buffer, function (err) {
    if (err) {
      console.log(err)
    }
    return true
  })
}
