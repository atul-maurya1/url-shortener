import express from 'express'

const urlRouter = express.Router()

import {takeUrl} from '../controller/url.controller.js'

urlRouter.post('/take-url', takeUrl)


export default urlRouter