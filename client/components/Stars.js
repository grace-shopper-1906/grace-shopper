import React from 'react'
import {Icon} from 'semantic-ui-react'

const Stars = props => {
  const numStars = props.starsInt
  let stars = []

  for (let i = 1; i <= 5; i++) {
    let currentStar = <Icon name="star" key={i} />
    if (i > numStars) {
      currentStar = <Icon name="star outline" key={i} />
    }
    stars.push(currentStar)
  }
  return stars
}

export default Stars
