'use strict'

const db = require('../server/db/db')
const {
  User,
  Review,
  Product,
  Category,
  ShippingAddress,
  Order,
  orderProduct
} = require('../server/db/models')

const faker = require('faker')

const createProduct = async () => {
  for (let i = 0; i < 10000; i++) {
    const product = {
      title: faker.commerce.productName(),
      picture: faker.image.image(),
      description: faker.lorem.paragraph(),
      price: Math.floor(Math.random() * 100000 + 1),
      inventoryQuantity: Math.floor(Math.random() * 100 + 1)
    }
    await Product.create(product)
  }
}

const createCategory = async () => {
  let categories = []

  for (let i = 0; i < 30; i++) {
    const category = {
      name: faker.commerce.department()
    }
    if (!categories.includes(category.name)) {
      await Category.create(category)
      categories.push(category.name)
    }
  }
}

const setCategoryOnProduct = async () => {
  for (let j = 0; j < 3; j++) {
    for (let i = 1; i < 101; i++) {
      const category = await Category.findByPk(
        Math.floor(Math.random() * 30 + 1)
      )
      const product = await Product.findByPk(i)
      if (!product) {
        console.log('Product not found')
      } else {
        await product.addCategory(category)
      }
    }
  }
}

const createUser = async () => {
  for (let i = 0; i < 30; i++) {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      isAdmin: faker.random.boolean(),
      shippingAddressId: Math.floor(Math.random() * 30 + 1)
    }
    await User.create(user)
  }
}

const createShippingAddress = async () => {
  for (let i = 0; i < 30; i++) {
    const shippingAddress = {
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      zipCode: faker.address.zipCode(),
      state: faker.address.stateAbbr(),
      country: faker.address.country()
    }
    await ShippingAddress.create(shippingAddress)
  }
}

const createReview = async () => {
  for (let i = 0; i < 100; i++) {
    const review = {
      userId: Math.floor(Math.random() * 30 + 1),
      productId: Math.floor(Math.random() * 100 + 1),
      star: Math.floor(Math.random() * 5) + 1,
      text: faker.lorem.paragraphs()
    }
    await Review.create(review)
  }
}

const createOrder = async () => {
  const statusOptions = [
    'inCart',
    'created',
    'processed',
    'cancelled',
    'completed'
  ]
  for (let i = 0; i < 100; i++) {
    const order = {
      userId: Math.floor(Math.random() * 30 + 1),
      sessionId: Math.floor(Math.random() * 30 + 1),
      status: statusOptions[Math.floor(Math.random() * 5)]
    }
    await Order.create(order)
  }
}

const createOrderProduct = async () => {
  for (let i = 1; i < 100; i++) {
    const orderProductRelationship = {
      orderId: i,
      productId: Math.floor(Math.random() * 100 + 1),
      quantity: Math.floor(Math.random() * 10 + 1),
      productPrice: Math.floor(Math.random() * 100000 + 1)
    }
    await orderProduct.create(orderProductRelationship)
  }
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await createProduct()
  await createCategory()
  await createShippingAddress()
  await createUser()
  await createReview()
  await setCategoryOnProduct()
  await createOrder()
  await createOrderProduct()

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
