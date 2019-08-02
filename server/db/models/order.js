const Sequelize = require('sequelize')
const db = require('../db')
const {OrderProduct} = require('./index')

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
  },
  sessionId: {
    type: Sequelize.STRING
  }
})

Order.prototype.placeOrder = function() {
  if (this.status !== 'inCart') throw new Error('not a valid cart!')
  const date = new Date()
  this.status = 'created'
  this.dateOrdered = date
}

// This isn't working?
Order.prototype.calculateSubtotal = function() {
  const quantites = OrderProduct.findAll({
    where: {orderId: this.id}
  })
  let sum = 0
  quantites.forEach(item => {
    sum += item.quantity * item.productPrice
  })
  return sum / 100
}

module.exports = Order
