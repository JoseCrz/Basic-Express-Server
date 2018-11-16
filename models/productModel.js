const fs = require('fs')
const path = require('path')

const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')

const getProductsFromFile = callback => {
    fs.readFile(filePath, (error, fileContent) => {
        if (error) {
            callback([])
        } else {
            callback(JSON.parse(fileContent))
        }
    })

}

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.description = description
    }

    //the save method has 2 modes
    //save a whole new product and updating an existing product
    save () {
        getProductsFromFile(products => {
            //if we already have an ID it means the product already exist, so we enter update mode
            if (this.id) {
                const existingProductIndex = products.findIndex(product => product.id === this.id)
                const updatedProducts = [...products]
                updatedProducts[existingProductIndex] = this
                fs.writeFile(filePath, JSON.stringify(updatedProducts), error => {
                    console.log(error)
                })
                //if there's no ID, it means we're going to save a whole new product
            } else {
                this.id = (Math.floor((Math.random()) * 1000000)).toString()
                products.push(this)
                fs.writeFile(filePath, JSON.stringify(products), error => {
                    console.log(error)
                })
            }
        })
    }

    static fetchAll (callback) {
        getProductsFromFile(callback)
    }

    static findById (id, callback) {
        getProductsFromFile( products => {
            const product = products.find( p => p.id === id)
            callback(product)
        })
    }
}