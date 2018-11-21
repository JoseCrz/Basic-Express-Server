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
    
    static deleteProduct(id, productPrice) {
         //to delete a product from the cart first we have to get the cart (read the file)
         fs.readFile(filePath, (error, fileContent) => {
             if (error) {
                 console.log(error)
                 return
             }
             
             const updatedCart = {...JSON.parse(fileContent)}
             const product = updatedCart.products.find(product => product.id === id)
             const productQuantity = product.quantity
             //To remove the specific product from our file, we're going to simply filter the array to get the elements
             //that do not match the one we one to delete, so we get an array with all the products but the one to delete
             updatedCart.products = updatedCart.products.filter(product => product.id !== id)
             updatedCart.totalPrice -= (productPrice * productQuantity)

             //Now that we have our cart without the product we wanted to deleted, we just have to save it into our file
             fs.writeFile(filePath, JSON.stringify(updatedCart), err => {
                 console.log(error)
             })
         })
    }
}