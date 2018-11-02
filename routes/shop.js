const path = require('path')

const express = require('express')

const pathHelper = require('../utilities/pathHelper')

const router = express.Router()

router.get('/', (request, response, next) => {
    console.log(`Main page URL`)
    response.sendFile(path.join(pathHelper, 'views', 'shop.html'))
})

module.exports = router

