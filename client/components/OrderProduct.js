import React from 'react'
import AddToCart from './AddToCart'
import {NavLink} from 'react-router-dom'
import {Item, Header, Button} from 'semantic-ui-react'

export const OrderProduct = props => {
  const product = props.product

  const orderProducts = {
    quantity: product.order_product.quantity,
    productId: product.id,
    event: 'addProduct'
  }

  return (
    <Item key={product.id}>
      <Item.Image size="small" src={product.picture} />
      <Item.Content>
        <Item.Header as={NavLink} to={`/products/${product.id}`}>
          {product.title}
        </Item.Header>
        <Item.Meta>{`Quantity: ${product.order_product.quantity}`}</Item.Meta>
        <Item.Description>
          <Header sub>
            Price: {`$${product.order_product.productPrice / 100.0}`}
          </Header>
          <AddToCart buyItAgain={true} orderProducts={orderProducts} />
          <Button>Write a Product Review</Button>
        </Item.Description>
      </Item.Content>
    </Item>
  )
}

export default OrderProduct
