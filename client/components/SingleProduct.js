import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {getOneProduct} from '../store/oneProduct.js'

export class OneProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getOneProduct(this.props.match.params.id)
    this.setState(this.props.match.params)
  }

  render() {
    const main = (
      <div>
        <h1>Hello world</h1>
      </div>
    )
    return main
  }
}

const mapStateToProps = state => ({
  oneProduct: state.oneProduct
})

const mapDispatchToProps = dispatch => {
  return {
    getOneProduct: id => dispatch(getOneProduct(id))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OneProduct)
)
