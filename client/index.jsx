import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from './components/header.jsx';
import Search from './components/Search.jsx';
import Display from './components/Display.jsx';

import './style.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cafes: [],
      username: '',
      password: '',
      userId: '',
      loggedIn: false
    }

    this.handleYelp = this.handleYelp.bind(this);

    this.handleUser = this.handleUser.bind(this);
    this.handlePassword = this.handlePassword.bind(this);

    this.loginUser = this.loginUser.bind(this);
    this.registerUser = this.registerUser.bind(this);

    this.logout = this.logout.bind(this);
    this.handleSession = this.handleSession.bind(this);
  }

  handleYelp(data) {
    this.setState({
      cafes: data
    });
  }

  handleUser(e) {
    this.setState({
      username: e.target.value
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  loginUser() {
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password
    })
      .then(response => {
        // response.data returns userId

        this.setState({
          loggedIn: true,
          userId: response.data
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
        // response.data returns userId

        this.setState({
          loggedIn: true,
          userId: response.data
        });

      })
      .catch(err => {
        console.error('Error registering', err);
      });
  }

  logout() {
    axios.get('/logout')
      .then(() => {
        this.setState({
          username: '',
          userId: '',
          loggedIn: false
        });
      });
  }

  handleSession(response) {
    if (!response) {
      this.setState({
        username: '',
        password: ''
      });
    } else {
      this.setState({
        username: response.data.username,
        userId: response.data.userId,
        loggedIn: response.data.login
      });
    }
  }

  render() {
    return(
      <div align='center'>
        <Header username={this.state.username}
                userId={this.state.userId}
                loggedIn={this.state.loggedIn}
                handleUser={this.handleUser}
                handlePassword={this.handlePassword}
                loginUser={this.loginUser}
                registerUser={this.registerUser}
                logout={this.logout}
                handleSession={this.handleSession} />

        <div className='parallax'></div>

        <div align='center'>
          <Search handleYelp={this.handleYelp} />
        </div>
          <div>
            <Display cafes={this.state.cafes}
                     username={this.state.username}
                     userId={this.state.userId}
                     loggedIn={this.state.loggedIn} />
          </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
