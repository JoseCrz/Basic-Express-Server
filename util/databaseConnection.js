const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://jose:tEvPPW4aMahfSkQY@cluster0-yz0jr.mongodb.net/test?retryWrites=true')
        .then(client => {
            console.log('*************CONNECTED*************')
            callback(client)
        })
        .catch(error => {
            console.log(error)
        })
}

module.exports = mongoConnect