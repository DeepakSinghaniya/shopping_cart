import React from 'react';
import logo from '../../logo.svg';
import { Navbar, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import bootstrap from '../../assets/scss/bootstrap.scss';

const header = props => (
  <header>

    <Navbar cssModule={bootstrap} color="light" light expand="md">
      <Link className={bootstrap['navbar-brand']} to="/"><img src={logo} alt='site logo' title="Logo" width="50" />Shop</Link>
      <Nav cssModule={bootstrap} className="ml-auto" navbar>
        <NavItem>
          <Link className={bootstrap["nav-link"]} to="/">Shop</Link>
        </NavItem>
        <NavItem>
          <Link className={bootstrap["nav-link"]} to="/cart/">Cart</Link>
        </NavItem>
        <NavItem>
          <Link className={bootstrap["nav-link"]} to="/checkout/">Checkout</Link>
        </NavItem>
      </Nav>
    </Navbar>

  </header>
)

export default header;