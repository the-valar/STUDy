import React from 'react';
import axios from 'axios';

class Search extends React.Components {
  constructor(props){
    super(props)

    this.state = {
      location: '',
      coffee: '',
      atmosphere: '',
      comfort: '',
      food: ''
    }
    
    this.saveLocation = this.saveLocation.bind(this)
    this.saveCoffee = this.saveCoffee.bind(this)
    this.saveAtmosphere = this.saveAtmosphere.bind(this)
    this.saveComfort = this.saveComfort.bind(this)
    this.saveFood = this.saveFood.bind(this)
    this.search = this.search.bind(this)
  }

  saveLocation(e){
    e.preventDefault();
    this.setState({
      location: e.target.value
    })
  }

  saveCoffee(e){
    e.preventDefault();
    this.setState({
      saveCoffee: e.target.value
    })
  }

  saveAtmosphere(e){
    e.preventDefault();
    this.setState({
      saveAtmosphere: e.target.value
    })
  }

  saveComfort(e){
    e.preventDefault();
    this.setState({
      saveComfort: e.target.value
    })
  }

  saveFood(e){
    e.preventDefault();
    this.setState({
      saveFood: e.target.value
    })
  }

  search(){
    axios.search('/search', {
      location: this.state.location,
      coffee: this.state.coffee,
      atmosphere: this.state.atmosphere,
      comfort: this.state.comfort,
      food: this.state.food
    })
    .then(res => {
      console.log(res.data)
    })
  }
  
  render() {
    return(
      <div>
        <input type='search' id='location-search' name='search' value={this.state.location} onChange={this.saveLocation} placeholder='Enter your address to find a study spot...'/>
        <h2> Rate By Importance (1 - 4) </h2>
        <input type='text' id='coffee' name='coffee' value={this.state.coffee} onChange={this.saveCoffee}/><h4>Coffee</h4>
        <input type='text' id='atmosphere' name='atmosphere' value={this.state.atmosphere} onChange={this.saveAtmosphere}/><h4>Atmosphere</h4>
        <input type='text' id='comfort' name='comfort' value={this.state.comfort} onChange={this.saveComfort}/><h4>Comfort</h4>
        <input type='text' id='food' name='food' value={this.state.food} onChange={this.saveFood}/><h4>Food</h4>
        <button onClick={this.search}> Search </button>
      </div>
    )
  }
}

export default Search;