import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Container, Form, Input, Button} from 'semantic-ui-react'
import {fetchShippingAddress} from '../store/checkout'

export class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.backHomeButton = this.backHomeButton.bind(this)
  }

  componentDidMount() {
    this.props.shippingA()
  }

  backHomeButton(event) {
    event.preventDefault()
    this.props.history.push('/')
  }

  render() {
    let u = this.props.user
    let sa = this.props.shippingAddress
    console.log(u)
    console.log(sa)
    const main = (
      <Container>
        <h1>Ship To:</h1>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              id="form-input-control-firstName"
              control={Input}
              label="First name"
              placeholder={u.firstName || 'First Name'}
            />
            <Form.Field
              id="form-input-control-lastName"
              control={Input}
              label="Last name"
              placeholder={u.lastName || 'Last Name'}
            />
            <Form.Field
              id="form-input-control-email"
              control={Input}
              label="Email"
              placeholder={u.email || 'Email'}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              id="form-input-control-streetAddress"
              control={Input}
              label="Street Address"
              placeholder={sa.streetAddress || 'Street Address'}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              id="form-input-control-city"
              control={Input}
              label="City"
              placeholder={sa.city || 'City'}
            />
            <Form.Field
              id="form-input-control-zipCode"
              control={Input}
              label="Zip Code"
              placeholder={sa.zipCode || 'Zip Code'}
            />
            <Form.Field
              id="form-input-control-state"
              control={Input}
              label="State"
              placeholder={sa.state || 'State'}
            />
            <Form.Field
              id="form-input-control-country"
              control={Input}
              label="Country"
              placeholder={sa.country || 'Country'}
            />
          </Form.Group>

          <Form.Field
            id="form-button-control-public"
            control={Button}
            content="Confirm"
            label=""
          />
          <Form.Field
            id="form-button-control-home"
            control={Button}
            content="home"
            label=""
          />
        </Form>
      </Container>
    )
    return main
  }
}

const mapStateToProps = state => ({
  shippingAddress: state.shippingAddress,
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    shippingA: () => dispatch(fetchShippingAddress())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
)
