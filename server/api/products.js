const router = require('express').Router()

const Product = require('../db/models/product')
const Reviews = require('../db/models/review')
const Category = require('../db/models/category')
const Sequelize = require('sequelize')

// front-end routes: /products?page=1&category=jewels
// front-end routes: /products?page=2
// front-end routes: /products

router.get('/', async (req, res, next) => {
  const page = req.query.page || 1
  const PAGE_SIZE = 12
  const CATEGORY_FILTER = req.query.category
  const SEARCH_FILTER = req.query.searchBy
  const SORT_BY = req.query.sortBy || 'id'

  console.log('query', req.query)

  if (!req.query.searchBy && !req.query.category) {
    try {
      const data = await Product.findAndCountAll()
      const pages = Math.ceil(data.count / PAGE_SIZE)

      const results = await Product.findAll({
        include: [{all: true}],
        order: [SORT_BY],
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE
      })
      res.json({results, pages})
    } catch (error) {
      next(error)
    }
  }
  if (req.query.category && req.query.searchBy) {
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
        ],
        where: {
          title: {
            [Sequelize.Op.startsWith]: SEARCH_FILTER
          }
        }
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
        where: {
          title: {
            [Sequelize.Op.startsWith]: SEARCH_FILTER
          }
        },
        order: [SORT_BY],
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE
      })
      res.json({results, pages})
    } catch (error) {
      next(error)
    }
  }
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
        order: [SORT_BY],
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE
      })
      res.json({results, pages})
    } catch (error) {
      next(error)
    }
  }
  if (req.query.searchBy) {
    try {
      const data = await Product.findAndCountAll({
        where: {
          title: {
            [Sequelize.Op.startsWith]: SEARCH_FILTER
          }
        }
      })
      const pages = Math.ceil(data.count / PAGE_SIZE)

      const results = await Product.findAll({
        include: [{all: true}],
        where: {
          title: {
            [Sequelize.Op.startsWith]: SEARCH_FILTER
          }
        },
        order: [SORT_BY],
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
