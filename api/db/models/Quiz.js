import { sequelize } from '../connection.js'
import Sequelize from 'sequelize'
import { quizCategoryCollection } from './QuizCategory.js'

export const quizCollection = sequelize.define('quiz', {
  createdBy: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  instruction: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  tag: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  isPublished: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  totalMark: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: false
  },
  openDate: {
    type: Sequelize.DATE,
    allowNull: false,
    unique: false
  },
  closeDate: {
    type: Sequelize.DATE,
    allowNull: false,
    unique: false
  },
  quizCategotyId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: quizCategoryCollection,
      key: 'id'
    }
  }
})

// Establish the association
quizCollection.belongsTo(quizCategoryCollection, {
  foreignKey: 'quizCategotyId'
})
quizCategoryCollection.hasMany(quizCollection, { foreignKey: 'quizCategotyId' })
