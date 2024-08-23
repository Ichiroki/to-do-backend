require('dotenv').config()
const Express = require('express')
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser'

const app = Express()

const api = require('./src/routes/api.ts')

// Middleware setup
app.use(Express.json())
app.use(cookieParser())
app.use(bodyParser.json())

// Routes
app.use('/api', api)

// Start Server

const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})