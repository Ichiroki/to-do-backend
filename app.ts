const Express = require('express')
require('dotenv').config()

const app = Express()

const api = require('./routes/api')
// Middleware setup
app.use(Express.json())

// Routes
app.use('/api', api)

// Start Server

const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

module.exports = app