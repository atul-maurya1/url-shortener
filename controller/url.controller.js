import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import urlValidation from "../utils/url-Validation.js";
import Url from "../model/url.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { nanoid } from "nanoid";

export const takeUrl = asyncHandler(async (req, res) => {
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
