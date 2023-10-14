console.log(
  ' ############################ HAPPY STUDENT SERVER BOOT ############################ '
)

import Express from 'express'
import dotenv from 'dotenv'
import cookieParse from 'cookie-parser'
import multer from 'multer'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors'
import { sequelize } from './db/connection.js'
import authRouter from './routes/auth.js'
import quizCategoryRouter from './routes/quizCategory.js'
import quizrouter from './routes/quiz.js'
import quizQuestionrouter from './routes/quizQuestion.js'
import quizAnsrouter from './routes/quizAnswer.js'
import feedBackrouter from './routes/quizFeedback.js'

dotenv.config()
const upload = multer()

const app = Express()
app.use(Express.json())
app.use(cookieParse())
app.use(upload.any())
const currentModuleFile = new URL(import.meta.url);
const currentModuleDirectory = dirname(fileURLToPath(currentModuleFile));

app.use(Express.static(currentModuleDirectory + '/Happy-Students-client'));

app.get('/', (req, res) => { 
    res.sendFile('index.html', { root: currentModuleDirectory + '/Happy-Students-client' });
});
// app.use(cors({
//   origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// }));
const corsOptions = {
  // origin: 'http://127.0.0.1:5173',
  origin: 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));


const port = process.env.PORT || 8000

//mapping routings
app.use('/api/auth', authRouter)
app.use('/api/quizcategory', quizCategoryRouter)
app.use('/api/quiz', quizrouter)
app.use('/api/quiz/question', quizQuestionrouter)
app.use('/api/quiz/answer', quizAnsrouter)
app.use('/api/quiz/feedback', feedBackrouter)
app.use('/uploads/logo', Express.static('uploads/logo'))
app.use('/uploads/banner', Express.static('uploads/banner'))

app.use((err, req, res, next) => {
  const errStatus = err.status || 500
  const errMessage = err.message || 'Something went wrong!'
  return res.status(errStatus).json({
    Success: false,
    Status: errStatus,
    Message: errMessage,
    Stack: err.stack
  })
})

sequelize
  .sync()
  .then(() => {
    console.log('Tables created')
  })
  .catch((error) => {
    console.error('Error creating tables:', error)
  })

app.listen(port, () => {
  console.log(`Happy students are listening on port ${port}`)
})
