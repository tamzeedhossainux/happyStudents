import Express from 'express'
import { user_register, user_login, getUsers } from '../controller/auth.js'
import { verifyAdmin } from '../utils/authorizer.js'

const router = Express.Router()

router.post('/user/register', user_register)
router.post('/user/login', user_login)
router.get('/users', verifyAdmin, getUsers)

export default router
