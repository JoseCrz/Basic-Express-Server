const Product = require('../models/productModel')

exports.getAddProduct = (request, response, next) => {
    console.log(`add product middleware`)
    response.render('admin/add-product', { path: '/admin/add-product', pageTitle: 'Add a Product'})
}

exports.postAddProduct = (request, response, next) => {
    const product = new Product(request.body.title)
    product.save()
    response.redirect('/')
}

exports.getProducts = (request, response, next) => {
    Product.fetchAll((products) => {
        console.log(`The admin data recieved in admin/products is:  `, products)
        response.render('admin/products.ejs', { catalog: products, pageTitle: 'Admin Products', path: '/admin/products' })
    
    })
}