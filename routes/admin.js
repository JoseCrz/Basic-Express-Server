const express = require('express')

const router = express.Router()

router.get('/add-product', (request, response, next) => {
    console.log(`add product middleware`)
    response.send(`<form action="/admin/add-product" method="POST"> <input type="text" name="title" /> <button type="subtmit">Add product!</button> </form>`)
})

router.post('/add-product', (request, response, next) => {
    console.log(request.body)
    response.redirect('/')
})

module.exports = router

