import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header.jsx';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <Header />
        <Search />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))