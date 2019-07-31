import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'

export class OneProduct extends Component {
  render() {
    const main = (
      <div>
        <h1>Hello world</h1>
      </div>
    )
    return main
  }
}

export default withRouter(connect(null)(OneProduct))
