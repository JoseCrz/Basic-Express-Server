const Product = require('../models/productModel')

exports.getAddProduct = (request, response, next) => {
    //console.log(`add product middleware`)
    response.render('admin/product', { 
        path: '/admin/add-product', 
        pageTitle: 'Add a Product',
        editing: false
    })
}

exports.postAddProduct = (request, response, next) => {
    const title = request.body.title
    const imageUrl = request.body.imageUrl
    const price = request.body.price
    const description = request.body.description
    
    const product = new Product(title, imageUrl, price, description)
    product.save()
    response.redirect('/')
}

exports.getProducts = (request, response, next) => {
    Product.fetchAll((products) => {
        //console.log(`The admin data recieved in admin/products is:  `, products)
        response.render('admin/products.ejs', { catalog: products, pageTitle: 'Admin Products', path: '/admin/products' })
    
    })
}

exports.getEditProduct = (request, response, next) => {
    const editMode = request.query.edit
    if(!editMode) {
       return response.redirect('/')
    }
    const productId = request.params.productId
    Product.findById(productId, product => {
        if (!product) {
            return response.redirect('/')
        }
        response.render('admin/product', { 
            path: null, 
            pageTitle: 'Edit a Product', 
            editing: editMode,
            product: product
        })
    })
}