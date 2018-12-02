const Product = require('../models/productModel')
const Cart = require('../models/cartModel')

exports.getIndex = (request, response, next) => {
    Product.findAll()
        .then(products => {
            response.render('shop/index.ejs', { catalog: products, pageTitle: 'Welcome to the shop', path: '/' })
        })
        .catch(error => {
            console.log(error)
        })       
}

exports.getProducts = (request, response, next) => {
    Product.findAll()
        .then(products => {
            response.render('shop/product-list.ejs', { catalog: products, pageTitle: 'All products', path: '/products' })
        })
        .catch(error => {
            console.log(error)
        })
}

exports.getSpecificProduct = (request, response, next) => {
    const productId = request.params.productId
    Product.findByPk(productId)
        .then(product => {
            response.render('shop/product-detail.ejs', {product:product, pageTitle: product.title, path: '/products' })
        })
        .catch(error => {
            console.log(error)
        })
}

exports.getCart = (request, response, next) => {
    request.user.getCart()
        .then(cart => {
            return cart.getProducts()
        })
        .then(products => {
            response.render('shop/cart.ejs', {
                path: '/cart',
                pageTitle: 'Your cart',
                products: products
            })
            
        })
        .catch(error => {
            console.log(error)
        })
    
}

exports.postCart = (request, response, next) => {
    const productId = request.body.productId
    let fetchedCart
    //first we have to get the cart
    request.user.getCart()
        .then(cart => {
            fetchedCart = cart
            //then we need to see if the product we want to add is already in the cart
            //we're going to fetch the products in the cart where the id of thev product is equal to the id of the product we want to add
            return cart.getProducts({where: {id: productId}})
        })
        .then(products => {
            //once we fetch the products we're going to get an array of products
            let product
            if(products.lenght > 0) {
                product = products[0]
            }
            let newQuantity = 1
            if(product) {
                //...
            }

            return Product.findByPk(productId)
                .then(product => {
                    return fetchedCart.addProduct(product, {through: {quantity: newQuantity}})
                })
                .catch(error => {
                    console.log(error)
                })
        })
        .then(() => {
            response.redirect('/cart')
        })
        .catch(error => {
            console.log(error)
        })
}

exports.postCartDeleteProduct = (request, response, next) => {
    const productId = request.body.productId
    Product.findById(productId, product => {
        Cart.deleteProduct(productId, product.price)
        response.redirect('cart')
    })
}

exports.getOrders = (request, response, next) => {
    response.render('shop/orders.ejs', {pageTitle: 'Orders', path: '/orders'} )
}

exports.getCheckout = (request, response, next) => {
    response.render('shop/checkout.ejs', {pageTitle: 'Checkout', path: '/checkout'})
}