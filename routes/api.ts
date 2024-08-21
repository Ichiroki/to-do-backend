const Express = require('express')

const Api = Express()

Api.get('/api', (req: Request, res: Response) => {
    console.log('test')
})

module.exports = Api