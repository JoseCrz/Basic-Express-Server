const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let db

//this function gets the connection to the database and stores such connection
const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://jose:tEvPPW4aMahfSkQY@cluster0-yz0jr.mongodb.net/shop?retryWrites=true')
        .then(client => {
            console.log('*************CONNECTED*************')
            db = client.db()
            callback()
        })
        .catch(error => {
            console.log(error)
            throw error
        })
}

const getDb = () => {
    if (db) {
        return db
    }

    throw 'Error: No database found!'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb