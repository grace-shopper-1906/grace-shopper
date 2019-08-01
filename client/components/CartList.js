import React from 'react'
import {connect} from 'react-redux'
import {getOneProduct} from '../store/oneProduct'
import {updateCartThunk} from '../store/cart'
import {NavLink} from 'react-router-dom'
import {Item, Button, Dropdown, Container, Header} from 'semantic-ui-react'

class CartList extends React.Component {
  constructor() {
    super()
    this.state = {
      canCheckout: true
    }
    this.updateQuantity = this.updateQuantity.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
    this.createDropdown = this.createDropdown.bind(this)
  }

  componentDidUpdate() {
    const products = this.props.cart.products
    if (products) {
      products.forEach(item => {
        if (item.inventoryQuantity < item.order_product.quantity)
          this.setState({canCheckout: false})
      })
    }
  }

  updateQuantity(num, item) {
    const orderProduct = {
      quantity: num,
      productId: item.id,
      orderId: this.props.cart.id,
      event: 'updateQuantity'
    }
    this.props.update(orderProduct)
  }

  deleteProduct(item) {
    const orderProduct = {
      productId: item.id,
      orderId: this.props.cart.id,
      event: 'deleteItem'
    }
    this.props.update(orderProduct)
  }

  createDropdown(item) {
    let options = []
    for (let i = 1; i < 11; i++) {
      options.push(
        <Dropdown.Item
          text={`${i}`}
          value={i}
          onClick={() => this.updateQuantity(i, item)}
          key={i}
        />
      )
    }
    return options
  }

  notEnoughStock() {
    console.log('not enough stock')
    this.setState({canCheckout: false})
  }

  render() {
    const products = this.props.cart.products
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
                    <Item.Header as={NavLink} to={`/products/${item.id}`}>
                      {item.title}
                    </Item.Header>
                    {item.inventoryQuantity > item.order_product.quantity ? (
                      <Item.Meta>Stock: {item.inventoryQuantity}</Item.Meta>
                    ) : (
                      <Item.Meta color="red">Not enough stock!</Item.Meta>
                    )}
                    <Item.Description>
                      <Header sub>Price: {`$${item.price / 100.0}`}</Header>
                      <Dropdown
                        text={`Quantity: ${item.order_product.quantity.toString()}`}
                      >
                        <Dropdown.Menu>
                          {this.createDropdown(item)}
                        </Dropdown.Menu>
                      </Dropdown>
                      <Button
                        color="red"
                        onClick={() => this.deleteProduct(item)}
                      >
                        Delete Item
                      </Button>
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
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getProduct: id => dispatch(getOneProduct(id)),
  update: cart => dispatch(updateCartThunk(cart))
})

export default connect(mapState, mapDispatch)(CartList)
