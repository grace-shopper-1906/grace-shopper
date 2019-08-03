import React from 'react'
import {connect} from 'react-redux'
import {Card, Container} from 'semantic-ui-react'
import {
  fetchProductsThunk,
  fetchCategoriesThunk,
  filterProductsThunk
} from '../store'
import ProductsCard from './ProductCard'
import AllProductsHeader from './AllProductsHeader'
import {withRouter} from 'react-router-dom'

class DisconnectedAllProducts extends React.Component {
  render() {
    const products = this.props.products

    if (!products || products.length === 0) {
      return (
        <Container textAlign="center" style={{marginTop: '5rem'}}>
          <AllProductsHeader />
          <p>No Products Found</p>
        </Container>
      )
    }
    return (
      <Container textAlign="center" style={{marginTop: '5rem'}}>
        <AllProductsHeader />
        <Card.Group stackable>
          {products.map(product => (
            <ProductsCard product={product} key={product.id} />
          ))}
        </Card.Group>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    products: state.products,
    categories: state.categories
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProductsThunk()),
    getCategories: () => dispatch(fetchCategoriesThunk()),
    filterProducts: (page, category) =>
      dispatch(filterProductsThunk(page, category))
  }
}

export default withRouter(
  connect(mapState, mapDispatch)(DisconnectedAllProducts)
)
