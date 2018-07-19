import React from 'react';
import axios from 'axios';
import { Grid, Row, Col, Thumbnail, Button, Carousel } from 'react-bootstrap';
import StackGrid from "react-stack-grid";

class Display extends React.Component {
  constructor(props) {
    super(props);

    // sets current cafe to clicked cafe from list
    this.state = {
      currentCafe: {},
      currentCafeReviews: {},
      cafeOn: false
    };

    this.cafeView = this.cafeView.bind(this)
  };

  // function that sets state to clicked cafe
  cafeView(cafe){
    axios.get('/ratings', {
      params: {
        location_id: cafe.id,
        average: true
      }
    })
    .then((res) => {
      this.setState({
        currentCafe: cafe,
        currentCafeReviews: res.data[0],
        cafeOn: true
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  render() {
    if (!this.props.cafes.length) {
      return(<div></div>);
    } else if (this.props.cafes.length > 0 && !this.state.cafeOn){
      return(
              <div>
            <StackGrid>
            {this.props.cafes.map(cafe => {
              return (
                <div key={cafe.id}>
                  <Thumbnail src={cafe.image_url} height='250' onClick={() => this.cafeView(cafe)}>
                    <h3>{cafe.name}</h3>
                    <p>{cafe.location.address1}, {cafe.location.city}, {cafe.location.state}, {cafe.location.zip_code}</p>
                  </Thumbnail>
                </div>
              )
            })}

          </StackGrid>
        </div>
      )
    } else if (this.props.cafes.length > 0 && this.state.cafeOn) {
      return(
        <div>
          <div align='center' style={{marginBottom:50}}>
          <h3>{this.state.currentCafe.name}</h3>
          <Carousel>
            <Carousel.Item>
              <img style={{maxWidth:"600px", height:"50%"}} alt="600x200" src={this.state.currentCafe.image_url} />
            </Carousel.Item>
            <Carousel.Item>
            <img style={{maxWidth:"600px", height:"50%"}} alt="600x200" src={this.state.currentCafe.image_url} />
            </Carousel.Item>
            <Carousel.Item>
            <img style={{maxWidth:"600px", height:"50%"}} alt="600x200" src={this.state.currentCafe.image_url} />
            </Carousel.Item>
          </Carousel>
            {/* <img src={this.props.cafes[0].image_url} style={{maxHeight:500}} /> */}
            {/* <ReactStars count={5} size={15} edit='false' /> */}
          <Grid>
            <Row>
              <Col xs={6} md={4} key={this.state.currentCafe.location.display_address}>
                  <p><strong>Address:</strong><br />
                  {this.state.currentCafe.location.address1}
                  {this.state.currentCafe.location.address2 ? <span> <br /> {this.state.currentCafe.location.address2} </span> : ''}
                  {this.state.currentCafe.location.address3 ? <span> <br /> {this.state.currentCafe.location.address3} </span> : ''}
                  <br />
                  {this.state.currentCafe.location.city}, {this.state.currentCafe.location.state}, {this.state.currentCafe.location.zip_code}
                  </p>
              </Col>
              <Col xs={6} md={4} key={this.state.currentCafe.phone}>
              <p><strong>Phone:</strong><br />
              {this.state.currentCafe.phone}
              </p>
              </Col>
              <Col xs={6} md={4} key={this.state.currentCafe.distance}>
              <p><strong>Distance:</strong><br />
              {(this.state.currentCafe.distance*0.000621371).toFixed(2)} miles
              </p>
              </Col>
            </Row>
          </Grid>
          </div>

          <StackGrid columnWidth={300} monitorImagesLoaded={true}>
            {this.props.cafes.map(cafe => {
              return (
                <div key={cafe.id}>
                  <Thumbnail src={cafe.image_url} height='250' onClick={ () => this.cafeView(cafe)}>
                    <h3>{cafe.name}</h3>
                    <p>{cafe.location.address1}, {cafe.location.city}, {cafe.location.state}, {cafe.location.zip_code}</p>
                    <p>
                      <Button bsStyle="primary">Button</Button>&nbsp;
                      <Button bsStyle="default">Button</Button>
                    </p>
                  </Thumbnail>
                </div>
              )
            })}
          </StackGrid>

        </div>
        
      )
    }
  }
}

export default Display;

// name -- show stars in row __#__ reviews
// pic -- bootstrap carousel
// phone number
// opening/closing hours
// distance from search location
// row of star ratings
// comment box
