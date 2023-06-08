import { quizCategoryCollection } from "../db/models/QuizCategory.js";
import { createError } from "../utils/error.js";

export const createQuizCategory = async (req, res, next) =>{
      try{
            const { user, body } = req

            const newCategory = {
                  createdBy : user.id,
                  title: body?.title,
                  bannerImage: body?.bannerImage,
                  logo: body?.logo,
                  isArchive: body?.isArchive
            }

            await quizCategoryCollection.create(newCategory)
            res.status(200).send('Category Created!')
      }
      catch(err){
            next(err)
      }
}

export const updateQuizCategoryStatus = async (req, res, next) =>{
      try{
            const category = await quizCategoryCollection.findByPk(req.params.id);
            if (!category) {
                  return next(createError(400, 'Category not found!'))
            }
    
            category.isArchive = req.body.isArchive; 
            await category.save(); 

            res.status(200).send('Category updated!')
      }
      catch(err){
            next(err)
      }
}