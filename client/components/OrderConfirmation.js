import {Container} from 'semantic-ui-react'
import React, {Component} from 'react'

export class OrderConfirmation extends Component {
  render() {
    return <div />
  }
}

export default OrderConfirmation

const mapDispatch = dispatch => {
  return {
    addToCart: cart => dispatch(updateCartThunk(cart))
  }
}
