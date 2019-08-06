import React from 'react'
import {OrderProduct} from '../components'
import {cancelOrderThunk} from '../store/orders'
import {connect} from 'react-redux'
import {Item, Segment, Grid, Button} from 'semantic-ui-react'

export const OrderSummary = props => {
  const order = props.order
  return (
    <Segment.Group>
      <Segment>
        <h3>Total Price: ${order.totalPrice / 100}</h3>
      </Segment>
      <Segment>
        <Item.Group>
          {order.products.map(item => {
            return <OrderProduct product={item} key={item.id} />
          })}
        </Item.Group>
      </Segment>
    </Segment.Group>
  )
}

const mapDispatch = dispatch => ({
  cancelOrder: orderId => dispatch(cancelOrderThunk(orderId))
})

export default connect(null, mapDispatch)(OrderSummary)
