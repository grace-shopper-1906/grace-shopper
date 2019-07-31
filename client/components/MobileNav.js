import {
  Responsive,
  Sidebar,
  Menu,
  Segment,
  Container,
  Button,
  Icon,
  Header
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

export default class MobileNav extends Component {
  state = {}

  handleSidebarHide = () => this.setState({sidebarOpened: false})

  handleToggle = () => this.setState({sidebarOpened: true})

  render() {
    const {children, handleClick, isLoggedIn, firstName} = this.props
    const {sidebarOpened} = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as={NavLink} exact to="/" onClick={this.handleSidebarHide}>
            Home
          </Menu.Item>
          <Menu.Item
            as={NavLink}
            exact
            to="/products"
            onClick={this.handleSidebarHide}
          >
            Products
          </Menu.Item>
        </Sidebar>
        {isLoggedIn ? (
          <Sidebar
            as={Menu}
            animation="push"
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item
              as={NavLink}
              exact
              to="/"
              onClick={this.handleSidebarHide}
            >
              Home
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              exact
              to="/products"
              onClick={this.handleSidebarHide}
            >
              Products
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              exact
              to="/orders"
              onClick={this.handleSidebarHide}
            >
              Orders
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              exact
              to="/account"
              onClick={this.handleSidebarHide}
            >
              Account
            </Menu.Item>
            <Button as={NavLink} exact to="#" onClick={handleClick}>
              Log Out
            </Button>
          </Sidebar>
        ) : (
          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              textAlign="center"
              style={{minHeight: 350, padding: '1em 0em'}}
              vertical
            >
              <Container>
                <Menu pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  <Menu.Item position="right">
                    <Button as={NavLink} exact to="/login">
                      Log in
                    </Button>
                    <Button
                      as={NavLink}
                      exact
                      to="/signup"
                      style={{marginLeft: '0.5em'}}
                    >
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>
          </Sidebar.Pusher>
        )}
      </Responsive>
    )
  }
}

MobileNav.propTypes = {
  children: PropTypes.node
}
