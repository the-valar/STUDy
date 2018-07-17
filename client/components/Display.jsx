import React from 'react';

import { Grid, Row, Col, Media, Well } from 'react-bootstrap';

class Display extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return(
    <div>
      <div align='center'>
        <img src='http://fsbcemmanuel.org/wp-content/uploads/2014/10/500x500-placeholder.png' />
      </div>

        <Grid style={{marginTop: 50}}>
          <Row>
            <Col md={6} className='pull-left'>
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
        </Grid>
    </div>
    )
  }
}

export default Display;