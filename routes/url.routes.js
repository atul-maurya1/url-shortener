import express from 'express'

const urlRouter = express.Router()

import {inputUrl, redirectUrl} from '../controller/url.controller.js'

urlRouter.post('/take-url', inputUrl)
urlRouter.get('/:code', redirectUrl)


export default urlRouter