import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, NavLink} from 'react-router-dom'
import {Container, Form, Input, Button, Message} from 'semantic-ui-react'
import {getCart} from '../store/cart'
import {OrderSummary} from '../components'
import {PlaceOrderButton} from '../components'
import {
  fetchShippingAddress,
  updateShippingAddress,
  stripeCheckout
} from '../store/checkout'
import StripeCheckout from 'react-stripe-checkout'
import history from '../history'
require('../../secrets')
const _ = require('lodash/lang')

export class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      city: this.props.shippingAddress.city,
      zipCode: this.props.shippingAddress.zipCode,
      state: this.props.shippingAddress.state,
      country: this.props.shippingAddress.country,
      streetAddress: this.props.shippingAddress.streetAddress,
      canCheckout: true
    }

    this.backHomeButton = this.backHomeButton.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleToken = this.handleToken.bind(this)
    this.notEnoughStock = this.notEnoughStock.bind(this)
  }

  async componentDidMount() {
    this.props.shippingA()
    this.setState(this.props.match.params)
    if (_.isEmpty(this.props.cart)) await this.props.getCart()
    if (!this.notEnoughStock()) {
      console.log('bad stock')
      this.setState({
        canCheckout: false
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shippingAddress) {
      if (this.props.shippingAddress !== nextProps.shippingAddress) {
        this.setState(nextProps.shippingAddress)
      }
    }
  }

  backHomeButton(event) {
    event.preventDefault()
    this.props.history.push('/')
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.cShippingA(this.state)
    this.props.shippingA()
  }

  notEnoughStock() {
    const products = this.props.cart.products
    let result = true
    if (products) {
      products.forEach(item => {
        if (item.inventoryQuantity < item.order_product.quantity) {
          result = false
        }
      })
    }
    return result
  }

  async handleToken(token) {
    const product = {
      amount: 1,
      name: 'name',
      address: {
        line1: this.state.streetAddress,
        city: this.state.city,
        country: this.state.country,
        postal_code: this.state.zipCode
      }
    }
    const response = await this.props.stripeCheckout(token, product)
    console.log('response', response)
    if (response === 'success') {
      console.log('pushing to history')
      this.props.history.push(`/checkout/confirmation/${this.props.cart.id}`)
    }
  }

  // eslint-disable-next-line complexity
  render() {
    if (!this.props.shippingAddress) {
      return <div>Loading</div>
    } else if (!this.state.canCheckout) {
      return (
        <Container>
          <Message negative>
            <Message.Header>
              One of your products doesn't have enough stock!
            </Message.Header>
            <p>
              Please fix your <NavLink to="/cart/view">cart</NavLink> to
              checkout
            </p>
          </Message>
        </Container>
      )
    }
    const hasUser = (
      <Container>
        <OrderSummary order={this.props.cart} />
        <h1>Ship To:</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Field
              id="firstName"
              name="firstName"
              type="text"
              onChange={this.handleChange}
              value={this.state.firstName}
              control={Input}
              label="First name"
              placeholder="First Name"
            />
            <Form.Field
              id="lastName"
              name="lastName"
              type="text"
              onChange={this.handleChange}
              value={this.state.lastName}
              control={Input}
              label="Last name"
              placeholder="Last Name"
            />
            <Form.Field
              id="email"
              name="email"
              type="text"
              onChange={this.handleChange}
              value={this.state.email}
              control={Input}
              label="Email"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              id="streetAddress"
              name="streetAddress"
              type="text"
              onChange={this.handleChange}
              value={this.state.streetAddress}
              control={Input}
              label="Street Address"
              placeholder="Street Address"
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              id="city"
              name="city"
              type="text"
              onChange={this.handleChange}
              value={this.state.city}
              control={Input}
              label="City"
              placeholder="City"
            />
            <Form.Field
              id="zipCode"
              name="zipCode"
              type="text"
              onChange={this.handleChange}
              value={this.state.zipCode}
              control={Input}
              label="Zip Code"
              placeholder="Zip Code"
            />
            <Form.Field
              id="state"
              name="state"
              type="text"
              onChange={this.handleChange}
              value={this.state.state}
              control={Input}
              label="State"
              placeholder="State"
            />
            <Form.Field
              id="country"
              name="country"
              type="text"
              onChange={this.handleChange}
              value={this.state.country}
              control={Input}
              label="Country"
              placeholder="Country"
            />
          </Form.Group>

          <Form.Field
            id="form-button-control-public"
            control={Button}
            content="Confirm"
            label=""
          />
        </Form>
        <StripeCheckout
          stripeKey={process.env.STRIPE_PUBLIC_KEY}
          token={this.handleToken}
          price={1}
        />
      </Container>
    )
    //return hasUser
    return hasUser
  }
}

const mapStateToProps = state => ({
  shippingAddress: state.shippingAddress,
  user: state.user,
  cart: state.cart
})

const mapDispatchToProps = dispatch => {
  return {
    shippingA: () => dispatch(fetchShippingAddress()),
    cShippingA: address => dispatch(updateShippingAddress(address)),
    stripeCheckout: (token, product) =>
      dispatch(stripeCheckout(token, product)),
    getCart: () => dispatch(getCart())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
)
