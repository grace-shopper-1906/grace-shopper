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
import {getAllProductsThunk, fetchProductsThunk} from '../store'
import {NavLink as Link} from 'react-router-dom'

class DisconnectedHomepage extends React.Component {
  componentDidMount() {
    // this.props.getProducts()
  }
  render() {
    const {products, recommendedProducts, categories} = this.props

    if (!products || products.length === 0) {
      return (
        <Container>
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
        </Container>
      )
    }
    return (
      <Container textAlign="center" style={{marginTop: '1rem'}}>
        <Header as="h1">Wacky Products</Header>
        <Container textAlign="center" style={{marginTop: '5rem'}}>
          <Segment inverted>
            <Header as="h4">Shop by Category</Header>
          </Segment>
          <Card.Group centered stackable>
            {categories.map(category => (
              <Card
                className="centered"
                raised
                key={category.id}
                style={{margin: '1rem'}}
              >
                <Card.Content>
                  <Card.Header
                    as={Link}
                    to={`/products?category=${category.name}`}
                  >
                    {category.name}
                  </Card.Header>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
          <Segment inverted>
            <Header as="h4">Recommended Products</Header>
          </Segment>
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
      if (avg >= 3 && recommendedProducts.length < 3) {
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
    // getProducts: () => dispatch(getAllProductsThunk()),
    applyFilter: (page, category, sortBy, searchBy) =>
      dispatch(fetchProductsThunk(page, category, sortBy, searchBy))
  }
}

export default connect(mapState, mapDispatch)(DisconnectedHomepage)
