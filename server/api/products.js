const router = require('express').Router()
module.exports = router

const Product = require('../db/models/product')
const Reviews = require('../db/models/review')
const Category = require('../db/models/category')

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const product = await Product.findByPk(id, {
      include: [{model: Reviews}, {model: Category}]
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})

module.exports = router
