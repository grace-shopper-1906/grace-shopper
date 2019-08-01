import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Form} from 'semantic-ui-react'

export class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.backHomeButton = this.backHomeButton.bind(this)
  }

  // componentDidMount() {
  //   this.props.fetchOneProduct(this.props.match.params.id)
  //   this.setState(this.props.match.params)
  // }

  backHomeButton(event) {
    event.preventDefault()
    console.log(this.props.history.push('/'))
  }

  render() {
    const main = (
      <div>
        <h1>I work yaay</h1>
      </div>
    )
    return main
  }
}

//   const mapStateToProps = state => ({
//     oneProduct: state.oneProduct
//   })

//   const mapDispatchToProps = dispatch => {
//     return {
//       fetchOneProduct: id => dispatch(getOneProduct(id))
//     }
//   }

export default withRouter(connect(null)(CheckoutForm))
