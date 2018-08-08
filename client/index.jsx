import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Alert from 'react-s-alert';

import Header from './components/header.jsx';
import Search from './components/Search.jsx';
import Display from './components/Display.jsx';
import ReviewFeed from './components/ReviewFeed.jsx';
import HeartButton from './components/HeartButton.jsx'
import TestAds from './components/TestAds.jsx';
import Chat from './components/Chat.jsx'

import './s-alert-default.css';
import './style.css';
import {ButtonToolbar, Button} from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      selectedRoom: '',
      cafes: [],
      invitations: [],
      username: '',
      password: '',
      userId: '',
      loggedIn: false,
      showIndivCafe: false,
      showReviewFeed: false,
      showChat: false
    };

    this.handleYelp = this.handleYelp.bind(this);

    this.handleUser = this.handleUser.bind(this);
    this.handlePassword = this.handlePassword.bind(this);

    this.loginUser = this.loginUser.bind(this);
    this.registerUser = this.registerUser.bind(this);

    this.logout = this.logout.bind(this);
    this.handleSession = this.handleSession.bind(this);

    this.renderIndivCafe = this.renderIndivCafe.bind(this);
    this.getGroups = this.getGroups.bind(this);

    this.getUser = this.getUser.bind(this);
    this.showReviewFeed = this.showReviewFeed.bind(this);

    this.renderChat = this.renderChat.bind(this);
    this.getInvitation = this.getInvitation.bind(this);

    this.handleSelectedRoom = this.handleSelectedRoom.bind(this);
    this.acceptInvitation = this.acceptInvitation.bind(this);
    this.rejectInvitation = this.rejectInvitation.bind(this);
  }

  componentDidMount() {
      this.getUser()
    }

  /* ======================== */
  /* HANDLE/ RENDER FUNCTIONS */
  /* ======================== */

  handleYelp(data) {
    this.setState({ cafes: data });
  }

  handleUser(e) {
    this.setState({ username: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  loginUser() {
    this.setState({loggedIn: true, userId: this.state.username });
  }

  renderIndivCafe(bool) {
    this.setState({ showIndivCafe: bool });
  }

  renderChat() {
    this.setState({ showChat: !this.state.showChat });
  }

  /* ======================== */
  /* USER LOGIN FUNCTIONS     */
  /* ======================== */

  loginUser() {
    axios
      .post('/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then((response) => {
        this.setState({
          loggedIn: true,
          userId: response.data.id,
          password: '',
          membership: response.data.membership
        }, () => {this.getGroups()});
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
        this.forceUpdate();
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
        loggedIn: response.data.login,
        membership: response.data.membership
      });
    }
  }

  /* ======================== */
  /* MEMBERSHIP FUNCTIONS     */
  /* ======================== */

  async getUser(){
    let response = await axios.get('/current_user')
    console.log(response.data)
    this.setState({membership: response.data.membership})
  }

  /* ======================== */
  /* FEED FUNCTIONS           */
  /* ======================== */

  showReviewFeed() {
    this.setState({
      showReviewFeed: !this.state.showReviewFeed
    })
  }

  /* ======================== */
  /* CHAT FUNCTIONS           */
  /* ======================== */

  getGroups() {
    axios.get('/groups', { params: { user_id: this.state.userId}})
    .then((response) => this.setState({rooms: response.data}, () => {this.getInvitation()}))
    .catch((err) => console.log('Error getting groups', err))
  }

  getInvitation() {
    axios.get('/group-invitation', { params: { user_id: this.state.userId}})
    .then((response) => this.setState({invitations: response.data}))
    .catch((err) => console.log('Error getting groups', err)) 
  }

  acceptInvitation(chatgroups_id, id) {
    axios.post('/accept-invitation', {chatgroups_id: chatgroups_id, user_id: this.state.userId})
    .then(response =>  {this.rejectInvitation(id)})
    .catch(err => console.log('Error accepting invitation', err))
  }

  rejectInvitation(id) {
    axios.delete('/group-invitation', {params: {id: id, user_id: this.state.userId}})
    .then(response => {
      this.getInvitation()
      this.getGroups()
    })
    .catch(err => console.log('Error deleting invitation', err))
  }

  handleSelectedRoom(room) {
    this.setState({ selectedRoom: room })
  }

  render() {
    let defaultState =  
      <div>       
      <div className="parallax" />

      <div align="center">
        <Search
          handleYelp={this.handleYelp}
          renderIndivCafe={this.renderIndivCafe}
        />
        
      </div>
      {!!this.state.membership || <TestAds/>}

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

    let reviewFeed = <ReviewFeed showReviewFeed={this.showReviewFeed} currentUserId={this.state.userId}/>

    let ourHomePage = this.state.showReviewFeed ? reviewFeed : defaultState;
    return (
      <div>
        <div align="center">
        <Header
          username={this.state.username}
          password={this.state.password}
          userId={this.state.userId}
          membership={this.state.membership}
          loggedIn={this.state.loggedIn}
          handleUser={this.handleUser}
          handlePassword={this.handlePassword}
          loginUser={this.loginUser}
          registerUser={this.registerUser}
          logout={this.logout}
          handleSession={this.handleSession}
          getGroups={this.getGroups}
          getUser={this.getUser}
          showReviewFeed={this.showReviewFeed}
          rooms={this.state.rooms}
          handleSelectedRoom={this.handleSelectedRoom}
          invitations={this.state.invitations}
          acceptInvitation={this.acceptInvitation}
          rejectInvitation={this.rejectInvitation}
          selectedRoom={this.state.selectedRoom}
          renderChat={this.renderChat}
        />

        {ourHomePage}
      </div>
      <div align="right">
        {
          this.state.showChat &&
          <Chat username={this.state.username} userId={this.state.userId} rooms={this.state.rooms} selectedRoom={this.state.selectedRoom}/> 

        }
      </div>
    </div>
    );
  }
}

// 

ReactDOM.render(<App />, document.getElementById('app'));
