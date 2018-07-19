import React from 'react';
import ReactDOM from 'react-dom';

import { Parallax } from 'react-spring';
import Header from './components/header.jsx';
import Search from './components/Search.jsx';
import Display from './components/Display.jsx';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
// import { Alert } from 'react-alert';
// import { Provider as AlertProvider } from 'react-alert';
// import AlertTemplate from 'react-alert-template-basic';

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
    const options = {
      position: 'top center',
      timeout: 5000,
      offset: '100px',
      transition: 'scale'
    }
    return(
      <div>
        <Header />

        {/* <Parallax ref={ref => (this.parallax = ref)} pages={5}>
          <Parallax.Layer offset={0} speed={1} style={{ opacity: 0.1 }} />

          <Parallax.Layer offset={0} speed={0} factor={5} style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }} />

          <Parallax.Layer offset={3.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
            <img src={url('satellite4')} style={{ width: '15%', marginLeft: '70%' }} />
          </Parallax.Layer>

          <Parallax.Layer offset={3} speed={0.8} style={{ opacity: 0.1 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
          </Parallax.Layer>

          <Parallax.Layer offset={0.5} speed={0.5} style={{ opacity: 0.1 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
          </Parallax.Layer>

          <Parallax.Layer offset={0.2} speed={0.2} style={{ opacity: 0.2 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
          </Parallax.Layer>

          <Parallax.Layer offset={3.6} speed={-0.1} style={{ opacity: 0.4 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
          </Parallax.Layer>

          <Parallax.Layer offset={3.6} speed={0.4} style={{ opacity: 0.6 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
          </Parallax.Layer>

          <Parallax.Layer offset={3.5} speed={-0.4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <img src={url('earth')} style={{ width: '60%' }} />
          </Parallax.Layer>

          <Parallax.Layer
            offset={0}
            speed={-0}>

            <div align='center'>
              <Search handleYelp={this.handleYelp} />
            </div>
            
          </Parallax.Layer>

          <Parallax.Layer offset={1} speed={0}>

            <div>
              <Display cafes={this.state.cafes} />
            </div>

          </Parallax.Layer>
        </Parallax> */}

    

        <div align='center'>
          <Search handleYelp={this.handleYelp} />

          <div>
            <Display cafes={this.state.cafes} />
          </div>
          
          {/* <AlertProvider template={AlertTemplate} {...options}>
            <Alert>
              {alert => (
                <button onClick={() => {alert.show('Oh snap! Try Again!')}}>
                  Show Alert
                </button>
              )}
            </Alert>
          </AlertProvider> */}

        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
