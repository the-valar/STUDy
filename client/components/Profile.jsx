import React from 'react';
import {
  Navbar,
  NavItem,
  Nav,
  NavDropdown,
  MenuItem,
  Button,
  FormGroup,
  FormControl,
  Modal
} from 'react-bootstrap';
// import './bootstrap.css'
import './profile.css'
// import 'universal-parallax.min.css'

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showProfile: false, //keep false by default
    };

    this.toggleProfile = this.toggleProfile.bind(this);
  }

  toggleProfile() {
    this.setState({
      showProfile: !this.state.showProfile
    });
  }


  render() {
      return (
        <div>
            <Button bsStyle="primary" onClick={this.toggleProfile}>
              Launch Modal</Button>
              <Modal show={this.state.showProfile} onHide={this.toggleProfile}>
                <Modal.Body className="upper">
                    {/* make this container a css grid */}
                        <div className="picture">
                        <img className="img-responsive thumbnail" src={this.props.profilePic} />
                        </div>

                        <div className="rightSide">
                          <div className="title">
                          <h1>{this.props.user}</h1>
                          </div>
                          <div className="bio">
                          <p> {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".slice(0,280)}</p>
                          </div>
                  </div>

                    <div className="down">
                      <div className="friends">
                      <ul>
                        <li>wow</li>
                        <li>wow</li>
                        <li>wow</li>
                        <li>wow</li>
                        <li>wow</li>
                        <li>wow</li>
                        </ul>
                      </div>
                    </div>

                    <div className="down-right">
                      <div className="faves">
                      <ul>
                        <li>wow</li>
                        <li>wow</li>
                        <li>wow</li>
                        <li>wow</li>
                        <li>wow</li>
                        <li>wow</li>
                        </ul>
                      </div>
                    </div>
                </Modal.Body>
              </Modal>
        </div>
      );
    }
  }


export default Profile;
