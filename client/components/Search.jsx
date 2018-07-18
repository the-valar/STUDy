import React from 'react';
import axios from 'axios';
import { Grid, Col, FormControl, Button, Collapse } from 'react-bootstrap';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      prefs: [],
      advanced: false
    };

    this.saveLocation = this.saveLocation.bind(this);
    this.getOrderOfPref = this.getOrderOfPref.bind(this);
    this.savePref = this.savePref.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.showAdvanced = this.showAdvanced.bind(this);
    this.search = this.search.bind(this);
  }

  saveLocation(e) {
    e.preventDefault();
    this.setState({
      location: e.target.value
    });
  }

  getCurrentPref() {
    return (
      <div>
        <h4>Pick Your Preferences in Order:</h4>
      </div>
    );
  }

  getOrderOfPref(item) {
    if (this.state.prefs.indexOf(item) === -1) {
      return item;
    } else {
      return this.state.prefs.indexOf(item) + 1 + `. ${item}`;
    }
  }

  savePref(e) {
    var newPrefs = this.state.prefs;
    if (this.state.prefs.indexOf(e.target.value) === -1) {
      newPrefs.push(e.target.value);
      this.setState({ prefs: newPrefs });
    } else {
      newPrefs.splice(newPrefs.indexOf(e.target.value), 1);
      this.setState({ prefs: newPrefs });
    }
  }

  isSelected(item) {
    if (this.state.prefs.indexOf(item) > -1) {
      return 'success';
    }
  }

  showAdvanced(e) {
    e.preventDefault();
    this.setState({ advanced: !this.state.advanced });
  }

  renderAdvancedSearch() {
    return (
      <Collapse in={this.state.advanced}>
        <div>
          {this.getCurrentPref()}
          <Grid>
            <Col sm={6} md={3}>
              <Button
                value="Coffee"
                onClick={this.savePref}
                bsStyle={this.isSelected('Coffee')}
                block
              >
                {this.getOrderOfPref('Coffee')}
              </Button>
            </Col>
            <Col sm={6} md={3}>
              <Button
                value="Atmosphere"
                onClick={this.savePref}
                bsStyle={this.isSelected('Atmosphere')}
                block
              >
                {this.getOrderOfPref('Atmosphere')}
              </Button>
            </Col>
            <Col sm={6} md={3}>
              <Button
                value="Comfort"
                onClick={this.savePref}
                bsStyle={this.isSelected('Comfort')}
                block
              >
                {this.getOrderOfPref('Comfort')}
              </Button>
            </Col>
            <Col sm={6} md={3}>
              <Button
                value="Food"
                onClick={this.savePref}
                bsStyle={this.isSelected('Food')}
                block
              >
                {this.getOrderOfPref('Food')}
              </Button>
            </Col>
          </Grid>
        </div>
      </Collapse>
    );
  }

  search(e) {
    e.preventDefault();
    axios
    .get('/search', {
      params: {
        location: this.state.location,
        coffee: this.state.coffee,
        atmosphere: this.state.atmosphere,
        comfort: this.state.comfort,
        food: this.state.food
      }
    })
    .then((res) => {
      // Set state of cafes to data retrieved from Yelp
      // Use function passed down from index.jsx (handleYelp)
      this.props.handleYelp(res.data.businesses);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="form-row text-center" style={{ marginTop: '20%' }}>
        <FormControl
          type="text"
          value={this.state.location}
          onChange={this.saveLocation}
          placeholder="Enter your address to find a STUD(y) spot..."
        />
        <a href="" align="center" onClick={this.showAdvanced}>
          {this.state.advanced ? 'Hide Advanced Search' : 'Advanced Search'}
        </a>
        {this.renderAdvancedSearch()}
        <div>
          <Button
            className="center"
            onClick={this.search}
            style={{ marginTop: '2%' }}
          >
            Search STUD(y) Spots
          </Button>
        </div>
      </div>
    );
  }
}

export default Search;
