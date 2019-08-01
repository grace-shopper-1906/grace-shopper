import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'
import {updateCartThunk} from '../store/cart'

class DisconnectedAddToCart extends React.Component {
  render() {
    this.props.orderProducts.orderId = this.props.cart.id

    return (
      <Button
        onClick={() => {
          this.props.addToCart(this.props.orderProducts)
        }}
      >
        Add to Cart
      </Button>
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
