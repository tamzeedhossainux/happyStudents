import { sequelize } from '../connection.js'
import Sequelize from 'sequelize'
import { quizcategoryCollection } from './QuizCategory';

export const quizCollection = sequelize.define('quiz',{
      createdBy:{
          type:Sequelize.INTEGER
          ,allowNull:false
          ,unique:false               
      },
      title:{
            type:Sequelize.STRING
            ,allowNull:false
            ,unique:true               
        },
        instruction:{
            type:Sequelize.STRING
            ,allowNull:false
            ,unique:false               
        },
        tag:{
            type:Sequelize.STRING
            ,allowNull:false
            ,unique:false               
        },
        isPublished:{
            type:Sequelize.BOOLEAN
            ,allowNull: false
            ,defaultValue:true              
        },
        isCompleted:{
            type:Sequelize.BOOLEAN
            ,allowNull: false
            ,defaultValue:true              
        },
        isDeleted:{
            type:Sequelize.BOOLEAN
            ,allowNull: false
            ,defaultValue:true              
        },
        totalMark:{
            type:Sequelize.INTEGER
            ,allowNull:false
            ,unique:false               
        },
        openDate:{
            type:Sequelize.DATE
            ,allowNull:false
            ,unique:false               
        },
        closeDate:{
            type:Sequelize.DATE
            ,allowNull:false
            ,unique:false               
        },
  });
  quizCollection.belongsTo(quizcategoryCollection);