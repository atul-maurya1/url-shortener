import mongoose from 'mongoose'
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateOTP from '../utils/optGenerator.js'
import User from '../model/user.model.js'
import {sendMail} from '../utils/sendMail.js'



// register user

export const userRegister = asyncHandler(async(req, res) => {
    const {email, password, confirmPassword} = req.body
   
    if(password !== confirmPassword){
        throw new apiError(400, "password and confirmPassword is not matched")
    }

    const userExists = await User.findOne({email})
    if(userExists){
        throw new apiError(400, "User with this mail is already registered")
    }

    const otp =  generateOTP(6)

    const createdUser = await User.create({
        email,
        password,
        otp,
    })

    const user = await User.findById(createdUser._id).select('_id , email')

    console.log(user)
  
    let message = `Your OTP is ${otp} , valid for 10 minutes`
    await sendMail(user.email, 'Mail Verification - Linkly', message)
    
 return res.
   status(201).
   json(new apiResponse(201, user, "otp send successfully")) 
})