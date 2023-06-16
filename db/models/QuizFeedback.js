import { sequelize } from '../connection.js'
import Sequelize from 'sequelize'
import { userCollection } from './User.js'
import { quizCollection } from './Quiz.js'

export const quizFeedBackCollection = sequelize.define('quiz_feedback', {
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: false
  },
  feedback: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  complexityLevel: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: userCollection,
      key: 'id'
    }
  },
  quizId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: quizCollection,
      key: 'id'
    }
  }
})

// Establish the association
quizFeedBackCollection.belongsTo(userCollection, { foreignKey: 'userId' })
userCollection.hasMany(quizFeedBackCollection, { foreignKey: 'userId' })

quizFeedBackCollection.belongsTo(quizCollection, { foreignKey: 'quizId' })
quizCollection.hasMany(quizFeedBackCollection, { foreignKey: 'quizId' })
