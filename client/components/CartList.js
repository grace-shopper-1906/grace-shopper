import React from 'react'
import {connect} from 'react-redux'
import {getOneProduct} from '../store/oneProduct'
import {updateCartThunk} from '../store/cart'
import {Item, Button, Dropdown, Container, Header} from 'semantic-ui-react'

export const CartList = props => {
  // Going to use this to undateQuantity of items
  const updateQuantity = (num, item) => {
    const orderProduct = {
      quantity: num,
      productId: item.id,
      orderId: props.cart.id,
      event: 'updateQuantity'
    }
    props.update(orderProduct)
  }
  const createDropdown = item => {
    let options = []
    for (let i = 1; i < 11; i++) {
      options.push(
        <Dropdown.Item
          text={`${i}`}
          value={i}
          onClick={() => updateQuantity(i, item)}
          key={i}
        />
      )
    }
    return options
  }
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
                      <Dropdown.Menu>{createDropdown(item)}</Dropdown.Menu>
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
  update: cart => dispatch(updateCartThunk(cart))
})

export default connect(mapState, mapDispatch)(CartList)
