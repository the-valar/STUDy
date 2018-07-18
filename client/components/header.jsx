import React from 'react';
import { Navbar, NavItem, Nav, NavDropdown, Well, MenuItem, Button, FormGroup, FormControl, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showLogin: false,
      showSignup: false
    }

    this.handleUser = this.handleUser.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.loginUser = this.loginUser.bind(this);

    this.showLogin = this.showLogin.bind(this);
    this.closeLogin = this.closeLogin.bind(this);

    this.showSignup = this.showSignup.bind(this);
    this.closeSignup = this.closeSignup.bind(this);
  }

  componentDidMount() {
    this.loginUser()
  }

  loginUser() {
    axios.get('/login', {
      username: this.state.username,
      password: this.state.password
    })
      .then((response) => {

      })
  }

  handleUser(username) {
    this.setState({
      username: username.target.value
    })

  }

  handlePassword(password) {
    this.setState({
      password: password.target.value
    })
  }

  closeLogin() {
    this.setState({
      showLogin: false
    })
  }

  showLogin() {
    this.setState({
      showLogin: true
    })
  }

  closeSignup() {
    this.setState({
      showSignup: false
    })
  }

  showSignup() {
    this.setState({
      showSignup: true
    })
  }

  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
          
          <Navbar.Header>
            <Navbar.Brand>
              <a href="">STUD(y)</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          
          <Navbar.Collapse>
          
          <Nav pullRight>
            <NavItem onClick={this.showLogin}> Login </NavItem>
            <NavItem onClick={this.showSignup}> Register </NavItem>
          </Nav>
          
            <Modal show={this.state.showLogin} onHide={this.closeLogin}>
              <Modal.Body>
                <FormGroup>
                  <FormControl type="text" placeholder="username" value={this.state.username} onChange={(e) => {this.handleUser(e)}} />
                  <FormControl type="password" placeholder="password" value={this.state.password} onChange={(e) => {this.handlePassword(e)}} />
                </FormGroup>
                
                <Button type="submit" value="Submit" onClick={this.handleClick}>Log In</Button>
              </Modal.Body>
            </Modal>

            <Modal show={this.state.showSignup} onHide={this.closeSignup}>
              <Modal.Body>
                <FormGroup>
                  <FormControl type="text" placeholder="username" value={this.state.username} onChange={(e) => {this.handleUser(e)}} />
                  <FormControl type="password" placeholder="password" value={this.state.password} onChange={(e) => {this.handlePassword(e)}} />
                </FormGroup>
                
                <Button type="submit" value="Submit" onClick={this.handleClick}> Register </Button>
              </Modal.Body>
            </Modal>

          </Navbar.Collapse>

        </Navbar>
      </div>
    )
  }

}

export default Header;