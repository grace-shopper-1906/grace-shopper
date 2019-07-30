'use strict'

const db = require('../server/db/db')
const {User, Review, Product, Category} = require('../server/db/models')

const faker = require('faker')

//add seed file for user ready to checkout etc

const createProduct = async () => {
  for (let i = 0; i < 100; i++) {
    const product = {
      title: faker.commerce.productName(),
      picture: faker.image.technics(),
      description: faker.lorem.paragraph(),
      price: faker.commerce.price(),
      inventoryQuantity: Math.floor(Math.random() * 100 + 1)
    }
    await Product.create(product)
  }
}

const createCategory = async () => {
  for (let i = 0; i < 30; i++) {
    const category = {
      name: faker.commerce.department()
    }
    await Category.create(category)
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
      shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
      isAdmin: faker.random.boolean()
    }
    await User.create(user)
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

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await createProduct()
  await createCategory()
  await createUser()
  await createReview()
  await setCategoryOnProduct()

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
