import React from 'react';
import logo from '../../logo.svg';
import { Navbar, Nav, NavItem } from 'reactstrap';
import CartCount from '../../containers/CartCount/CartCount';
import { Link } from 'react-router-dom';

const header = props => (
  <header>
    <Navbar color="light" light expand="md">
      <Link className='navbar-brand' to="/"><img src={logo} alt='site logo' title="Logo" width="50" />Shop</Link>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link className="nav-link" to="/">Shop</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/cart/">Cart <CartCount /> </Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/checkout/">Checkout</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/login/">Login</Link>
        </NavItem>
      </Nav>
    </Navbar>

  </header>
)

export default header;