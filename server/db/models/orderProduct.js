const Sequelize = require('sequelize')
const db = require('../db')

const orderProduct = db.define('order_product', {
  productPrice: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 1
  }
})

module.exports = orderProduct
