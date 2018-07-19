import React from 'react';
import { Navbar, NavItem, Nav, NavDropdown, Well, MenuItem, Button, FormGroup, FormControl, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

import { Alert } from 'react-alert';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// import ShowAlert from './ShowAlert.jsx';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showLogin: false,
      showSignup: false,
      loggedIn: false
    }

    this.handleUser = this.handleUser.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    
    this.loginUser = this.loginUser.bind(this);
    this.registerUser = this.registerUser.bind(this);

    this.showLogin = this.showLogin.bind(this);
    this.closeLogin = this.closeLogin.bind(this);

    this.showSignup = this.showSignup.bind(this);
    this.closeSignup = this.closeSignup.bind(this);
  }

  handleUser(username) {
    this.setState({
      username: username.target.value
    });
  }

  handlePassword(password) {
    this.setState({
      password: password.target.value
    });
  }

  closeLogin() {
    this.setState({
      username: '',
      password: '',
      showLogin: false
    });
  }

  showLogin() {
    this.setState({
      showLogin: true
    });
  }

  closeSignup() {
    this.setState({
      username: '',
      password: '',
      showSignup: false
    });
  }

  showSignup() {
    this.setState({
      showSignup: true
    });
  }

  loginUser() {
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password
    })
      .then(response => {
        console.log('Processing login', response.data);

        this.setState({
          loggedIn: true
        });
      })
      .catch(err => {
        console.error('Username or password is incorrect', err);
      });

  }

  registerUser() {
    axios.post('/register', {
      username: this.state.username,
      password: this.state.password
    })
      .then(response => {
        console.log('Processing register', response.data);

        this.setState({
          loggedIn: true
        });

      })
      .catch(err => {
        console.error('Error registering', err);
      });
  }

  logout() {
    axios.get('/logout')
         .then( () => {
            this.setState({
              username: '',
              password: '',
              loggedIn: false
            });
         });
  }

  componentWillMount() {
    axios.get('/session')
         .then(response => {
           if (response.data.username) {
             this.setState({
               username: response.data.username,
               loggedIn: response.data.login
             });
           }
         });
  }

  render() {
    const options = {
      position: 'top center',
      timeout: 3000,
      offset: '400px',
      transition: 'scale'
    }

    let username = this.state.username.length;
    let password = this.state.password.length;

    if (this.state.loggedIn) {
    return (
      <div>
        <Navbar inverse fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href='/'>STUD(y)</a>
            </Navbar.Brand>
          </Navbar.Header>

          <Nav pullRight>
            <NavDropdown title='Profile' id="basic-nav-dropdown">
              <MenuItem>Signed in as {this.state.username}</MenuItem>
              <MenuItem>Favorites</MenuItem>
              <MenuItem divider />
              <MenuItem onClick={ ()=> { return this.logout() }} >Logout</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>

      </div>
    )
    } else {

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
            <NavItem show='false' onClick={this.showLogin}> Login </NavItem>
            <NavItem onClick={this.showSignup}> Register </NavItem>
          </Nav>
          
            <Modal show={this.state.showLogin} onHide={this.closeLogin}>
              <Modal.Body>
                <FormGroup>
                  <FormControl type="text" placeholder="username" value={this.state.username} onChange={(e) => {this.handleUser(e)}} />
                  <FormControl type="password" placeholder="password" value={this.state.password} onChange={(e) => {this.handlePassword(e)}} />
                </FormGroup>
                
                {/* <Button type="submit" value="Submit" onClick={this.loginUser}> Log In </Button> */}

                <AlertProvider template={AlertTemplate} {...options}>
                  <Alert>
                    {alert => (
                      <Button type="submit" value="Submit" onClick={ () => { (!username || !password) ? alert.show('Oh snap! We need a username and a password!') : this.loginUser() } }> Log In </Button>
                    )}
                  </Alert>
                </AlertProvider>


              </Modal.Body>
            </Modal>

            <Modal show={this.state.showSignup} onHide={this.closeSignup}>
              <Modal.Body>
                <FormGroup>
                  <FormControl type="text" placeholder="username" value={this.state.username} onChange={(e) => {this.handleUser(e)}} />
                  <FormControl type="password" placeholder="password" value={this.state.password} onChange={(e) => {this.handlePassword(e)}} />
                </FormGroup>
                
                <Button type="submit" value="Submit" onClick={this.registerUser}> Register </Button>
              </Modal.Body>
            </Modal>

          </Navbar.Collapse>

        </Navbar>

      </div>
    )
  }
  }

}

export default Header;