import React from 'react'
import {connect} from 'react-redux'
import {
  Card,
  Container,
  Header,
  Segment,
  Dimmer,
  Loader
} from 'semantic-ui-react'
import ProductsCard from './ProductCard'
import {getAllProductsThunk, fetchCategoriesThunk} from '../store'
import {Link} from 'react-router-dom'

class DisconnectedHomepage extends React.Component {
  componentDidMount() {
    this.props.getCategories()
    this.props.getProducts()
  }
  render() {
    const {products, recommendedProducts, categories} = this.props

    if (!products || products.length === 0) {
      return (
        <div>
          <Segment>
            <Dimmer active>
              <Loader content="Loading" />
            </Dimmer>
          </Segment>
        </div>
      )
    }
    return (
      <Container textAlign="center" style={{marginTop: '5rem'}}>
        <Header as="h1">Wacky Products</Header>
        <Container textAlign="center">
          <Segment inverted> Shop by Category</Segment>
          <Card.Group stackable>
            {categories.map(category => (
              <Card
                className="centered"
                raised
                key={category.id}
                style={{margin: '1rem'}}
              >
                <Link
                  to={`/products?category=${category.name}`}
                  key={category.id}
                />
                <Card.Content>
                  <Card.Header>{category.name}</Card.Header>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
          <Segment inverted> Recommended Products</Segment>
          <Card.Group centered stackable>
            {recommendedProducts.map(product => (
              <ProductsCard product={product} key={product.id} />
            ))}
          </Card.Group>
        </Container>
      </Container>
    )
  }
}

const mapState = state => {
  let recommendedProducts = []

  if (state.products.items) {
    state.products.items.map(product => {
      let total = 0
      product.reviews.map(review => {
        total += review.star
      })
      const avg = Math.floor(total / product.reviews.length)
      if (avg === 5 && recommendedProducts.length < 6) {
        recommendedProducts.push(product)
      }
    })
  }

  return {
    products: state.products.items,
    recommendedProducts,
    categories: state.categories
  }
}

const mapDispatch = dispatch => {
  return {
    getCategories: () => dispatch(fetchCategoriesThunk()),
    getProducts: () => dispatch(getAllProductsThunk())
  }
}

export default connect(mapState, mapDispatch)(DisconnectedHomepage)
