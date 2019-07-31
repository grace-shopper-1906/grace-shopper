import {
  Responsive,
  Menu,
  Segment,
  Container,
  Button,
  Visibility,
  Header
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

export default class DesktopNav extends Component {
  state = {}

  hideFixedMenu = () => this.setState({fixed: false})
  showFixedMenu = () => this.setState({fixed: true})

  render() {
    const {children, handleClick, isLoggedIn, firstName} = this.props
    const {fixed} = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            textAlign="center"
            style={{minHeight: 100, padding: '1em 0em'}}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as={NavLink} exact to="/">
                  Home
                </Menu.Item>
                <Menu.Item as={NavLink} exact to="/products">
                  Products
                </Menu.Item>
                <Menu.Item as={NavLink} exact to="/cart/view">
                  Cart
                </Menu.Item>
                {isLoggedIn ? (
                  <Container>
                    <Header>{firstName}</Header>
                    <Menu.Item as={NavLink} exact to="/orders">
                      Orders
                    </Menu.Item>

                    <Menu.Item as={NavLink} exact to="/account">
                      Account
                    </Menu.Item>
                    <Button as={NavLink} exact to="#" onClick={handleClick}>
                      Log Out
                    </Button>
                  </Container>
                ) : (
                  <Menu.Item position="right">
                    <Button as={NavLink} exact to="/account">
                      Log in
                    </Button>
                    <Button
                      as={NavLink}
                      exact
                      to="/signup"
                      primary={fixed}
                      style={{marginLeft: '0.5em'}}
                    >
                      Sign Up
                    </Button>
                  </Menu.Item>
                )}
              </Container>
            </Menu>
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    )
  }
}

DesktopNav.propTypes = {
  children: PropTypes.node
}
