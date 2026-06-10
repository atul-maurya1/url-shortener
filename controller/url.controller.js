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

export const inputUrl = asyncHandler(async (req, res) => {
	const { url } = req.body;
	if (!url) {
		throw new apiError(400, "enter your url");
	}
	const validUrl =  urlValidation(url);

	const urlCode = nanoid(6);

	let shortUrl = `${process.env.BASE_URL}${urlCode}`;

	const saveUrl = await Url.create({
		url,
		urlCode,
		shortUrl,
	});

	if (!saveUrl) {
		throw new apiError(400, "something went wrong");
	}
	console.log(saveUrl);
	return res
		.status(201)
		.json(new apiResponse(201, saveUrl, "Short URL created successfully"));
});


export const redirectUrl = asyncHandler(async (req ,res )=> {

	const {code} = req.params
	//console.log("code ", code)
    if(!code){
		throw new apiError(400, "wrong url")
	}

	const urlData = await Url.aggregate([
		{
			$match: {
				urlCode: code
			}
		},	
		{
			$project: {
				_id: 1,
				url: 1
			}
		}	
	])

	if(urlData.length === 0){
		throw new apiError(404, "url no found")
	}
    res.redirect(302, urlData[0].url)  
 
	const result = UAParser(req.headers["user-agent"]);
	const ip =
	req.headers["x-forwarded-for"] ||
	req.socket.remoteAddress;

	const clickedData = await Click.create({
		url: new mongoose.Types.ObjectId(urlData[0]._id),
		browser: result.browser.name,
		device: os.type(),
		ip
	}) 
})