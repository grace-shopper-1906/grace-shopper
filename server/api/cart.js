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
//TODO: need to deal with case for product already existing on order
router.put('/:cartId', async (req, res, next) => {
  try {
    const cart = await Order.findByPk(req.params.cartId)
    await cart.addProduct(req.body.productId)
    const updatedCart = await Order.findByPk(req.params.cartId, {
      include: [{model: Product}]
    })
    res.status(204).send(updatedCart)
  } catch (err) {
    next(err)
  }
})
