import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import urlValidation from "../utils/url-Validation.js";
import Url from "../model/url.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { nanoid } from "nanoid";

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

	const originalUrl = await Url.aggregate([
		{
			$match: {
				urlCode: code
			}
		},		
	])

	if(originalUrl.length === 0){
		throw new apiError(404, "url no found")
	}
 
   return res.redirect(302, originalUrl[0].url)  
	//return res.status(302).json(new apiResponse(302, "Redirect successfully"))
 
})