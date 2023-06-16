import { sequelize } from '../connection.js'
import Sequelize from 'sequelize'
import { quizCollection } from './Quiz.js'

export const quizQuestionCollection = sequelize.define('quiz_question', {
  quizId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: quizCollection,
      key: 'id'
    }
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  option1: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  option2: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  option3: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  option4: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  isOption1Correct: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isOption2Correct: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isOption3Correct: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isOption4Correct: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  tag: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  complexityLevel: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: false
  }
})

quizQuestionCollection.belongsTo(quizCollection, { foreignKey: 'quizId' })
quizCollection.hasMany(quizQuestionCollection, { foreignKey: 'quizId' })
