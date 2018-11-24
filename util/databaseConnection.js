const Sequelize = require('sequelize')

const sequelize = new Sequelize('shop', 'root', 'AajKiRaat09', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize

