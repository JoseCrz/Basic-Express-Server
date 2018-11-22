const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorsController = require('./controllers/errorsController')
const database = require('./util/databaseConnection')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

//test to see if we connect successfully to the database
database.execute('SELECT * FROM products')
    .then(result => {
        console.log(result[0], result[1])
    })
    .catch(error => {
        console.log(error)
    })

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin',adminRoutes)
app.use(shopRoutes)

app.use(errorsController.get404)

app.listen(3000)
