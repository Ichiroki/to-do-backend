require('dotenv').config()
const Express = require('express')
import bodyParser from "body-parser"

const app = Express()

const api = require('./src/routes/api.ts')
// Middleware setup
app.use(Express.json())
app.use(bodyParser.json())

// Routes
app.use('/api', api)

// Start Server

const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})