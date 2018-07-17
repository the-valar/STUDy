import React from 'react';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem, Button, FormGroup, FormControl, Form } from 'react-bootstrap';

const Header = (props) => {
  return(
    <div>
      <Navbar inverse fixedTop>
        
        <Navbar.Header>
          <Navbar.Brand>
            <a href="">THE VALAR</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        
        <Navbar.Collapse>

          <Navbar.Form pullRight>
            <FormGroup>
              <FormControl type="text" placeholder="username" />
              <FormControl type="text" placeholder="password" />
            </FormGroup>
            <Button type="submit" >Log In</Button>
          </Navbar.Form>
          
          <Nav pullRight>
            {/* <NavItem eventKey={1} href="#">
              EXPLORE
            </NavItem>
            <NavItem eventKey={2} href="#">
              TOP 
            </NavItem> */}
          </Nav>

        </Navbar.Collapse>

      </Navbar>
    </div>
  )
}

export default Header;