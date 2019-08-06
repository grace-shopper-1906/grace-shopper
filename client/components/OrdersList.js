import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store/orders'
import {OrderItem} from '../components'
import {Container} from 'semantic-ui-react'

const _ = require('lodash/lang')

class OrdersList extends Component {
  componentDidMount() {
    this.props.getOrders()
  }

  render() {
    const orders = this.props.orders
    return (
      <Container>
        <h1>Your Orders:</h1>
        <h2>You have {orders.length} orders</h2>
        {orders.map(order => <OrderItem key={order.id} order={order} />)}
      </Container>
    )
  }
}

const mapState = state => ({
  orders: state.orders
})

const mapDispatch = dispatch => ({
  getOrders: () => dispatch(getOrders())
})

export default connect(mapState, mapDispatch)(OrdersList)
