import  Express  from "express";
import { createQuizCategory, updateQuizCategoryStatus } from "../controller/quizCatagory.js";
import { verifyAdmin } from "../utils/authorizer.js";

const router = Express.Router();

router.post('/create', verifyAdmin, createQuizCategory)
router.post('/update/:id', verifyAdmin, updateQuizCategoryStatus)

export default router