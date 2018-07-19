import React from 'react';
import ReactDOM from 'react-dom';

import { Parallax } from 'react-spring';
import Header from './components/header.jsx';
import Search from './components/Search.jsx';
import Display from './components/Display.jsx';
import { Navbar, NavItem, Nav } from 'react-bootstrap';


const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
const Pink = ({ children }) => <span style={{ color: '#FF6AC1' }}>{children}</span>
const Yellow = ({ children }) => <span style={{ color: '#EFF59B' }}>{children}</span>
const Lightblue = ({ children }) => <span style={{ color: '#9AEDFE' }}>{children}</span>
const Green = ({ children }) => <span style={{ color: '#57EE89' }}>{children}</span>
const Blue = ({ children }) => <span style={{ color: '#57C7FF' }}>{children}</span>
const Gray = ({ children }) => <span style={{ color: '#909090' }}>{children}</span>

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
    return(
      <div align='center'>
        <Header />
          <Search handleYelp={this.handleYelp} />

          <div>
            <Display cafes={this.state.cafes} />
          </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
