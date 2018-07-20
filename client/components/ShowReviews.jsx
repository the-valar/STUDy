import React from 'react';
import { Grid, Row, Col, Button, Modal  } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

class ShowReviews extends React.Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    console.log('SHOW REVIEWS PROPS', this.props.reviews)
    return (
      <div>

        <Button bsStyle="primary" bsSize="small" onClick={this.handleShow}>
          {this.props.reviews.length} Review(s)<br></br>
          Click for more reviews
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.cafe.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.reviews.map(review => {
              console.log('review', review)
              return (
              <div>
              <Grid>
                <Row>
                <Col xs={6} md={3}>
                <strong>Coffee/Tea:</strong> <StarRatings numberOfStars={5} rating={review.coffeeTea || 0} starDimension='15px' starSpacing='1px' starRatedColor='gold' starEmptyColor='grey'/>
                </Col>
                <Col xs={6} md={3}>
                <strong>Atmosphere: </strong><StarRatings numberOfStars={5} rating={review.atmosphere || 0} starDimension='15px' starSpacing='1px' starRatedColor='gold' starEmptyColor='grey'/>
                </Col>
                <Col xs={6} md={3}>
                <strong>Comfort:</strong> <StarRatings numberOfStars={5} rating={review.comfort || 0} starDimension='15px' starSpacing='1px' starRatedColor='gold' starEmptyColor='grey'/>
                </Col>
                <Col xs={6} md={3}>
                <strong>Food:</strong> <StarRatings numberOfStars={5} rating={review.food || 0} starDimension='15px' starSpacing='1px' starRatedColor='gold' starEmptyColor='grey'/>
                </Col>
                </Row>
              </Grid>
              <br></br>
              <p>{review.text}</p>
              <br></br>
              </div>
              )
            })}

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default ShowReviews;