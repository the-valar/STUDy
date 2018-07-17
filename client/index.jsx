import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header.jsx';
import Search from './components/Search.jsx';

import Header from './components/header.jsx';
import Display from './components/Display.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <Header />
        <Search />
        
        <div>
          <Display />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))