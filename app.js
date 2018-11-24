const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorsController = require('./controllers/errorsController')
const sequelize = require('./util/databaseConnection')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin',adminRoutes)
app.use(shopRoutes)

app.use(errorsController.get404)

//code that syncs to the database and creates tables in case they don't exist yet
sequelize.sync()
    .then(result => {
        app.listen(3000)
    })
    .catch(error => {
        console.log(error)
    })


