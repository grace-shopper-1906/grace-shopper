'use strict'

const db = require('../server/db')
const {User, Review, Product, Category} = require('../server/db/models')

const faker = require('faker')

const createProduct = async () => {
  for (let i = 0; i < 100; i++) {
    const product = {
      title: faker.commerce.productName(),
      picture: faker.image.technics(),
      description: faker.commerce.product(),
      price: faker.commerce.price(),
      inventory_quantity: Math.floor(Math.random() * 100 + 1)
    }
    await Product.create(product)
  }
}

const createCategory = async () => {
  for (let i = 0; i < 10; i++) {
    const category = {
      name: faker.commerce.department()
    }
    await Category.create(category)
  }
}

const createUser = async () => {
  for (let i = 0; i < 30; i++) {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      shipping_address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
      is_admin: faker.random.boolean()
    }
    await User.create(user)
  }
}

const createReview = async () => {
  for (let i = 0; i < 100; i++) {
    const review = {
      author_id: Math.floor(Math.random() * 30 + 1),
      product_id: Math.floor(Math.random() * 100 + 1),
      stars: Math.floor(Math.random() * 5) + 1,
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
