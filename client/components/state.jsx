import React from 'react';
import axios from 'axios';

class State extends React.Components {
  constructor(props){
    super(props)

    this.state = {
      parksTrails: []
    }
    
    this.getParksTrailsByState = this.getParksTrailsByState.bind(this)
  }

  // sends axios.get request to db routes with clicked state param
  // TODO: ERIC needs state param to be passed onClick from index.jsx
  getParksTrailsByState = (state) => {
    axios.get('state', {
      state: state
    })
    then(res => {
      this.setState({
        parksTrails: res
      })
    })
  }
  
  // assuming parks & trails comes back ordered by rating
  // renders 1st in parksTrails array
  render() {
    return(
      <div>
        <div id='topState'>{this.state.parksTrails[0]}</div>
      </div>
    )
  }
}

exports default State;