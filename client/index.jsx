import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header.jsx';
import Search from './components/Search.jsx';
import Display from './components/Display.jsx';
import { Navbar, NavItem, Nav } from 'react-bootstrap';


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
      <div>
        <Header />
        <Search handleYelp={this.handleYelp} />

        <br></br>
        
        <div>
          <Display cafes={this.state.cafes} />
        </div>
        
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))