import React from 'react'
import {OrderProduct} from '../components'
import {Item, Segment, Grid} from 'semantic-ui-react'

var moment = require('moment')

export const OrderItem = props => {
  const order = props.order
  console.log(order)
  return (
    <Segment.Group>
      <Segment>
        <Grid columns={3}>
          <Grid.Column>
            <h3>
              Order Placed: {moment(order.dateOrdered).format('MMMM Do YYYY')}
            </h3>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <h3>Status: {order.status}</h3>
          </Grid.Column>
          <Grid.Column textAlign="right">
            <h3>Total Price: ${order.totalPrice / 100}</h3>
          </Grid.Column>
        </Grid>
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

export default OrderItem
