import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header.jsx';
import Search from './components/Search.jsx';
import Display from './components/Display.jsx';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

import './style.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cafes: [],
      showIndivCafe: false
    };

    this.handleYelp = this.handleYelp.bind(this);
    this.renderIndivCafe = this.renderIndivCafe.bind(this);
  }

  handleYelp(data) {
    this.setState({
      cafes: data
    });
  }

  renderIndivCafe(bool) {
    this.setState({
      showIndivCafe: bool
    });
  }

  render() {
<<<<<<< HEAD
    return (
      <div align="center">
=======
    const options = {
      position: 'top center',
      timeout: 5000,
      offset: '100px',
      transition: 'scale'
    }
    return(
      <div align='center'>
>>>>>>> dev
        <Header />

        <div className="parallax" />

<<<<<<< HEAD
        <div align="center">
          <Search
            handleYelp={this.handleYelp}
            renderIndivCafe={this.renderIndivCafe}
          />
        </div>

        <div>
          <Display
            cafes={this.state.cafes}
            showIndivCafe={this.state.showIndivCafe}
            renderIndivCafe={this.renderIndivCafe}
          />
        </div>
=======
    

        <div align='center'>
          <Search handleYelp={this.handleYelp}/>
        </div>
          <div>
            <Display cafes={this.state.cafes} />
          </div>
>>>>>>> dev
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
