import React from 'react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

class Review extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div>
          <Grid>
            <Row>
              <Col xs={6} md={3}>
                Coffee/Tea:<br />
                <StarRatings
                  numberOfStars={5}
                  rating={this.props.coffeeRating}
                  changeRating={this.props.handleCoffee}
                  starDimension="25px"
                  starSpacing="1px"
                  starRatedColor="gold"
                  starEmptyColor="grey"
                  starHoverColor="gold"
                />
              </Col>
              <Col xs={6} md={3}>
                Atmosphere:<br />
                <StarRatings
                  numberOfStars={5}
                  rating={this.props.atmosphereRating}
                  changeRating={this.props.handleAtmosphere}
                  starDimension="25px"
                  starSpacing="1px"
                  starRatedColor="gold"
                  starEmptyColor="grey"
                  starHoverColor="gold"
                />
              </Col>
              <Col xs={6} md={3}>
                Comfort:<br />
                <StarRatings
                  numberOfStars={5}
                  rating={this.props.comfortRating}
                  changeRating={this.props.handleComfort}
                  starDimension="25px"
                  starSpacing="1px"
                  starRatedColor="gold"
                  starEmptyColor="grey"
                  starHoverColor="gold"
                />
              </Col>
              <Col xs={6} md={3}>
                Food:<br />
                <StarRatings
                  numberOfStars={5}
                  rating={this.props.foodRating}
                  changeRating={this.props.handleFood}
                  starDimension="25px"
                  starSpacing="1px"
                  starRatedColor="gold"
                  starEmptyColor="grey"
                  starHoverColor="gold"
                />
              </Col>
            </Row>
          </Grid>
          <br />

          <div style={{ width: '500' }}>
            <FormGroup controlId="formControlsTextarea">
              <FormControl
                componentClass="textarea"
                placeholder="Enter your review here"
                value={this.props.review}
                onChange={this.props.enterReview}
              />
            </FormGroup>
          </div>

          <Button onClick={this.props.submitReview}> Submit </Button>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Review;
