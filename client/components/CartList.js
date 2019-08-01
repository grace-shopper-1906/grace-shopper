import React from 'react'
import {connect} from 'react-redux'
import {getOneProduct} from '../store/oneProduct'
import {putCart} from '../store/cart'
import {Item, Button, Dropdown, Container, Header} from 'semantic-ui-react'

export const CartList = props => {
  // Going to use this to undateQuantity of items
  const updateQuantity = products => {}
  const products = props.cart.products
  return (
    <Container>
      <h1>Your Cart</h1>
      <Item.Group>
        {products &&
          products.map(item => {
            return (
              <Item key={item.id}>
                <Item.Image size="small" src={item.picture} />
                <Item.Content>
                  <Item.Header
                    as="a"
                    href={`/products/${item.id}`}
                    onClick={() => props.getProduct(item.id)}
                  >
                    {item.title}
                  </Item.Header>
                  {item.inventoryQuantity > 0 ? (
                    <Item.Meta>Stock: {item.inventoryQuantity}</Item.Meta>
                  ) : (
                    <Item.Meta>Out of Stock</Item.Meta>
                  )}
                  <Item.Description>
                    <Header sub>Price: {`$${item.price / 100.0}`}</Header>
                    <Dropdown
                      text={`Quantity: ${item.order_product.quantity.toString()}`}
                    >
                      <Dropdown.Menu>
                        <Dropdown.Item text="1" va />
                        <Dropdown.Item text="2" />
                        <Dropdown.Item text="3" />
                        <Dropdown.Item text="4" />
                        <Dropdown.Item text="5" />
                        <Dropdown.Item text="6" />
                        <Dropdown.Item text="7" />
                        <Dropdown.Item text="8" />
                        <Dropdown.Item text="9" />
                        <Dropdown.Item text="10" />
                      </Dropdown.Menu>
                    </Dropdown>
                    <Button color="red">Delete Item</Button>
                  </Item.Description>
                </Item.Content>
              </Item>
            )
          })}
      </Item.Group>
      <h1>Subtotal: </h1>
      <Button color="green">Checkout</Button>
    </Container>
  )
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getProduct: id => dispatch(getOneProduct(id)),
  putCart: cart => dispatch(putCart(cart))
})

export default connect(mapState, mapDispatch)(CartList)
