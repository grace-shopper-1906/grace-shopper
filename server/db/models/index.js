const User = require('./user')
const Review = require('./review')
const Product = require('./product')
const Category = require('./category')
const Order = require('./order')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// Waiting to merge with Product table
Product.hasMany(Review)
Review.belongsTo(Product)
User.hasMany(Order)
User.hasMany(Review)
Review.belongsTo(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
Product.hasMany('Review')
Review.belongsTo('Product')
Product.hasMany('Category')
Category.belongsToMany('Product', {
  through: 'Category_Product'
})
Product.belongsToMany('Category', {
  through: 'Category_Product'
})

module.exports = {
  User,
  Review,
  Product,
  Category,
  Order
}
