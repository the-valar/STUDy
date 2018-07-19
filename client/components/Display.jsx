import React from 'react';
import { Grid, Row, Col, Media, Well, Thumbnail, Button, Carousel, FormControl , FormGroup} from 'react-bootstrap';
import StackGrid from "react-stack-grid";
import StarRatings from 'react-star-ratings';
import axios from 'axios';

class Display extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCafe: {},
      currentCafeReviews: {},
      cafeOn: false,
      review: '',
      coffeeRating: 0,
      atmosphereRating: 0,
      comfortRating: 0,
      foodRating: 0
    };

    this.cafeView = this.cafeView.bind(this)
    this.submitReview = this.submitReview.bind(this)
    this.enterReview = this.enterReview.bind(this)
    this.coffeeRating = this.coffeeRating.bind(this)
    this.atmosphereRating = this.atmosphereRating.bind(this)
    this.comfortRating = this.comfortRating.bind(this)
    this.foodRating = this.foodRating.bind(this)
  };

  // function that sets state to clicked cafe
  cafeView(cafe){
    axios.get('/ratings', {
      params: {
        location_id: cafe.id,
        average: true
      }
    })
    // gets the stored reviews for the current cafe
    .then((res) => {
      axios.get('/pics', {
        params: {
          location_id: cafe.id
        }
      })
      .then((result) => {
        var newCafe = Object.assign({ pics: result.data.photos }, cafe);
        this.setState({
          currentCafe: newCafe,
          currentCafeReviews: res.data[0],
          cafeOn: true
        });
      })
      .catch((err) => {
        console.log(err);
      })
      
    })
    .catch((err) => {
      console.log(err);
    });
    
  }

  // submits review comment
  submitReview() {
    axios.post('/ratings', {
      user_id: 1,
      location_id: this.state.currentCafe.id,
      coffeeTea: this.state.coffeeRating,
      atmosphere: this.state.atmosphereRating,
      comfort: this.state.comfortRating,
      food: this.state.foodRating
    })
    .catch(err => {
      console.log('ADD RATING ERR', err)
    })

    axios.post('/comments', {
      user_id: 1,
      location_id: this.state.currentCafe.id,
      text: this.state.review
    })
    .then(() => {
      console.log('then after posting comment')
      this.setState({
        review: '',
        coffeeRating: 0,
        atmosphereRating: 0,
        comfortRating: 0,
        foodRating: 0
      })
    })
    .catch(err => {
      console.log('ADD COMMENT ERR', err)
    })
    // submits review stars

  }

  //sets state with review comment entered in textbox
  enterReview(e){
    e.preventDefault();
    this.setState({
      review: e.target.value
    })
  }

  // sets state with star rating for coffee
  coffeeRating(rating){
    this.setState({
      coffeeRating: rating
    })
  }

  // sets state with star rating for atmosphere
  atmosphereRating(rating){
    this.setState({
      atmosphereRating: rating
    })
  }

  // sets state with star rating for comfort
  comfortRating(rating){
    this.setState({
      comfortRating: rating
    })
  }

  // sets state with star rating for food
  foodRating(rating){
    this.setState({
      foodRating: rating
    })
  };

  render() {
    // page shows no search results
    if (!this.props.cafes.length) {
      return null;
      // page shows search results after successful search
    } else if (this.props.cafes.length > 0 && !this.state.cafeOn){
      return(
        <div>
          <StackGrid columnWidth={300} monitorImagesLoaded={true}>
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
          {/* current cafe name & picture */}
          <div align='center' style={{marginBottom:50}}>
          {/* current cafe name & avg star ratings */}
          <h3>{this.state.currentCafe.name}</h3>
          {this.state.currentCafeReviews.count} Reviews
          <Grid>
            <Row>
            <Col xs={6} md={2}>
            </Col>
            <Col xs={6} md={2}>
            Coffee/Tea: <StarRatings numberOfStars={5} rating={this.state.currentCafeReviews.coffeeTea} starDimension='20px' starSpacing='1px' starRatedColor='gold' starEmptyColor='grey'/>
            </Col>
            <Col xs={6} md={2}>
            Atmosphere: <StarRatings numberOfStars={5} rating={this.state.currentCafeReviews.atmosphere} starDimension='20px' starSpacing='1px' starRatedColor='gold' starEmptyColor='grey'/>
            </Col>
            <Col xs={6} md={2}>
            Comfort: <StarRatings numberOfStars={5} rating={this.state.currentCafeReviews.comfort} starDimension='20px' starSpacing='1px' starRatedColor='gold' starEmptyColor='grey'/>
            </Col>
            <Col xs={6} md={2}>
            Food: <br/><StarRatings numberOfStars={5} rating={this.state.currentCafeReviews.food} starDimension='20px' starSpacing='1px' starRatedColor='gold' starEmptyColor='grey'/>
            </Col>
            <Col xs={6} md={2}>
            </Col>
            </Row>
          </Grid>

          <Carousel>
            <Carousel.Item>
              <img style={{maxWidth:"600px", height:"50%"}} alt="600x200" src={this.state.currentCafe.pics[0]} />
            </Carousel.Item>
            <Carousel.Item>
            <img style={{maxWidth:"600px", height:"50%"}} alt="600x200" src={this.state.currentCafe.pics[1]} />
            </Carousel.Item>
            <Carousel.Item>
            <img style={{maxWidth:"600px", height:"50%"}} alt="600x200" src={this.state.currentCafe.pics[2]} />
            </Carousel.Item>
          </Carousel>
          <br/>
          
          {/* info of current cafe */}
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

          {/* stars for ratings */}
          <Grid>
            <Row>
            <Col xs={6} md={3}>
            Coffee/Tea:<br/><StarRatings numberOfStars={5} rating={this.state.coffeeRating} changeRating={this.coffeeRating} starDimension='25px' starSpacing='1px' starRatedColor='gold' starEmptyColor='grey' starHoverColor='gold' />
            </Col>
            <Col xs={6} md={3}>
            Atmosphere:<br/><StarRatings numberOfStars={5} rating={this.state.atmosphereRating} changeRating={this.atmosphereRating} starDimension='25px' starSpacing='1px' starRatedColor='gold' starEmptyColor='grey' starHoverColor='gold' />
            </Col>
            <Col xs={6} md={3}>
            Comfort:<br/><StarRatings numberOfStars={5} rating={this.state.comfortRating} changeRating={this.comfortRating} starDimension='25px' starSpacing='1px' starRatedColor='gold' starEmptyColor='grey' starHoverColor='gold' />
            </Col>
            <Col xs={6} md={3}>
            Food:<br/><StarRatings numberOfStars={5} rating={this.state.foodRating} changeRating={this.foodRating} starDimension='25px' starSpacing='1px' starRatedColor='gold' starEmptyColor='grey' starHoverColor='gold' />
            </Col>
            </Row>
          </Grid>
          <br/>

          {/* review box */}
          <div style={{width: "500"}}>
          <FormGroup controlId="formControlsTextarea">
            <FormControl componentClass="textarea" placeholder="Enter your review here" value={this.state.review} onChange={this.enterReview}/>
          </FormGroup>
          </div>
          <Button onClick={this.submitReview}> Submit </Button>
          <br/><br/>
          <div style={{position: "center"}}>
          </div>
          </div>

          {/* list of cafes from search */}
          <StackGrid columnWidth={300} monitorImagesLoaded={true}>
            {this.props.cafes.map(cafe => {
              return (
                <div key={cafe.id}>
                  <Thumbnail src={cafe.image_url} height='250' onClick={ () => this.cafeView(cafe)}>
                    <h3>{cafe.name}</h3>
                    <p>{cafe.location.address1}, {cafe.location.city}, {cafe.location.state}, {cafe.location.zip_code}</p>
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
