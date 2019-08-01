import React from 'react'
import {connect} from 'react-redux'
import {Container, Button} from 'semantic-ui-react'
import {updateCartThunk} from '../store/cart'

class DisconnectedAddToCart extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
  }
  render() {
    const orderProducts = {
      quantity: this.state.quantity,
      productId: this.props.product.id,
      orderId: this.props.cart.id
    }

    return (
      <Container textAlign="center" style={{marginTop: '5rem'}}>
        <Button
          onClick={() => {
            this.props.addToCart(orderProducts)
          }}
        >
          Add to Cart
        </Button>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    addToCart: cart => dispatch(updateCartThunk(cart))
  }
}

export default connect(mapState, mapDispatch)(DisconnectedAddToCart)
