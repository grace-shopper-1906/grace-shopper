import React from 'react'
import {connect} from 'react-redux'
import {Item, Button, Dropdown, Container, Header} from 'semantic-ui-react'

export const CartList = props => {
  // Going to use this to undateQuantity of items
  const updateQuantity = () => {}
  const products = props.cart.products
  console.log(products)
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
                  <Item.Header as="a">{item.title}</Item.Header>
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
                        <Dropdown.Item text="1" />
                        <Dropdown.Item text="2" />
                        <Dropdown.Item text="3" />
                        <Dropdown.Item text="4" />
                        <Dropdown.Item text="5" />
                      </Dropdown.Menu>
                    </Dropdown>
                    <Button color="red">Delete Item</Button>
                  </Item.Description>
                </Item.Content>
              </Item>
            )
          })}
      </Item.Group>
    </Container>
  )
}

const mapState = state => ({
  cart: state.cart
})

export default connect(mapState)(CartList)
