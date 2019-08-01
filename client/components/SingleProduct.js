import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {getOneProduct} from '../store/oneProduct.js'
import {
  Container,
  Button,
  Rating,
  Divider,
  Grid,
  Image,
  Segment
} from 'semantic-ui-react'

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
        <Segment>
          <Grid columns={2} relaxed="very">
            <Grid.Column>
              <h1>Title {p.title}</h1>
              <div className="fontBold">Price $ {p.price / 100.0}</div>
              <div>
                {p.inventoryQuantity} items left in stock. Product is
                {p.isAvailable
                  ? ' available to order.'
                  : ' not available at this time.'}
              </div>
              <br />
              <div>Item Description: {p.description}</div>
              <br />
              <div className="fontItalics">
                This product belongs to the categories:{' '}
              </div>
              {p.categories && p.categories.length ? (
                <ul>
                  {p.categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                  ))}
                </ul>
              ) : (
                'This product belongs to no categories.'
              )}
            </Grid.Column>
            <Grid.Column>
              <Image src={p.picture} />
            </Grid.Column>
          </Grid>
        </Segment>

        <h1>Reviews: </h1>
        {p.reviews && p.reviews.length ? (
          <div>
            {p.reviews.map(review => (
              <div key={review.id}>
                <Rating icon="star" defaultRating={review.star} maxRating={5}>
                  Star given: {review.star}
                </Rating>
                <br />
                <div>{review.text}</div>
                <br />
              </div>
            ))}
          </div>
        ) : (
          'This product has no reviews.'
        )}
        <Button type="Submit" onClick={this.backHomeButton}>
          Back to Home
        </Button>
        <br />
        <br />
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
