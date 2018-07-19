import React from 'react';
import axios from 'axios';
import { Grid, Col, FormControl, Button, Collapse, Row } from 'react-bootstrap';

import { Alert } from 'react-alert';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      prefs: [],
      radius: null,
      advanced: false
    };

    this.saveLocation = this.saveLocation.bind(this);
    this.getOrderOfPref = this.getOrderOfPref.bind(this);
    this.savePref = this.savePref.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.showAdvanced = this.showAdvanced.bind(this);
    this.renderAdvancedSearch = this.renderAdvancedSearch.bind(this);
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
      <div align='center'>
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
          <Grid >
          <Row>
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
            </Row>
          </Grid>
        </div>
      </Collapse>
    );
  }

  search(e) {
    // e.preventDefault();
    axios
      .get('/search', {
        params: {
          location: this.state.location,
          coffee: this.state.prefs.indexOf('Coffee') + 1 || 0,
          atmosphere: this.state.prefs.indexOf('Atmosphere') + 1 || 0,
          comfort: this.state.prefs.indexOf('Comfort') + 1 || 0,
          food: this.state.prefs.indexOf('Food') + 1 || 0,
          radius: this.state.radius || 800
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
    const options = {
      position: 'top center',
      timeout: 3000,
      offset: '150px',
      transition: 'scale'
    }

    return (
      <div>
      <div className="form-row text-center" style={{ marginTop: '5%', width:'50%' }}>
        <FormControl
          type="text"
          value={this.state.location}
          onChange={this.saveLocation}
          placeholder="Enter your address to find a STUD(y) spot..."
        />
        <a href="" align="center" onClick={this.showAdvanced}>
          {this.state.advanced ? 'Hide Advanced Search' : 'Advanced Search'}
        </a>
        </div>

        <div>
        {this.renderAdvancedSearch()}
        </div>

        <div>

          {/* <Button
            className="center"
            onClick={this.search}
            style={{ marginTop: '1%' }}
          >
            Search STUD(y) Spots
          </Button> */}

          <AlertProvider template={AlertTemplate} {...options}>
            <Alert>
              {alert => (
                <Button className="center" type="submit" value="Submit" style={{ marginTop: '1%' }} onClick={ () => { (!this.state.location.length) ? alert.show('Oh snap! Enter a real location!') : this.search() } }> Go STUD(y) </Button>
              )}
            </Alert>
          </AlertProvider>

        </div>

      </div>
    );
  }
}

export default Search;
