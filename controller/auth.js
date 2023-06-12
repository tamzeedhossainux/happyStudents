import bcrypt from "bcrypt"
import{createError} from "../utils/error.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { userCollection } from "../db/models/User.js"
import { checkRequiredFields } from "../helper/helper.js"
dotenv.config()

export const user_register = async (req, res, next) =>{
      try{
            const { body } = req
            checkRequiredFields(['name', 'email', 'password'], body, next)
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(req.body.password, salt);
            const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
            isAdmin: req.body.isAdmin? req.body.isAdmin : false
            }

            await userCollection.create(newUser)
            res.status(200).send('User created!')
      }catch(err){
            next(err)
      }
}

export const user_login = async (req, res, next) =>{
      try{
            const { body } = req

            checkRequiredFields(['email', 'password'], body, next)

            const user = await userCollection.findOne({where:{email:req.body.email}})
            if(!user) return next(createError(404, 'user not found!'))

            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
            if(!isPasswordCorrect) 
                  return next(createError(400, 'Wrong password!'))
            const token = jwt.sign({
                  id: user.id, 
                  isAdmin:user.isAdmin
            },
            process.env.JWT
            )

            const {password, isAdmin, ...otherDetails} = user.dataValues

            res
            .cookie('access_token', token,{
                  httpOnly:true
            })
            .status(200).json({...otherDetails})
      }catch(err){
            next(err)
      }
}

export const getUsers = async (req, res, next) =>{
      try{
            const { user, body } = req
            const quizes = await quizCollection.findAll({
                  where:{
                        isAdmin: false
                  }
            })
            res.status(200).send(quizes)

      } catch(err){
            next(err)
      }
}
