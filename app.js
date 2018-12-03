const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorsController = require('./controllers/errorsController')
const sequelize = require('./util/databaseConnection')

const Product = require('./models/productModel')
const User = require('./models/userModel')
const Cart = require('./models/cartModel')
const CartItem = require('./models/cart-itemModel')
const Order = require('./models/orderModel')
const OrderItem = require('./models/order-itemModel')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

//middleware tha will allow us to add the dummy user to every request by default
app.use((request, response, next) => {
    User.findByPk(1)
        .then(user => {
            request.user = user
            next()
        })
        .catch(error => {
            console.log(error)
        })
})

app.use('/admin',adminRoutes)
app.use(shopRoutes)

app.use(errorsController.get404)

//Defining relations between tables (models)
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product)

User.hasOne(Cart)
Cart.belongsTo(User)
//n:m relation
Cart.belongsToMany(Product, { through: CartItem})
Product.belongsToMany(Cart, {through: CartItem})

Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, {through: OrderItem})


//code that syncs to the database and creates tables in case they don't exist yet
// sequelize.sync({force: true})
sequelize.sync()
    //The following code helps us to create a dummy user in case it doesn't already exists
    .then(result => {
        return User.findByPk(1)
        
    })
    .then(user => {
        if (!user) {
            return User.create({name: 'Tester', email: 'test@test.com'})
        }

        return user
    })
    .then(user => {
        //console.log(user)
        return user.createCart()
    })
    .then(cart => {
        app.listen(3000)

    })
    .catch(error => {
        console.log(error)
    })


