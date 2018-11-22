const database = require('../util/databaseConnection')
const Cart = require('./cartModel')


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
        
    }

    static deleteById (id) {
        
    }

    static fetchAll () {
        //this method is going to give us a promise which we're going to return
        return database.execute('SELECT * FROM products')
    }

    static findById (id) {
        
    }
}