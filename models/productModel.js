const getDb = require('../util/databaseConnection').getDb
const mongodb = require('mongodb')

class Product {
    constructor (title, price, description, imageUrl, id) {
        this.title = title
        this.price = price
        this.description = description
        this.imageUrl = imageUrl
        this._id = new mongodb.ObjectID(id)
    }

    save () {
        const db = getDb()
        let dbOperation

        if (this._id) {
            //Update product
            dbOperation = db.collection('products').updateOne({_id: this._id}, {$set: this})
        } else {
            //Insert new product
            dbOperation = db.collection('products').insertOne(this)
        }

        return dbOperation
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            console.log(error)
        })
    }

    static fetchAll () {
        const db = getDb()
        return db.collection('products').find().toArray()
            .then(products => {
                console.log(products)
                return products
            })
            .catch(error => {
                console.log(error)
            })
    }

    static findById (productId) {
        const db = getDb()
        return db.collection('products').find({_id: new mongodb.ObjectID(productId) }).next()
            .then(product => {
                console.log(product)
                return product
            })
            .catch(error => {
                console.log(error)
            })
    }
}

module.exports = Product