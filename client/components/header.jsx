import React from 'react';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem, Button, FormGroup, FormControl, Form } from 'react-bootstrap';
import axios from 'axios';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }

    this.handleUser = this.handleUser.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.loginUser = this.loginUser.bind(this);
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

          <Navbar.Form pullRight>
            <FormGroup>
              <FormControl type="text" placeholder="username" value={this.state.username} onChange={(e) => {this.handleUser(e)}} />
              <FormControl type="password" placeholder="password" value={this.state.password} onChange={(e) => {this.handlePassword(e)}} />
            </FormGroup>
            <Button type="submit" value="Submit" onClick={this.handleClick}>Log In</Button>
          </Navbar.Form>

          </Navbar.Collapse>

        </Navbar>
      </div>
    )
  }

}

export default Header;