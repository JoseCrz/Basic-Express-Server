const fs = require('fs')
const path = require('path')

const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json')

module.exports = class Cart {
    static addProduct (id, productPrice) {
        //Fetch previous cart.
        //if there's no cart (file) it gets created
        //otherwise, it's retrieved from the file
        fs.readFile(filePath, (error, fileContent) => {
            let cart = {products: [], totalPrice: 0}
            if (!error) {
                cart = JSON.parse(fileContent)
            }
            //At this point we know we have a cart, either we created it or retrieved it from the file
            //Analyze the cart to find existing products:
            const existingProductIndex = cart.products.findIndex(product => product.id === id)
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct

            //Add a new product or increase the quantity if the product is already in the cart
            if (existingProduct) {
                updatedProduct = {...existingProduct}
                updatedProduct.quantity++
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            } else {
                updatedProduct = { id:id, quantity: 1}
                cart.products = [...cart.products, updatedProduct]
            }

            cart.totalPrice += parseFloat(productPrice)
            fs.writeFile(filePath, JSON.stringify(cart), error => {
                console.log(error)
            })
        })
    }
}