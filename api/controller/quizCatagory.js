import { quizCategoryCollection } from '../db/models/QuizCategory.js'
import { createError } from '../utils/error.js'
import { checkRequiredFields, handleImageUpload } from '../helper/helper.js'

export const createQuizCategory = async (req, res, next) => {
  try {
    const { user, body } = req
    //console.log('req', req.files[0])

    checkRequiredFields(['id'], user, next)
    checkRequiredFields(['title'], body, next)

    const newCategory = {
      createdBy: user.id,
      title: body?.title,
      bannerImage: '',
      logo: '',
      isArchive: body?.isArchive || false
    }

    const category = await quizCategoryCollection.create(newCategory)
    category.bannerImage = `${category.id}.png`
    category.logo = `${category.id}.png`
    await category.save()

    await handleImageUpload(
      req.files[0].buffer,
      `./uploads/banner/${category.id}.png`
    )
    await handleImageUpload(
      req.files[1].buffer,
      `./uploads/logo/${category.id}.png`
    )
    res.status(200).send('Category Created!')
  } catch (err) {
    next(err)
  }
}

export const updateQuizCategoryStatus = async (req, res, next) => {
  try {
    const category = await quizCategoryCollection.findByPk(req.params.id)
    if (!category) {
      return next(createError(400, 'Category not found!'))
    }

    category.isArchive = req.body.isArchive
    await category.save()

    res.status(200).send('Category updated!')
  } catch (err) {
    next(err)
  }
}

export const getQuizCatagories = async (req, res, next) => {
  
  try {
    const filter = {
      where: {
        isArchive: false
      },
      order: [['createdAt', 'ASC']]
    }

    const quizeCatagories = await quizCategoryCollection.findAll(filter)
    const quizeCatagoriesWithBaseUrl = quizeCatagories.map((category) => ({
      ...category.dataValues,
      bannerUrl: `http://localhost:5000/uploads/banner/${category.bannerImage}`,
      logoUrl: `http://localhost:5000/uploads/logo/${category.logo}`
    }))
    res.status(200).send(quizeCatagoriesWithBaseUrl)
  } catch (err) {
    next(err)
  }
}
