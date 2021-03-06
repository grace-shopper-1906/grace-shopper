import React from 'react'
import {connect} from 'react-redux'
import {Card, Container} from 'semantic-ui-react'
import ProductsCard from './ProductCard'
import AllProductsHeader from './AllProductsHeader'

class DisconnectedAllProducts extends React.Component {
  render() {
    const products = this.props.products

    if (!products || products.length === 0) {
      return (
        <Container textAlign="center" style={{marginTop: '1rem'}}>
          <AllProductsHeader />
          <p>No Products Found</p>
        </Container>
      )
    }
    return (
      <Container textAlign="center" style={{marginTop: '1rem'}}>
        <AllProductsHeader />
        <Card.Group centered stackable>
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
    products: state.products.items
  }
}

export default connect(mapState)(DisconnectedAllProducts)
