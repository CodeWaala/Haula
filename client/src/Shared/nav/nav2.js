import React from "react";
import { Navbar, Nav, NavItem,} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './nav.css';//
import navlogo from '../main_images/logo_blue.png';

<img src={navlogo}/>

export const MyNavbar = () =>{
    return(
<Navbar collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
          <NavLink exact activeClassName='active' to='/'>
            <img className="navlogo" src={navlogo}/>
          </NavLink>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav pullRight>
      <NavItem eventKey={1} >
          <NavLink activeClassName='active' to='/SignUp' className='signButton'>
            Sign up
          </NavLink>
      </NavItem>
      <NavItem eventKey={2} href="#">
      <NavLink activeClassName='active' to='/Login' className='loginButton'>
            Login
          </NavLink>
      </NavItem>
      <NavItem eventKey={3} href="#">
          <NavLink activeClassName='active' to='/Help' className='helpButton'>
            Help
          </NavLink>
      </NavItem>
    </Nav>
  </Navbar.Collapse>
</Navbar>

)}
