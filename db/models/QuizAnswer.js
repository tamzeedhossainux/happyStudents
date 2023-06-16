import { sequelize } from '../connection.js'
import Sequelize from 'sequelize'
import { quizPerticipentHistoryCollection } from './QuizPerticipentHistory.js'
import { quizQuestionCollection } from './QuizQuestion.js'

export const quizAnswerCollection = sequelize.define('quiz_answer', {
  quizPerticipentHistoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: quizPerticipentHistoryCollection,
      key: 'id'
    }
  },
  quizQuestionId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: quizQuestionCollection,
      key: 'id'
    }
  },
  isOption1Checked: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isOption2Checked: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isOption3Checked: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isOption4Checked: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

quizAnswerCollection.belongsTo(quizPerticipentHistoryCollection, {
  foreignKey: 'quizPerticipentHistoryId'
})
quizPerticipentHistoryCollection.hasMany(quizAnswerCollection, {
  foreignKey: 'quizPerticipentHistoryId'
})

quizAnswerCollection.belongsTo(quizQuestionCollection, {
  foreignKey: 'quizQuestionId'
})
quizQuestionCollection.hasMany(quizAnswerCollection, {
  foreignKey: 'quizQuestionId'
})
