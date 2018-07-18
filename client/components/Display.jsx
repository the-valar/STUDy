import React from 'react';
import { Grid, Row, Col, Media, Well, Thumbnail, Carousel } from 'react-bootstrap';

class Display extends React.Component {
  constructor(props) {
    super(props);

    // sets current cafe to clicked cafe from list
    this.state = {
      currentCafe: {},
      cafeOn: false
    }

    this.cafeView = this.cafeView.bind(this)
  }

  // function that sets state to clicked cafe
  cafeView(cafe){
    this.setState({
      currentCafe: cafe,
      cafeOn: true
    })
  }


  render() {
    // console.log(this.props.cafes)

    // this.props.cafes

    if (!this.props.cafes.length) {
      return(<div>Hello</div>)
    } else if (this.props.cafes.length > 0 && !this.state.cafeOn){
      return(
        <div>
          <Grid>
            <Row>
              {this.props.cafes.map((cafe, i) => {
                return <Col xs={6} md={4} key={cafe.id}>
                  <Thumbnail src={cafe.image_url} height='250' onClick={ () => this.cafeView(cafe)}>
                    <h3>{cafe.name}</h3>
                    <p>{cafe.location.address1}, {cafe.location.city}, {cafe.location.zip_code}</p>
                  </Thumbnail>
                </Col>
              })}
            </Row>
          </Grid>
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
              <p><strong>Address:</strong> {this.state.currentCafe.location.display_address}</p>
              </Col>
              <Col xs={6} md={4} key={this.state.currentCafe.phone}>
              <p><strong>Phone:</strong> {this.state.currentCafe.phone}</p>
              </Col>
              <Col xs={6} md={4} key={this.state.currentCafe.distance}>
              <p><strong>Distance:</strong> {(this.state.currentCafe.distance*0.000621371).toFixed(2)} miles</p>
              </Col>
            </Row>
          </Grid>
          </div>
        <br/><br/>
          <Grid>
            <Row>
              {this.props.cafes.map((cafe, i) => {
                return <Col xs={6} md={4} key={cafe.id}>
                  <Thumbnail src={cafe.image_url} height='250' onClick={ () => this.cafeView(cafe)}>
                    <h3>{cafe.name}</h3>
                    <p>{cafe.location.address1}, {cafe.location.city}, {cafe.location.zip_code}</p>
                  </Thumbnail>
                </Col>
              })}
            </Row>
          </Grid>
        </div>
      )
    }
  }
}


// name -- show stars in row __#__ reviews
// pic -- bootstrap carousel
// phone number
// opening/closing hours
// distance from search location
// row of star ratings
// comment box


export default Display;

