const path = require('path')

const express = require('express')

const pathHelper = require('../utilities/pathHelper')

const products = []

const router = express.Router()

router.get('/add-product', (request, response, next) => {
    console.log(`add product middleware`)
    response.render('add-product', { path: '/admin/add-product', pageTitle: 'Add a Product'})
})

router.post('/add-product', (request, response, next) => {
    products.push({ title: request.body.title})
    response.redirect('/')
})

exports.routes = router
exports.products = products



