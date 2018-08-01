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

import {Tabs, Tab} from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cafes: [],
      username: '',
      password: '',
      userId: '',
      creditCard: '',
      loggedIn: false,
      showIndivCafe: false,
      showFavorites: false,
      showStudyCards: false,
      flashcardDeckNames: []
    };

    this.handleYelp = this.handleYelp.bind(this);

    this.handleUser = this.handleUser.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleCreditCard = this.handleCreditCard.bind(this);

    this.loginUser = this.loginUser.bind(this);
    this.registerUser = this.registerUser.bind(this);

    this.logout = this.logout.bind(this);
    this.handleSession = this.handleSession.bind(this);

    this.handleYelp = this.handleYelp.bind(this);
    this.renderIndivCafe = this.renderIndivCafe.bind(this);

    this.showStudyCards = this.showStudyCards.bind(this);
    this.showMain = this.showMain.bind(this);

    this.fetchDeckNames = this.fetchDeckNames.bind(this);
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
  
  handleCreditCard(e) {
    this.setState ({
      creditCard: e.target.value
    })
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
        }, () => this.fetchDeckNames());
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
        password: this.state.password,
        creditCard: this.state.creditCard
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

  showStudyCards() {
    this.setState({showStudyCards: true})
  }

  showMain() {
    this.setState({showStudyCards: false})
  }

  fetchDeckNames() {
    axios.get('/flashcardDecks', params = {user_id: this.state.userId})
         .then((response) => this.setState({flashcardDeckNames: response.data}))
         .catch((err) => console.error('someone went wrong fetching the deck names: ', err))
  }

  render() {
    return (
      <div align="center">
        <Header
          username={this.state.username}
          password={this.state.password}
          creditCard={this.state.creditCard}
          userId={this.state.userId}
          loggedIn={this.state.loggedIn}
          handleUser={this.handleUser}
          handlePassword={this.handlePassword}
          handleCreditCard={this.handleCreditCard}
          loginUser={this.loginUser}
          registerUser={this.registerUser}
          logout={this.logout}
          handleSession={this.handleSession}
          showMain={this.showMain}
          showStudyCards={this.showStudyCards}
        />

        <div className="parallax" />

        {
          this.state.showStudyCards ? 
          <FlashcardMain user_id = {this.state.userId} />
          : 
          <div>
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
          </div>
        }


        <Alert stack={{ limit: 1 }} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
