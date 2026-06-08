import apiError from '../utils/apiError.js'

const urlValidation = (originalUrl) => {
  try {
    const parsedUrl = new URL(originalUrl);

    if (
      parsedUrl.protocol !== "http:" &&
      parsedUrl.protocol !== "https:"
    ) {
      throw new apiError(
        400,
        "Only HTTP and HTTPS URLs are allowed"
      );
    }

    // console.log(parsedUrl.hostname) 
    // console.log(parsedUrl.protocol)

    return parsedUrl

  } catch(error)  {
    throw new apiError(400, "Invalid URL" , error);
  }
};


export default urlValidation