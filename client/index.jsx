import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <Header />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))