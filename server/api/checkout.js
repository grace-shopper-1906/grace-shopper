const router = require('express').Router()

const {User, ShippingAddress} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
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

router.put('/', async (req, res, next) => {
  try {
    if (req.user.id) {
      const uid = req.user.id
      const id = req.user.shippingAddressId
      const firstName = req.body.firstName
      User.update({firstName}, {where: {id: uid}})
      const streetAddress = req.body.streetAddress
      ShippingAddress.update({streetAddress}, {where: {id}})
      res.json('')
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
