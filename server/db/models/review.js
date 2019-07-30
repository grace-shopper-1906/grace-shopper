const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  star: {
    type: Sequelize.INTEGER,
    allowNull: false,
    // defaultValue?
    validate: {
      min: 1,
      max: 5
    }
  },
  text: {
    type: Sequelize.TEXT
  }
})

module.exports = Review
