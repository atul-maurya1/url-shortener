import express from 'express'

import {userRegestrationValidation} from '../validator/index.js'
import {validator} from '../middleware/validator.middleware.js'

const authRouter = express.Router()

import {userRegister} from '../controller/auth.controller.js'

authRouter.post('/register' , userRegestrationValidation(),  validator ,userRegister)



export default authRouter