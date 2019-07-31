import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Card, Container} from 'semantic-ui-react'
import {fetchProductsThunk} from '../store'
import ProductsCard from './ProductCard'

class DisconnectedAllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products

    if (!products || products.length === 0) {
      return (
        <Container textAlign="center" style={{marginTop: '5rem'}}>
          <p>No Products Found</p>
        </Container>
      )
    }
    return (
      <Container textAlign="center" style={{marginTop: '5rem'}}>
        <Card.Group stackable>
          {products.map(product => (
            <ProductsCard
              product={product}
              key={product.id}
              deleteCampus={this.props.deleteCampus}
            />
          ))}
        </Card.Group>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProductsThunk())
  }
}

export default withRouter(
  connect(mapState, mapDispatch)(DisconnectedAllProducts)
)
