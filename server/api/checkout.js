const router = require('express').Router()

const User = require('../db/models/user')
const ShippingAdress = require('../db/models/shippingAddress')

router.get('/', async (req, res, next) => {
  try {
    //const id = req.params.id
    // const user = await User.findByPk(id, {
    //   include: [{model: ShippingAdress}]
    // })
    // res.json(user)
    res.json('hi')
  } catch (error) {
    next(error)
  }
})

module.exports = router
