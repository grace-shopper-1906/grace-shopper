const router = require('express').Router()
const {Order, Product} = require('../db/models')

module.exports = router

// Initial get cart method
router.get('/', async (req, res, next) => {
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

//Create a cart - if no cart found, create on initial load. Also create new cart after user checks out

// Add product to a cart
router.put('/:cartId', async (req, res, next) => {
  try {
    const cart = await Order.findByPk(req.params.cartId)
    const updatedCart = await cart.addProduct(req.body.productId)
    res.status(204).json(updatedCart)
  } catch (err) {
    next(err)
  }
})
