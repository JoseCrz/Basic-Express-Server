const http = require('http')

const express = require('express')

const app = express()

app.use( (request, response, next) => {
    console.log(`In the middleware!`)
    next()
})

app.use( (request, response, next) => {
    console.log(`In the second middleware!`)
    next()
})

app.use( (request, response, next) => {
    console.log(`In the third middleware!`)
    next()
})

app.use( (request, response, next) => {
    console.log(`In the fourth middleware`)
    next()
})

app.use( (request, response, next) => {
    console.log(`In the final middleware`)
    response.send(`<h1>Hello from Express.js!</h1>`)
}) 

app.listen(3000)


