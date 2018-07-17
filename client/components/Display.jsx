import React from 'react';

import { Grid, Row, Col, Media, Well, Thumbnail, Button } from 'react-bootstrap';
// import ReactStars from 'react-stars';

class Display extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log(this.props.cafes);
    if (!this.props.cafes.length) {
      return(<div>Hello</div>);
    } else {

    return(
    <div>
      <div align='center' style={{marginBottom:50}}>
        <img src={this.props.cafes[0].image_url} style={{maxHeight:500}} />
        {/* <ReactStars count={5} size={15} edit='false' /> */}
        <h3>Cafe</h3>
        <span>Location</span>
      </div>

        <Grid>
          <Row>
            <Col xs={6} md={4}>
              <Thumbnail src={this.props.cafes[1].image_url} height='250'>
                <h3>Thumbnail label</h3>
                <p>Description</p>
                <p>
                  <Button bsStyle="primary">Button</Button>&nbsp;
                  <Button bsStyle="default">Button</Button>
                </p>
              </Thumbnail>
            </Col>
            <Col xs={6} md={4}>
              <Thumbnail src={this.props.cafes[2].image_url} height='250'>
                <h3>Thumbnail label</h3>
                <p>Description</p>
                <p>
                  <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
                </p>
              </Thumbnail>
            </Col>
            <Col xs={6} md={4}>
              <Thumbnail src={this.props.cafes[3].image_url} height='250'>
                <h3>Thumbnail label</h3>
                <p>Description</p>
                <p>
                  <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
                </p>
              </Thumbnail>
            </Col>
          </Row>
        </Grid>

        {/* <Grid style={{marginTop: 50}}>
            <Col md={6}>
              <Media>
                <Media.Left align='top'>
                  <img width={64} height={64} />
                </Media.Left>

                <Media.Body>
                  <Media.Heading>Cafe</Media.Heading>
                </Media.Body>
              </Media>
            </Col>
          </Row>
        </Grid> */}
    </div>
    )
  }
  }
}

export default Display;