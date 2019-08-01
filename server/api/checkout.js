const router = require('express').Router()

const User = require('../db/models/user')
const ShippingAdress = require('../db/models/shippingAddress')

router.get('/', async (req, res, next) => {
  try {
    const id = req.user.id
    //const sessionId=req.sessionID
    const user = await User.findByPk(id, {
      include: [{model: ShippingAdress}]
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router
