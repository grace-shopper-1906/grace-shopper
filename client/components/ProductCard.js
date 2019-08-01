import React from 'react'
import {Button, Card, Icon, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import Stars from './Stars'
import AddToCart from './AddToCart'

const ProductCard = props => {
  const product = props.product

  const findReviewAvg = () => {
    let total = 0
    product.reviews.map(review => {
      total += review.star
    })
    const avg = Math.floor(total / product.reviews.length)
    return avg
  }

  return (
    <Link to={`/products/${product.id}`} key={product.id}>
      <Card
        className="centered"
        raised
        key={product.id}
        style={{margin: '1rem'}}
      >
        <Image centered size="medium" src={product.picture} />
        <Card.Content>
          <Card.Header>{product.title}</Card.Header>
          ${product.price / 100}
          <br />
          {product.reviews.length !== 0 ? (
            <Stars starsInt={findReviewAvg()} />
          ) : (
            'No Reviews'
          )}
          <br />
          <AddToCart product={product} />
        </Card.Content>
      </Card>
    </Link>
  )
}

export default ProductCard
