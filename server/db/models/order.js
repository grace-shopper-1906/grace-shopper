const Sequelize = require('sequelize')
const db = require('./db')

const Order = db.define('order', {
  userId: {
    type: Sequelize.INTEGER
  },
  sessionId: {
    type: Sequelize.INTEGER
  },
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
  }
})

module.exports = Order
