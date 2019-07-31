import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {getOneProduct} from '../store/oneProduct.js'
import {Container, Button, Rating} from 'semantic-ui-react'

export class JustOneProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.backHomeButton = this.backHomeButton.bind(this)
  }

  componentDidMount() {
    this.props.fetchOneProduct(this.props.match.params.id)
    this.setState(this.props.match.params)
  }

  backHomeButton(event) {
    event.preventDefault()
    console.log(this.props.history.push('/'))
  }

  render() {
    let p = this.props.oneProduct
    const main = (
      <Container>
        <Button type="Submit" onClick={this.backHomeButton}>
          Back to Home
        </Button>
        <h1>Title {p.title}</h1>
        <p>Price {p.price}</p>
        <p>How many left in stock {p.inventoryQuantity}</p>
        <div>
          Am I available?
          {p.isAvailable ? (
            <div>Yes!</div>
          ) : (
            <div>Sorry, not available at this time</div>
          )}
        </div>
        <div>Description {p.description}</div>
        <img src={p.picture} />
        <div>This product belongs to the categories: </div>
        {p.categories && p.categories.length ? (
          <div>
            {p.categories.map(category => (
              <div key={category.id}>{category.name}</div>
            ))}
          </div>
        ) : (
          'This product belongs to no categories.'
        )}
        <h1>Reviews: </h1>
        {p.reviews && p.reviews.length ? (
          <div>
            {p.reviews.map(review => (
              <div key={review.id}>
                <Rating icon="star" defaultRating={review.star} maxRating={5}>
                  Star given: {review.star}
                </Rating>
                <div>Review: {review.text}</div>
              </div>
            ))}
          </div>
        ) : (
          'This product has no reviews.'
        )}
      </Container>
    )
    return this.state.oneProduct ? 'Just a sec...' : main
  }
}

const mapStateToProps = state => ({
  oneProduct: state.oneProduct
})

const mapDispatchToProps = dispatch => {
  return {
    fetchOneProduct: id => dispatch(getOneProduct(id))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(JustOneProduct)
)
