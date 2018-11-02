const path = require('path')

const express = require('express')

const pathHelper = require('../utilities/pathHelper')

const adminData = require('../routes/admin')

const router = express.Router()

router.get('/', (request, response, next) => {
    console.log(`The admin data recieved in shop.js is: `, adminData.products)
    response.sendFile(path.join(pathHelper, 'views', 'shop.html'))
})

module.exports = router

