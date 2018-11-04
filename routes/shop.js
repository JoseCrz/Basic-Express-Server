const express = require('express')

const adminData = require('../routes/admin')

const router = express.Router()

router.get('/', (request, response, next) => {
    console.log(`The admin data recieved in shop.js is: `, adminData.products)
    const products = adminData.products
    response.render('shop', { catalog: products, pageTitle: 'Welcome to the shop', path: '/' })
})

module.exports = router

