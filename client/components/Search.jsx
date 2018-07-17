import React from 'react';
import axios from 'axios';

class Search extends React.Component {
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
      coffee: e.target.value
    })
  }

  saveAtmosphere(e){
    e.preventDefault();
    this.setState({
      atmosphere: e.target.value
    })
  }

  saveComfort(e){
    e.preventDefault();
    this.setState({
      comfort: e.target.value
    })
  }

  saveFood(e){
    e.preventDefault();
    this.setState({
      food: e.target.value
    })
  }

  search(e){
    e.preventDefault();
    axios.get('/search', {
      params: {
        location: this.state.location,
        coffee: this.state.coffee,
        atmosphere: this.state.atmosphere,
        comfort: this.state.comfort,
        food: this.state.food
      }
    })
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  render() {
    return(
      <div>
        <br/><br/><br/><br/><br/>
        <textarea rows="2" cols="55" type='text' id='location-search' name='search' value={this.state.location} onChange={this.saveLocation} placeholder='Enter your address to find a study spot...'/>
        <h4> Rate By Importance (1 - 4) </h4>
        <form>
        <input size="2" maxLength="1" type='text' id='coffee' name='coffee' value={this.state.coffee} onChange={this.saveCoffee}/> <h6>Coffee</h6>
        <input size="2" maxLength="1" type='text' id='atmosphere' name='atmosphere' value={this.state.atmosphere} onChange={this.saveAtmosphere}/> <h6>Atmosphere</h6>
        <input size="2" maxLength="1" type='text' id='comfort' name='comfort' value={this.state.comfort} onChange={this.saveComfort}/> <h6>Comfort</h6>
        <input size="2" maxLength="1" type='text' id='food' name='food' value={this.state.food} onChange={this.saveFood}/> <h6>Food</h6>
        <button onClick={this.search}> Show Me Study Spots</button>
        </form>
      </div>
    )
  }
}

export default Search;