const products = []

exports.getAddProduct = (request, response, next) => {
    console.log(`add product middleware`)
    response.render('add-product', { path: '/admin/add-product', pageTitle: 'Add a Product'})
}

exports.postAddProduct = (request, response, next) => {
    products.push({ title: request.body.title})
    response.redirect('/')
}

exports.getProducts = (request, response, next) => {
    console.log(`The admin data recieved in shop.js is: `, products)
    response.render('shop', { catalog: products, pageTitle: 'Welcome to the shop', path: '/' })
}