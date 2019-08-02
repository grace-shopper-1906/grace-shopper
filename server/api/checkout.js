const router = require('express').Router()

const {ShippingAddress} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    //const id = req.body.id
    console.log(req.user)
    //const sessionId=req.sessionID
    if (req.user) {
      const id = req.user.shippingAddressId
      const address = await ShippingAddress.findByPk(id)
      res.json(address)
    } else {
      res.json(null)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
