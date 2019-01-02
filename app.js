const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
// const shopRoutes = require('./routes/shop')
const errorsController = require('./controllers/errorsController')

const mongoConnect = require('./util/databaseConnection').mongoConnect

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

//middleware tha will allow us to add the dummy user to every request by default
app.use((request, response, next) => {
    next()
})

app.use('/admin',adminRoutes)
// app.use(shopRoutes)

app.use(errorsController.get404)

mongoConnect(() => {
    app.listen(3000)
})


