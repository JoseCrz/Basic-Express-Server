const Product = require('../models/productModel')

exports.getAddProduct = (request, response, next) => {
    console.log(`add product middleware`)
    response.render('add-product', { path: '/admin/add-product', pageTitle: 'Add a Product'})
}

exports.postAddProduct = (request, response, next) => {
    const product = new Product(request.body.title)
    product.save()
    response.redirect('/')
}

exports.getProducts = (request, response, next) => {
    const products = Product.fetchAll()
    console.log(`The admin data recieved in shop.js is: `, products)
    response.render('shop', { catalog: products, pageTitle: 'Welcome to the shop', path: '/' })
}