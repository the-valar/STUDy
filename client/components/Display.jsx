import React from 'react';

import { Grid, Row, Col, Media, Well } from 'react-bootstrap';

class Display extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return(
    <div>
      <div align='center' style={{marginBottom:50}}>
        <img src='http://fsbcemmanuel.org/wp-content/uploads/2014/10/500x500-placeholder.png' />
      </div>

        <div className='col-md-4 mb-10'>
          <Media>
            <Media.Left align='top'>
              <img width={64} height={64} />
            </Media.Left>

            <Media.Body>
              <Media.Heading>Cafe</Media.Heading>
            </Media.Body>
          </Media>
        </div>

        <div className='col-md-4 mb-10'>
          <Media>
            <Media.Left align='top'>
              <img width={64} height={64} />
            </Media.Left>

            <Media.Body>
              <Media.Heading>Cafe</Media.Heading>
            </Media.Body>
          </Media>
        </div>

        <div className='col-md-4 mb-10'>
          <Media>
            <Media.Left align='top'>
              <img width={64} height={64} />
            </Media.Left>

            <Media.Body>
              <Media.Heading>Cafe</Media.Heading>
            </Media.Body>
          </Media>
        </div>

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

export default Display;