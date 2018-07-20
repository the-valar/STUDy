import React from 'react';
import { Thumbnail, Modal } from 'react-bootstrap';
import StackGrid from 'react-stack-grid';

import axios from 'axios';

class Favorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favorites: []
    }
  }

  modalBody() {
    if (this.state.favorites.length) {
      return(
        <div>
          <Modal.Body>
            <StackGrid columnWidth={300} monitorImagesLoaded={true}>
              {this.state.favorites.map(cafe => {
                return (
                  <div key={cafe.id}>
                    <Thumbnail height='250'>
                      <h3>{cafe.name}</h3>
                      <p>{cafe.address}, {cafe.city}, {cafe.state}</p>
                    </Thumbnail>
                  </div>
                );
              })}
            </StackGrid>
          </Modal.Body>
        </div>
      );
    } else {
      return(
        <div>
          <Modal.Body>
            No favorites to show.
          </Modal.Body>
        </div>
      );
    }
  }

  componentWillMount() {
    axios.get('/favorites', {
      params: {
        user_id: this.props.userId
      }
    })
      .then(response => {
        this.setState({
          favorites: response.data
        });
      })
      .catch(err => {
        console.error('Error getting favorites', err);
      });
  }

  render() {
    return(
      <div>
        <Modal show={this.props.showFavorites} onHide={this.props.closeFavorites}>
          <Modal.Header closeButton>
            <Modal.Title>Favorites</Modal.Title>
          </Modal.Header>
          
          <div>
            {this.modalBody()}
          </div>

        </Modal>
      </div>
    )
  }
}

export default Favorites;