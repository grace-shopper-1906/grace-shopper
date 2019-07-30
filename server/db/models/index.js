const User = require('./user')
const db = require('./db')
const Products = require('./product')
const Categories = require('./category')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

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
  through: 'Category_Product',
  foreignKey: 'theForeignKey'
})
Product.belongsToMany('Category', {
  through: 'Category_Product',
  foreignKey: 'childForegnKey'
})

module.exports = {
  db,
  User,
  Product,
  Category
}
