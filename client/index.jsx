import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header.jsx';
import Search from './components/Search.jsx';
import Display from './components/Display.jsx';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import logo from './logo.png';


import './style.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cafes: []
    }

    this.handleYelp = this.handleYelp.bind(this);
  }

  handleYelp(data) {
    this.setState({
      cafes: data
    });
  }

  render() {
    const options = {
      position: 'top center',
      timeout: 5000,
      offset: '100px',
      transition: 'scale'
    }
    return(
      <div align='center'>
        <Header />

        <div className='parallax'>
          {/* <h1>STUD(y)</h1> */}
          {/* <img className='nav-logo2' src={logo} alt=""/> */}
        </div>

    

        <div align='center'>
          <Search handleYelp={this.handleYelp}/>
        </div>
          <div>
            <Display cafes={this.state.cafes} />
          </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
