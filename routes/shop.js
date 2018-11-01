const express = require('express')

const router = express.Router()

router.get('/', (request, response, next) => {
    console.log(`Main page URL`)
    response.send(`<h1>Main Page</h1>`)
})

module.exports = router

