import mongoose from 'mongoose'
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateOTP from '../utils/optGenerator.js'
import User from '../model/user.model.js'
import {sendMail} from '../utils/sendMail.js'


export const generateAccessTokenAndRefreshToken = async(id) => {

    try{

        const user = await User.findById(id)

        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

       
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false });
        
        return {accessToken ,refreshToken}

    }catch(error){
        console.error("error while generating tokens ", error)
    }

}
 

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
    //console.log(typeof otp)

    const createdUser = await User.create({
        email,
        password,
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    })

    const user = await User.findById(createdUser._id).select('_id , email')

    console.log(user) 
  
    let message = `Your OTP is ${otp} , valid for 10 minutes`
    await sendMail(user.email, 'Mail Verification - Linkly', message)
    
 return res.
   status(201).
   json(new apiResponse(201, user, "otp send successfully")) 
})


export const verifyEmail = asyncHandler(async(req, res) => {
    const {otp} = req.body
    const{id} = req.params

    const user = await User.findById(id).select()
    if(!user){
        throw new apiError(404, "user not found")
    }
    if(user.expiresAt < Date.now()){
        throw new apiError(400, "OTP is expiry")
    }
    if(user.otp !== otp){
        throw new apiError(400, "OTP is invalid")
    }
   
    user.isEmailVerified = true
    await user.save({validateBeforeSave: false})

   const {accessToken, refreshToken}  =  await generateAccessTokenAndRefreshToken(id)

   const loggedInUser = await User.findById(user._id).select("-password -refreshToken -otp  -expiresAt")

   const options ={
    httpOnly: true,
    secure: true,
     sameSite: 'strict'  //Prevents CSRF attacks
   }

   res.setHeader('Authorization', `Bearer ${accessToken}`)
   res.setHeader('Access-Control-Expose-Headers', 'Authorization') //related to CORS (Cross-Origin Resource Sharing), allowa client JS to read header
    // Browsers do NOT allow JavaScript to read custom headers from response
     
   return res.status(200)
               .cookie("accessToken", accessToken, options)
               .cookie("refreshToken", refreshToken, options,)
               
               .json(new apiResponse(200 ,{user: loggedInUser}, "Mail verified successfully"))
    
})