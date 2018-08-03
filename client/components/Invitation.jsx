import React from 'react'
import { ControlLabel, Modal, Button, FormControl } from 'react-bootstrap'
import axios from 'axios'

class Invitation extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render () {
    return (
      <div>
        <Modal show={this.props.showInvitation} onHide={this.props.closeInvitation}>

          <Modal.Header closeButton>
            <Modal.Title>Chat</Modal.Title>
          </Modal.Header>

          <div>
            <Modal.Body>
                <ControlLabel>You've received invitations to join a STUD(y) Chat: </ControlLabel>
                {
                  this.props.invitations.map((invite) => {
                  return (
                    <div key={invite.id}>
                      <div style={{marginLeft: '10px'}}>
                        Chat ID: {invite.chatgroups_id}
                      </div>
                     <Button type="submit"
                          value="Submit"
                          onClick={() => {this.props.acceptInvitation(invite.chatgroups_id, invite.id)}}>Accept Invitation</Button>
                     <Button type="submit"
                          value="Submit"
                          onClick={() => {this.props.rejectInvitation(invite.id)}}>Reject Invitation</Button>
                      <hr></hr>
                    </div>
                  )
                })
                }
              </Modal.Body>
            </div>
        </Modal>
      </div>
    )
  }
}

export default Invitation