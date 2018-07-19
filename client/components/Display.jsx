import React from 'react';

import { Grid, Row, Col, Media, Well, Thumbnail, Button } from 'react-bootstrap';
import StackGrid from "react-stack-grid";

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
          <StackGrid columnWidth={300} monitorImagesLoaded={true}>
            {this.props.cafes.map(cafe => {
              return (
                <div key={cafe.id}>
                  <Thumbnail src={cafe.image_url} height='250'>
                    <h3>{cafe.name}</h3>
                    <p>{cafe.location.address1}, {cafe.location.city}, {cafe.location.zip_code}</p>
                    <p>
                      <Button bsStyle="primary">Button</Button>&nbsp;
                      <Button bsStyle="default">Button</Button>
                    </p>
                  </Thumbnail>
                </div>
              )
            })}
          </StackGrid>
          <br></br>
          <br></br>
          <br></br>
        </div>
        
      )
    }
  }
}

export default Display;