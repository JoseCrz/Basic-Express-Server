const express = require('express')

const app = express()

app.use('/add-product', (request, response, next) => {
    console.log(`add product middleware`)
    response.send(`<h1>"Add Product" page`)
})

app.use('/', (request, response, next) => {
    console.log(`Main page URL`)
    response.send(`<h1>Main Page</h1>`)
})

app.listen(3000)
