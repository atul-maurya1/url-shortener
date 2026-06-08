import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.json())

//Routes
import urlRouter from './routes/url.routes.js'

app.use('/api/v1/url', urlRouter)

export default app 