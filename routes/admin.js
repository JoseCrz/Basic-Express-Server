const path = require('path')

const express = require('express')

const pathHelper = require('../utilities/pathHelper')

const router = express.Router()

router.get('/add-product', (request, response, next) => {
    console.log(`add product middleware`)
    response.sendFile(path.join(pathHelper, 'views', 'add-product.html'))
})

router.post('/add-product', (request, response, next) => {
    console.log(request.body)
    response.redirect('/')
})

module.exports = router

