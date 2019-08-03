const router = require('express').Router()

const Product = require('../db/models/product')
const Reviews = require('../db/models/review')
const Category = require('../db/models/category')
// const querystring = require('querystring')
const Sequelize = require('sequelize')

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

// //get all - no pagination
// router.get('/', async (req, res, next) => {
//   try {
//     const products = await Product.findAll({include: [{all: true}]})
//     res.send(products)
//   } catch (err) {
//     next(err)
//   }
// })

// front-end routes: /catalogue?page=1&category=jewels
// front-end routes: /catalogue?page=2
// front-end routes: /catalogue

//get all - pagination

// const fetchProducts = query => {
//   return async dispatch => {
//     fetch(/* reconstruct url from query */)
//   }
// }

router.get('/', async (req, res, next) => {
  const page = req.query.page || 1
  const PAGE_SIZE = 12
  const CATEGORY_FILTER = req.query.category
  if (req.query.category) {
    try {
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
      res.json(results)
    } catch (error) {
      next(error)
    }
  } else {
    try {
      const results = await Product.findAll({
        include: [{all: true}],
        orderBy: 'id',
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE
      })
      res.json(results)
    } catch (error) {
      next(error)
    }
  }
})

//   Product.findAndCountAll()
//     .then(data => {
//       let page = req.params.page // page number
//       let pages = Math.ceil(data.count / limit)
//       offset = limit * (page - 1)

//       Product.findAll({
//         include: [{all: true}],
//         limit: limit,
//         offset: offset,
//         $sort: {id: 1}
//       }).then(products => {
//         res
//           .status(200)
//           .json({result: products, count: data.count, pages: pages})
//       })
//     })
//     .catch(function(error) {
//       res.status(500).send('Internal Server Error', error)
//     })
// })

module.exports = router
