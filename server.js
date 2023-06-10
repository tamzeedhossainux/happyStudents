console.log(" ############################ HAPPY STUDENT SERVER BOOT ############################ ");

import Express from "express";
import dotenv from 'dotenv'
import cookieParse from "cookie-parser"
import { sequelize } from './db/connection.js'
import authRouter from "./routes/auth.js";
import quizCategoryRouter from "./routes/quizCategory.js"
import quizrouter from "./routes/quiz.js";
import quizQuestionrouter from "./routes/quizQuestion.js";
import quizAnsrouter from "./routes/quizAnswer.js";

dotenv.config()

const app = Express();
app.use(Express.json())
app.use(cookieParse())


const port = process.env.PORT || 8000

//mapping routings
app.use('/api/auth', authRouter)
app.use('/api/quizcategory', quizCategoryRouter)
app.use('/api/quiz', quizrouter)
app.use('/api/quiz/question', quizQuestionrouter)
app.use('/api/quiz/answer', quizAnsrouter)


app.use((err, req, res, next) => {
      const errStatus = err.status || 500
      const errMessage = err.message || 'Something went wrong!'
      return res.status(errStatus).json({
            Success: false,
            Status: errStatus,
            Message: errMessage,
            Stack: err.stack
      });
});

sequelize.sync().then(() => {
      console.log('Tables created');
    }).catch((error) => {
      console.error('Error creating tables:', error);
});
    

app.listen(port, () => {
      console.log(`Happy students are listening on port ${port}`);
});



