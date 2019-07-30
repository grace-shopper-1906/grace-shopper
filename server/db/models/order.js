const Sequelize = require('sequelize')
const db = require('./db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(
      'inCart',
      'created',
      'processed',
      'cancelled',
      'completed'
    )
  },
  totalPrice: {
    type: Sequelize.INTEGER
  },
  dateOrdered: {
    type: Sequelize.DATE
  }
})

module.exports = Order
