import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {reviewThunk} from '../store/review.js'
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

    this.state = {
      stars: 1,
      review: this.props.review
    }

    this.backHomeButton = this.backHomeButton.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRate = this.handleRate.bind(this)
  }

  handleRate(event) {
    console.log(event.target)
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
    this.props.rev(this.state)
  }

  render() {
    const main = (
      <Container>
        <h1>Review:</h1>
        <Form onSubmit={this.handleSubmit}>
          <Rating
            icon="star"
            defaultRating={1}
            maxRating={5}
            onRate={this.handleRate}
          >
            Star given: {1}
          </Rating>
          <TextArea
            className="reviewSize"
            id="review"
            name="review"
            type="text"
            onChange={this.handleChange}
            value={this.state.firstName}
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
  user: state.user,
  review: state.review
})

const mapDispatchToProps = dispatch => {
  return {
    rev: thereview => dispatch(reviewThunk(thereview))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
)
