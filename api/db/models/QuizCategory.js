import { sequelize } from '../connection.js'
import Sequelize from 'sequelize'

export const quizCategoryCollection = sequelize.define('quiz_category', {
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
  bannerImage: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  logo: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  isArchive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})
