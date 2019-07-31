import React from 'react'
import {Icon} from 'semantic-ui-react'

const Stars = props => {
  const numStars = props.starsInt

  for (let i = 0; i <= numStars; i++) {
    return <Icon name="star" />
  }
  if (numStars < 5) {
    for (let j = numStars; j <= 5; j++) {
      return <Icon name="star-outline" />
    }
  }
}

export default Stars
