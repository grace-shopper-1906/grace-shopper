import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Container, Form, Input, Button} from 'semantic-ui-react'

export class ReviewForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.backHomeButton = this.backHomeButton.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    //this.setState(this.props.match.params)
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
  }

  render() {
    const main = (
      <Container>
        <h1>Review:</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Field
              id="review"
              name="review"
              type="text"
              onChange={this.handleChange}
              value={this.state.firstName}
              control={Input}
              //label="Review"
              placeholder="Write Review Here"
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

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    //
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
)
