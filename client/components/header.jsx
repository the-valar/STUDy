import React from 'react';
import { Navbar, NavItem, Nav, NavDropdown, Well, MenuItem, Button, FormGroup, FormControl, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

<<<<<<< HEAD
import { Alert } from 'react-alert';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import logo from '../logo.png';
// import ShowAlert from './ShowAlert.jsx';
=======
import Favorites from './Favorites.jsx';
>>>>>>> 5e3d36d5377565f36f7717491f729b6f35c77828

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: false,
      showSignup: false,
      showFavorites: false
    }

    this.showLogin = this.showLogin.bind(this);
    this.closeLogin = this.closeLogin.bind(this);

    this.showSignup = this.showSignup.bind(this);
    this.closeSignup = this.closeSignup.bind(this);

    this.showFavorites = this.showFavorites.bind(this);
    this.closeFavorites = this.closeFavorites.bind(this);
  }

  closeLogin() {
    this.props.handleSession();

    this.setState({
      showLogin: false
    });
  }

  showLogin() {
    this.setState({
      showLogin: true
    });
  }

  closeSignup() {
    this.props.handleSession();

    this.setState({
      showSignup: false
    });
  }

  showSignup() {
    this.setState({
      showSignup: true
    });
  }

  showFavorites() {
    this.setState({
      showFavorites: true
    })
  }

  closeFavorites() {
    this.setState({
      showFavorites: false
    })
  }

  componentWillMount() {
    axios.get('/session')
         .then(response => {
           if (response.data.username) {
             // check to see if response.data exists
             // sets state of parent component

             this.props.handleSession(response);
           }
         });
  }

  render() {
    const options = {
      position: 'top center',
      timeout: 3000,
      offset: '300px',
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
              {/* <a href='/'>Home</a> */}
              <a href='/'><img href='/' src={logo} class="nav-logo" /></a>
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
            {/* <a href='/'>Home</a> */}
              <a href='/'><img href='/' src={logo} class="nav-logo" /></a>
              {/* <img src={logo} class="nav-logo2" /> */}
              {/* <a href="">STUD(y)</a> */}
            
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