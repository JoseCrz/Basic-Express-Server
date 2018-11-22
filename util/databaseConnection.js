const mysql = require('mysql2')

//A connection pool is going to help us to manage multiple connections a queries to the database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'shop',
    password: 'AajKiRaat09'
})

module.exports = pool.promise()

