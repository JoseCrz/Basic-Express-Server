const Product = require('../models/productModel')

exports.getIndex = (request, response, next) => {
    Product.fetchAll((products) => {
        //console.log(`The admin data recieved in the index is:  `, products)
        response.render('shop/index.ejs', { catalog: products, pageTitle: 'Welcome to the shop', path: '/' })
    
    })

}

exports.getProducts = (request, response, next) => {
    Product.fetchAll((products) => {
        //console.log(`The admin data recieved in shop.js is: `, products)
        response.render('shop/product-list.ejs', { catalog: products, pageTitle: 'All products', path: '/products' })

    })
}

exports.getSpecificProduct = (request, response, next) => {
    const productId = request.params.productId
    Product.findById(productId, product => {
        console.log("Product: ", product)
    })
    response.redirect('/')
}

exports.getCart = (request, response, next) => {
    response.render('shop/cart.ejs', {pageTitle: 'Cart', path: '/cart'})
}

exports.getOrders = (request, response, next) => {
    response.render('shop/orders.ejs', {pageTitle: 'Orders', path: '/orders'} )
}

exports.getCheckout = (request, response, next) => {
    response.render('shop/checkout.ejs', {pageTitle: 'Checkout', path: '/checkout'})
}