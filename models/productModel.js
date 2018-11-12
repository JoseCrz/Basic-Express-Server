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
    constructor(title, imageUrl, price, description) {
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.description = description
    }

    save () {
        this.id = (Math.floor((Math.random()) * 1000000)).toString()
        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(filePath, JSON.stringify(products), error => {
                console.log(error)
            })
        })
        // this was an error -> products.push(this)
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