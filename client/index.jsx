import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Alert from 'react-s-alert';

import Header from './components/header.jsx';
import Search from './components/Search.jsx';
import Display from './components/Display.jsx';

import FlashcardMain from './components/FlashcardMain.jsx'
import Favorites from './components/Favorites.jsx';

import './s-alert-default.css';
import './style.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cafes: [],
      username: '',
      password: '',
      userId: '',
      loggedIn: false,
      showIndivCafe: false,
      showFavorites: false,
      showStudyChat: false
    };

    this.handleYelp = this.handleYelp.bind(this);

    this.handleUser = this.handleUser.bind(this);
    this.handlePassword = this.handlePassword.bind(this);

    this.loginUser = this.loginUser.bind(this);
    this.registerUser = this.registerUser.bind(this);

    this.logout = this.logout.bind(this);
    this.handleSession = this.handleSession.bind(this);

    this.handleYelp = this.handleYelp.bind(this);
    this.renderIndivCafe = this.renderIndivCafe.bind(this);
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
    axios
      .post('/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then((response) => {
        // response.data returns userId

        this.setState({
          loggedIn: true,
          userId: response.data
        });
      })
      .catch((err) => {
        console.error('Username or password is incorrect', err);

        Alert.error('Incorrect username or password', {
          position: 'bottom'
        });
      });
  }

  registerUser() {
    axios
      .post('/register', {
        username: this.state.username,
        password: this.state.password
      })
      .then((response) => {
        // response.data returns userId

        this.setState({
          loggedIn: true,
          userId: response.data
        });
      })
      .catch((err) => {
        console.error('Error registering', err);
      });
  }

  logout() {
    axios.get('/logout').then(() => {
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

  renderIndivCafe(bool) {
    this.setState({
      showIndivCafe: bool
    });
  }

  render() {
    return (
      <div align="center">
        <Header
          username={this.state.username}
          password={this.state.password}
          userId={this.state.userId}
          loggedIn={this.state.loggedIn}
          handleUser={this.handleUser}
          handlePassword={this.handlePassword}
          loginUser={this.loginUser}
          registerUser={this.registerUser}
          logout={this.logout}
          handleSession={this.handleSession}
        />

        <div className="parallax" />

        {this.state.showStudyChat ? 
          <FlashcardMain />
          : null
        }

        {
          this.state.showFavorites ?
          <Favorites />
          : null
        }

        <div align="center">
          <Search
            handleYelp={this.handleYelp}
            renderIndivCafe={this.renderIndivCafe}
          />
        </div>

        <div>
          <Display
            cafes={this.state.cafes}
            username={this.state.username}
            userId={this.state.userId}
            loggedIn={this.state.loggedIn}
            showIndivCafe={this.state.showIndivCafe}
            renderIndivCafe={this.renderIndivCafe}
          />
        </div>

        <Alert stack={{ limit: 1 }} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
