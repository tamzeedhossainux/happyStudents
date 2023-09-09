import { sequelize } from '../connection.js'
import Sequelize from 'sequelize'

export const userCollection = sequelize.define('User', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

//forign key
//connection.db.ResetToken.belongsTo(connection.db.User);
