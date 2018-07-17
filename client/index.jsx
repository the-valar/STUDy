import React from 'react';
import ReactDOM from 'react-dom';

import Display from './components/Display.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <Display />
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'))