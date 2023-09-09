/* This is a code snippet written in JavaScript that defines a Sequelize model for a quiz participant
history collection. It imports the Sequelize library and the necessary collections (quizCollection
and userCollection) from other files. The model has several fields such as userId, quizId,
startDate, endDate, isComplete, and score. It also defines the relationships between the
quizPerticipentHistoryCollection and the userCollection and quizCollection using the belongsTo and
hasMany methods. */
import { sequelize } from '../connection.js'
import Sequelize from 'sequelize'
import { quizCollection } from './Quiz.js'
import { userCollection } from './User.js'

export const quizPerticipentHistoryCollection = sequelize.define(
  'quiz_perticipent_history',
  {
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
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
      unique: false
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false,
      unique: false
    },
    isComplete: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: false
    }
  }
)

quizPerticipentHistoryCollection.belongsTo(userCollection, {
  foreignKey: 'userId'
})
userCollection.hasMany(quizPerticipentHistoryCollection, {
  foreignKey: 'userId'
})

quizPerticipentHistoryCollection.belongsTo(quizCollection, {
  foreignKey: 'quizId'
})
quizCollection.hasMany(quizPerticipentHistoryCollection, {
  foreignKey: 'quizId'
})
