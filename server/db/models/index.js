const User = require('./user')
const Review = require('./review')
const Product = require('./product')
const Category = require('./category')
const Order = require('./order')
const ShippingAddress = require('./shippingAddress')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Product.hasMany(Review)
Review.belongsTo(Product)
User.hasMany(Order)
User.hasMany(Review)
Review.belongsTo(User)

Order.hasOne(Sessions)
Sessions.belongsTo(Order)

User.hasOne(ShippingAddress)
ShippingAddress.belongsTo(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
Product.hasMany('Review')
Review.belongsTo('Product')
Category.belongsToMany('Product', {
  through: 'category_product'
})
Product.belongsToMany('Category', {
  through: 'category_product'
})

module.exports = {
  User,
  Review,
  Product,
  Category,
  Order,
  ShippingAddress
}
