import React from 'react';

import { Grid, Row, Col, Media, Well, Thumbnail, Button } from 'react-bootstrap';
// import ReactStars from 'react-stars';

class Display extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log(this.props.cafes);

    this.props.cafes

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
              {this.props.cafes.map((cafe, i) => {
                return <Col xs={6} md={4} key={cafe.id}>
                  <Thumbnail src={cafe.image_url} height='250'>
                    <h3>{cafe.name}</h3>
                    <p>{cafe.location.address1}, {cafe.location.city}, {cafe.location.zip_code}</p>
                    <p>
                      <Button bsStyle="primary">Button</Button>&nbsp;
                      <Button bsStyle="default">Button</Button>
                    </p>
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

export default Display;

{/* <Grid>
<Row>
  {this.props.cafes.map((cafe, i) => {
    return <Col xs={6} md={4} key={cafe.id}>
      <Thumbnail src={cafe.image_url} height='250'>
        <h3>{cafe.name}</h3>
        <p>{cafe.location.address1}, {cafe.location.city}, {cafe.location.zip_code}</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
  })}
</Row>
</Grid> */}