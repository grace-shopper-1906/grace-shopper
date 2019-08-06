import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {updateReviewThunk} from '../store/review'
import {
  Container,
  Form,
  TextArea,
  Rating,
  Input,
  Button
} from 'semantic-ui-react'

//const id = 3 ///really bad change this testing only

export class ReviewForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      star: 1,
      review: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRate = this.handleRate.bind(this)
  }

  handleRate(event) {
    console.log(event.target)
    //this.setState({star: 3}) //fix this later
    //this.setState({star: 1, review: ''})
  }

  //componentDidMount() {
  //this.setState(this.props.match.params)
  //}

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    let productId = this.props.match.params.id
    this.props.review(productId, this.state)
    this.props.history.push(`/products/${productId}`)
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
            value={this.state.review}
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
    review: (id, thereview) => dispatch(updateReviewThunk(id, thereview))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
)
