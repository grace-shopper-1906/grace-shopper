const User = require('./user')
const Review = require('./review')
const Product = require('./product')
const Category = require('./category')
const Order = require('./order')
const ShippingAddress = require('./shippingAddress')
const orderProduct = require('./orderProduct')

Product.hasMany(Review)
Review.belongsTo(Product)
User.hasMany(Order)
User.hasMany(Review)
Review.belongsTo(User)

Order.hasOne(Sessions)
Sessions.belongsTo(Order)

User.hasOne(ShippingAddress)
ShippingAddress.belongsTo(User)

Order.hasMany(Product, {through: orderProduct})
Product.hasMany(Order, {through: orderProduct})

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
  ShippingAddress,
  orderProduct
}
