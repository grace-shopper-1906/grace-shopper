import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {DesktopNav, MobileNav} from './index'
import {Container} from 'semantic-ui-react'

const Navbar = ({children, handleClick, isLoggedIn, firstName}) => (
  <Container>
    <DesktopNav>{(children, handleClick, isLoggedIn, firstName)}</DesktopNav>
    <MobileNav>{(children, handleClick, isLoggedIn, firstName)}</MobileNav>
  </Container>
)

Navbar.propTypes = {
  children: PropTypes.node
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    firstName: state.user.firstName
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
