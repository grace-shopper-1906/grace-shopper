import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {getOneProduct} from '../store/oneProduct.js'

export class JustOneProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchOneProduct(this.props.match.params.id)
    this.setState(this.props.match.params)
    //this.setState(this.props.fetchOneProduct(this.props.match.params.id))
  }

  render() {
    //console.log(this.props.oneProduct)
    console.log(this.props.oneProduct)
    let p = this.props.oneProduct
    if (p.categories) {
      //console.log(p.categories[0].name)
      p.categories.map(category => console.log(category.name))
    }
    if (p.reviews) {
      p.reviews.map(review => console.log(review.star + ' ' + review.text))
    }
    const main = (
      <div>
        <h1>Will be formatted in a minute chill</h1>
        <h1>Title {p.title}</h1>
        <h1>Price {p.price}</h1>
        <h1>How many left in stock {p.inventoryQuantity}</h1>
        <h1>
          Am I available?
          {p.isAvailable ? (
            <p>Yes!</p>
          ) : (
            <p>Sorry, not available at this time</p>
          )}
        </h1>
        <h1>Description {p.description}</h1>
        <img src={p.picture} />
        <h1>This product belongs to the categories: </h1>
        {p.categories ? (
          <h1>
            {p.categories.map(category => (
              <div key={category.id}>{category.name}</div>
            ))}
          </h1>
        ) : (
          'This product belongs to no categories.'
        )}
        <h1>This product belongs to the categories: </h1>
        {p.reviews ? (
          <h1>
            {p.reviews.map(review => (
              <div key={review.id}>
                <p>Star given: {review.star}</p>
                <p>Review: {review.text}</p>
              </div>
            ))}
          </h1>
        ) : (
          'This product belongs to no categories.'
        )}
      </div>
    )
    //return this.props.oneProduct ? 'Just a sec...' : main
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
