import React from 'react'
import { ControlLabel, Modal, Button, FormControl } from 'react-bootstrap'
import axios from 'axios'

class JoinChat extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Modal show={this.props.showJoinRoom} onHide={this.props.closeJoinRoom}>

          <Modal.Header closeButton>
            <Modal.Title>Chat</Modal.Title>
          </Modal.Header>

          <div>
            <Modal.Body>
               {this.props.selectedRoom.length === 0 ?  (
                <ControlLabel>Groups available to join:</ControlLabel>
                ) : (
                <ControlLabel>Joining Group {this.props.selectedRoom['group_name']}</ControlLabel>
                )}
                {this.props.rooms.map((room, i) => {
                  return (
                    <div key={i} className="row">
                      <hr></hr>
                      <div className="col-sm-6">
                      <h5>{room['group_name']}</h5>
                      <p>Chat Topic: {room['group_topic']}</p>
                      </div>
                      <div className="col-sm-6">
                      <Button type="submit"
                          value="Submit"
                          onClick = {() => this.props.handleSelectedRoom(room)}>Join Chat</Button>
                      </div>
                    </div>
                  )
                })}
              </Modal.Body>
            </div>
        </Modal>
      </div>
    )
  }
}

export default JoinChat
