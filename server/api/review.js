const router = require('express').Router()

const {Review} = require('../db/models')

router.put('/', async (req, res, next) => {
  try {
    const uid = req.user.id
    const star = req.body.star
    const text = req.body.text
    Review.update({star, text}, {where: {userId: uid}})
    res.json('')
  } catch (error) {
    next(error)
  }
})

module.exports = router
