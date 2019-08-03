const router = require('express').Router()

const Product = require('../db/models/product')
const Reviews = require('../db/models/review')
const Category = require('../db/models/category')
const Sequelize = require('sequelize')

// const querystring = require('querystring')

// //get all - no pagination
// router.get('/', async (req, res, next) => {
//   try {
//     const products = await Product.findAll({include: [{all: true}]})
//     res.send(products)
//   } catch (err) {
//     next(err)
//   }
// })

// const fetchProducts = query => {
//   return async dispatch => {
//     fetch(/* reconstruct url from query */)
//   }
// }

// front-end routes: /products?page=1&category=jewels
// front-end routes: /products?page=2
// front-end routes: /products

router.get('/', async (req, res, next) => {
  const page = req.query.page || 1
  const PAGE_SIZE = 12
  const CATEGORY_FILTER = req.query.category
  if (req.query.category) {
    try {
      const data = await Product.findAndCountAll({
        include: [
          {
            model: Category,
            where: {
              name: {
                [Sequelize.Op.in]: [CATEGORY_FILTER]
              }
            }
          }
        ]
      })
      const pages = Math.ceil(data.count / PAGE_SIZE)

      const results = await Product.findAll({
        include: [
          {
            model: Category,
            where: {
              name: {
                [Sequelize.Op.in]: [CATEGORY_FILTER]
              }
            }
          },
          {model: Reviews}
        ],
        orderBy: 'id',
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE
      })
      res.json({results, pages})
    } catch (error) {
      next(error)
    }
  } else {
    try {
      const data = await Product.findAndCountAll()
      const pages = Math.ceil(data.count / PAGE_SIZE)

      const results = await Product.findAll({
        include: [{all: true}],
        orderBy: 'id',
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE
      })
      res.json({results, pages})
    } catch (error) {
      next(error)
    }
  }
})

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
