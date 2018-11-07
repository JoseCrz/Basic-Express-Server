const Product = require('../models/productModel')

exports.getIndex = (request, response, next) => {
    Product.fetchAll((products) => {
        console.log(`The admin data recieved in the index is:  `, products)
        response.render('shop/index.ejs', { catalog: products, pageTitle: 'Welcome to the shop', path: '/' })
    
    })

}

exports.getProducts = (request, response, next) => {
    Product.fetchAll((products) => {
        console.log(`The admin data recieved in shop.js is: `, products)
        response.render('shop/product-list.ejs', { catalog: products, pageTitle: 'All products', path: '/products' })

    })
}

exports.getCart = (request, response, next) => {
    response.render('shop/cart.ejs', {pageTitle: 'Cart', path: '/cart'})
}

exports.getCheckout = (request, response, next) => {
    response.render('shop/checkout.ejs', {pageTitle: 'Checkout', path: '/checkout'})
}