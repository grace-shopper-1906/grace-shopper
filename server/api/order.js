const router = require('express').Router()
const Sequelize = require('sequelize')
const {Order, Product} = require('../db/models')
const Op = Sequelize.Op

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const orders = await Order.findAll({
        where: {
          userId: req.user.id,
          status: {
            [Op.ne]: 'inCart'
          }
        },
        include: [{model: Product}],
        order: [['dateOrdered', 'DESC']]
      })
      res.send(orders)
    }
  } catch (err) {
    next(err)
  }
})
