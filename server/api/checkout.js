const router = require('express').Router()

const {User, ShippingAddress} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    //const sessionId=req.sessionID
    if (req.user && req.user.id) {
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
    if (req.user && req.user.id) {
      const uid = req.user.id
      const id = req.user.shippingAddressId
      const firstName = req.body.firstName
      const lastName = req.body.lastName
      const email = req.body.email
      const streetAddress = req.body.streetAddress
      const city = req.body.city
      const zipCode = req.body.zipCode
      const state = req.body.state
      const country = req.body.country
      await User.update({firstName, lastName, email}, {where: {id: uid}})
      await ShippingAddress.update(
        {streetAddress, city, zipCode, state, country},
        {where: {id}}
      )
      res.json('')
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
