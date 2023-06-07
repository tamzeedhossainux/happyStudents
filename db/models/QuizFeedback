import { sequelize } from '../connection.js'
import Sequelize from 'sequelize'
import { userCollection } from './User.js';
import { quizCollection } from './Quiz.js';

export const quizFeedBackCollection = sequelize.define('quiz_feedback',{
      rating:{
          type:Sequelize.INTEGER
          ,allowNull:false
          ,unique:false               
      },
      feedback:{
            type:Sequelize.STRING
            ,allowNull:false
            ,unique:true               
        },
        complexityLevel:{
            type:Sequelize.STRING
            ,allowNull:false
            ,unique:false               
        },
  });
  quizFeedBackCollection.belongsTo(userCollection);
  quizFeedBackCollection.belongsTo(quizCollection);
