const express = require('express')
const router = express.Router()
const {Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({include: [{all: true}]})
    res.send(products)
  } catch (err) {
    next(err)
  }
})

module.exports = router
