const router = require('express').Router()
const {Order, Product} = require('../db/models')

module.exports = router

// Initial get cart method
router.get('/', async (req, res, next) => {
  console.log('session', req.sessionID)
  try {
    if (req.user) {
      const order = await Order.findOne({
        where: {userId: req.user.id, status: 'inCart'},
        include: [{model: Product}]
      })
      res.send(order)
    } else {
      const order = await Order.findOne({
        where: {sessionId: req.sessionID, status: 'inCart'},
        include: [{model: Product}]
      })
      res.send(order)
    }
  } catch (err) {
    next(err)
  }
})

// Update a cart
router.put('/:cartId', async (req, res, next) => {
  console.log(req.body)
  try {
    const order = await Order.findByPk(req.params.cartId)
    await order.update(req.body)
  } catch (err) {
    next(err)
  }
})
