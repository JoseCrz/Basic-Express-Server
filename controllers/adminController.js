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
    const product = new Product (title, price, description, imageUrl)
    product.save()
        .then(result => {
            //console.log(result)
            console.log('Product inserted in the database')
            response.redirect('/')
        }).catch(error => {
            console.log(error)
        })
}

exports.getProducts = (request, response, next) => {
    Product.findAll()
        .then(products => {
            response.render('admin/products.ejs', { catalog: products, pageTitle: 'Admin Products', path: '/admin/products' })
        })
        .catch(erorr => {
            console.log(error)
        })
}

// exports.getEditProduct = (request, response, next) => {
//     const editMode = request.query.edit
//     if(!editMode) {
//        return response.redirect('/')
//     }
//     const productId = request.params.productId
//     Product.findByPk(productId)
//         .then(product => {
//             if (!product) {
//                 return response.redirect('/')
//             }
//             response.render('admin/product', { 
//                 path: null, 
//                 pageTitle: 'Edit a Product', 
//                 editing: editMode,
//                 product: product
//             })

//         })
//         .catch(error => {
//             console.log(error)
//         })
// }

// exports.postEditProduct = (request, response, next) => {
//     const productId = request.body.productId
//     const updatedTitle = request.body.title
//     const updatedImageUrl = request.body.imageUrl
//     const updatedPrice = request.body.price
//     const updatedDescription = request.body.description

//     Product.findByPk(productId)
//         .then(product => {
//             product.title = updatedTitle
//             product.imageUrl = updatedImageUrl
//             product.price = updatedPrice
//             product.description = updatedDescription

//             return product.save()
//         })
//         .then(result => {
//             console.log('Product updated')
//             response.redirect('/admin/products')
//         })
//         .catch(error => {
//             console.log(error)
//         })

// }

// exports.postDeleteProduct = (request, response, next) => {
//     const productId = request.body.productId
//     Product.findByPk(productId)
//         .then(product => {
//             return product.destroy()
//         })
//         .then(result => {
//             response.redirect('/admin/products')
//         })
//         .catch(error => {
//             console.log(error)
//         })
// }