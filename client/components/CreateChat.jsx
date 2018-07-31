import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import axios from 'axios';

class CreateChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groupName: '', 
      groupThumbail: '', 
      groupTopic: ''
    };
  }

  createChat() {
    // TODO: Socket.io
  }

  render() {
    return (
      <div>
        <Modal show={this.props.showCreateChat} onHide={this.props.closeCreateChat}>

          <Modal.Header closeButton>
            <Modal.Title>Create Chat</Modal.Title>
          </Modal.Header>

          <div>
            <Modal.Body>No favorites to show.</Modal.Body>
            <Modal.Footer>
              <Button>Close</Button>
              <Button type="submit"
                      value="Submit">Create Group</Button>
          </Modal.Footer>
          </div>
        </Modal>
      </div>
    );
  }
}

export default CreateChat;
// add on-click
// change button color 
// send invitation to friend
// join chat 