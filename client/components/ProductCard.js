import React from 'react'
import {Button, Card, Icon, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import Stars from './Stars'

const ProductCard = props => {
  const product = props.product

  const findReviewAvg = () => {
    // if (!product.reviews.length) {
    //   return 'No Reviews'
    // }
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
        </Card.Content>
      </Card>
    </Link>
  )
}

export default ProductCard
