const fs = require('fs')
const path = require('path')

module.exports = class Product {
    constructor(title) {
        this.title = title
    }

    save () {
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