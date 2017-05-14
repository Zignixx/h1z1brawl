import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Dropdown } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import logo from '../../static/logo.png'
import './Header.css'

class Header extends Component {

  render() {
    const { user } = this.props
    return (
      <Navbar fixedTop className="Navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <img src={logo} className="Navbar__Logo" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer activeClassName="" to="/jackpot">
              <NavItem>Jackpot</NavItem>
            </LinkContainer>
            <LinkContainer activeClassName="" to="/coinflip">
              <NavItem>Coinflip</NavItem>
            </LinkContainer>
            <LinkContainer activeClassName="" to="/leaderboards">
              <NavItem>Leaderboards</NavItem>
            </LinkContainer>
            <NavDropdown title="Other" id="nav-dropdown">
              <LinkContainer activeClassName="" to="/giveaway">
                <MenuItem>
                  <FontAwesome name="gift" />
                  Giveaway
                </MenuItem>
              </LinkContainer>
              <LinkContainer activeClassName="" to="/faq">
                <MenuItem>
                  <FontAwesome name="question-circle-o" />
                  FAQ
                </MenuItem>
              </LinkContainer>
                <MenuItem href="http://support.h1z1brawl.com" target="_blank">
                  <FontAwesome name="envelope-o" />
                  Support
                </MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <Dropdown className="Navbar__Dropdown" id="image-dropdown">
              <Dropdown.Toggle noCaret>
                { user ? (
                  <img src={user.image} alt="user" />
                ) : (
                  <FontAwesome name="user" />
                ) }
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem>
                  <FontAwesome name="cog" />
                  Settings
                </MenuItem>
                <MenuItem>
                  <FontAwesome name="history" />
                  History
                </MenuItem>
                <MenuItem>
                  <FontAwesome name="briefcase" />
                  Inventory
                </MenuItem>
                <MenuItem>
                  <FontAwesome name="sign-out" />
                  Logout
                </MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

}

export default Header
