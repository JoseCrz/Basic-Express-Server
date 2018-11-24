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
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = []
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id)
                if (cartProductData) {
                    cartProducts.push({productData: product, quantity: cartProductData.quantity})
                }
            }
            response.render('shop/cart.ejs', {
                path: '/cart',
                pageTitle: 'Your cart',
                products: cartProducts
            })
        })
    })
}

exports.postCart = (request, response, next) => {
    const productId = request.body.productId
    Product.findById(productId, product => {
        Cart.addProduct(productId, product.price)
        response.redirect('/cart')
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