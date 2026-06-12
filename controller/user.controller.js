import mongoose from 'mongoose'
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import urlValidation from "../utils/url-Validation.js";
import Url from "../model/url.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { nanoid } from "nanoid";
import Click from '../model/click.model.js'
import os from 'os'
import {UAParser} from "ua-parser-js";

export const dashboard = asyncHandler(async(req, res) => {
       const userId = req.user._id;
       if(!userId){
        throw new apiError(401, 'user not authenticated')
       }

       const url = await Url.aggregate([

       ])

})