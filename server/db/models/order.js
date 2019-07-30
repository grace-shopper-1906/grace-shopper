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

Order.prototype.placeOrder = function() {
  if (this.status !== 'inCart') throw new Error('not a valid cart!')
  const date = new Date()
  this.status = 'created'
  this.dateOrdered = date
}

module.exports = Order
