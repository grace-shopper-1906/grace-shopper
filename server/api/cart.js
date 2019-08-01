const router = require('express').Router()
const {Order, Product, orderProduct} = require('../db/models')

module.exports = router

const findOrCreateCart = async req => {
  try {
    if (req.user) {
      const cart = await Order.findOrCreate({
        where: {userId: req.user.id, status: 'inCart'},
        include: [{model: Product}]
      })
      return cart[0].dataValues
    } else {
      const cart = await Order.findOrCreate({
        where: {sessionId: req.sessionID, status: 'inCart'},
        include: [{model: Product}]
      })
      return cart[0].dataValues
    }
  } catch (err) {
    console.log(err)
  }
}

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

// Create a cart - if no cart found, create on initial load. Also create new cart after user checks out
// Add product to a cart
router.put('/:cartId', async (req, res, next) => {
  try {
    const cart = await findOrCreateCart(req)
    const productThrough = await orderProduct.findOne({
      where: {orderId: cart.id, productId: req.body.productId}
    })
    if (req.body.event === 'addProduct') {
      if (productThrough) {
        await productThrough.update({
          quantity: (productThrough.quantity += req.body.quantity)
        })
      } else {
        await orderProduct.create({
          quantity: req.body.quantity,
          orderId: cart.id,
          productId: req.body.productId
        })
      }
    }
    if (req.body.event === 'updateQuantity') {
      await productThrough.update({
        quantity: req.body.quantity
      })
    }
    const newCart = await Order.findByPk(cart.id, {
      include: [{model: Product}]
    })
    res.send(newCart)
  } catch (err) {
    next(err)
  }
})
