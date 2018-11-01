const express = require('express')
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))

app.use(adminRoutes)
app.use(shopRoutes)

app.use( (request, response, next) => {
    response.status(404).send(`<h1>Error 404, Not Found.</h1>`)
})

app.listen(3000)
