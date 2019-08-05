import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {
  Container,
  Form,
  TextArea,
  Rating,
  Input,
  Button
} from 'semantic-ui-react'

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
          <Rating icon="star" defaultRating={1} maxRating={5}>
            Star given: {2}
          </Rating>
          <TextArea
            className="reviewSize"
            id="review"
            name="review"
            type="text"
            onChange={this.handleChange}
            value={this.state.firstName}
            //label="Review"
            placeholder="Write Review Here"
          />

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
