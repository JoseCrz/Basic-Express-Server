const fs = require('fs')
const path = require('path')

module.exports = class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.description = description
    }

    save () {
        this.id = (Math.floor((Math.random()) * 1000000)).toString()
        const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')
        fs.readFile(filePath, (error, fileContent) => {
            let products = []
            if (!error) {
                products = JSON.parse(fileContent)
            }
            products.push(this)

            fs.writeFile(filePath, JSON.stringify(products), (error) => {
                console.log(error)
            })
            
        })
        // this was an error -> products.push(this)
    }

    static fetchAll (callback) {
        const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')
        fs.readFile(filePath, (error, fileContent) => {
            if (error) {
                callback([])
            }
            callback(JSON.parse(fileContent))
        })
    }
}