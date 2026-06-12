import optGenerator from "otp-generator";
import asyncHandler from "./asyncHandler.js";

const generateOTP = (num) => {
	try {
		return optGenerator.generate(6, {
			digits: true,
			lowerCaseAlphabets: false,
			upperCaseAlphabets: false,
			specialChars: false,
		});
	} catch (e) {
		throw new Error(e);
	}
};

export default generateOTP;
