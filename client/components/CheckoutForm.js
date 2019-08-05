import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Container, Form, Input, Button} from 'semantic-ui-react'
import {fetchShippingAddress, updateShippingAddress} from '../store/checkout'

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
      streetAddress: this.props.shippingAddress.streetAddress
    }

    this.backHomeButton = this.backHomeButton.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.shippingA()
    this.setState(this.props.match.params)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shippingAddress) {
      if (this.props.shippingAddress !== nextProps.shippingAddress) {
        console.log('setting shipping state', nextProps.shippingAddress)
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

  // eslint-disable-next-line complexity
  render() {
    //let u = this.props.user
    //let sa = this.props.shippingAddress
    if (!this.props.shippingAddress) {
      return <div>Loading</div>
    }
    const hasUser = (
      <Container>
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
      </Container>
    )
    //return hasUser
    return hasUser
  }
}

const mapStateToProps = state => ({
  shippingAddress: state.shippingAddress,
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    shippingA: () => dispatch(fetchShippingAddress()),
    cShippingA: address => dispatch(updateShippingAddress(address))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
)
