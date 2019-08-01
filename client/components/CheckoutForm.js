import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {
  Container,
  Form,
  Input,
  TextArea,
  Button,
  Select
} from 'semantic-ui-react'

export class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.backHomeButton = this.backHomeButton.bind(this)
  }

  // componentDidMount() {
  //   this.props.fetchOneProduct(this.props.match.params.id)
  //   this.setState(this.props.match.params)
  // }

  backHomeButton(event) {
    event.preventDefault()
    console.log(this.props.history.push('/'))
  }

  render() {
    const main = (
      <Container>
        <h1>Ship To:</h1>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              id="form-input-control-firstName"
              control={Input}
              label="First name"
              placeholder="firstName"
            />
            <Form.Field
              id="form-input-control-lastName"
              control={Input}
              label="Last name"
              placeholder="lastName"
            />
            <Form.Field
              id="form-input-control-email"
              control={Input}
              label="Email"
              placeholder="email"
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              id="form-input-control-streetAddress"
              control={Input}
              label="Street Address"
              placeholder="streetAddress"
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              id="form-input-control-city"
              control={Input}
              label="City"
              placeholder="city"
            />
            <Form.Field
              id="form-input-control-zipCode"
              control={Input}
              label="Zip Code"
              placeholder="Zip Code"
            />
            <Form.Field
              id="form-input-control-state"
              control={Input}
              label="State"
              placeholder="state"
            />
            <Form.Field
              id="form-input-control-country"
              control={Input}
              label="Country"
              placeholder="country"
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
    return main
  }
}

//   const mapStateToProps = state => ({
//     oneProduct: state.oneProduct
//   })

//   const mapDispatchToProps = dispatch => {
//     return {
//       fetchOneProduct: id => dispatch(getOneProduct(id))
//     }
//   }

export default withRouter(connect(null)(CheckoutForm))
