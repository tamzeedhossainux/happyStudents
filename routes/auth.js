import  Express  from "express";
import { user_register, user_login } from "../controller/auth.js";

const router = Express.Router();

router.post('/user/register', user_register)
router.post('/user/login', user_login)

export default router