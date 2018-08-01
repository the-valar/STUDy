import React from "react";
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
} from "react-bootstrap";

// import './bootstrap.css'
// import './profile.css'
// import 'universal-parallax.min.css'
import Favorites from "./Favorites.jsx";
import axios from "axios";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showProfile: false, //keep false by default
      bio: null,
      toggleForm: false,
      userInput: ""
    };

    this.toggleProfile = this.toggleProfile.bind(this);
    this.getBio = this.getBio.bind(this);
    this.renderBio = this.renderBio.bind(this);
    this.sendBio = this.sendBio.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleProfile() {
    this.setState({
      showProfile: !this.state.showProfile
    });
  }

  getBio() {
    axios
      .get(`/bio?user_id=${this.props.userId}`)
      .then(({ data }) => this.setState({ bio: (data[0].bio === null ? 'Add a bio!' : data[0].bio)}));
  }
  sendBio() {
    axios
      .post(`/bio`, {
        user_id: this.props.userId,
        bio: this.state.userInput
      })
      .then(({ data }) => this.setState({ bio: `${data[0].bio}` }));
  }
  toggleForm() {
    this.setState({ toggleForm: !this.state.toggleForm });
  }

  renderBio() {
    if (this.state.toggleForm) {
      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            console.log(this.state.userInput);
            this.sendBio();
            this.setState({ bio: this.state.userInput });
            this.setState({ userInput: "" });
            this.toggleForm();
          }}
        >
          <textarea
            maxLength="280"
            value={this.state.userInput}
            onChange={e => this.setState({ userInput: e.target.value })}
          />
          <br />
          <input
            onSubmit={e => {
              e.preventDefault();
              console.log(this.state.userInput);
              this.sendBio();
              this.toggleForm();
            }}
            type="submit"
          />
        </form>
      );
    } else if (this.state.bio !== null) {
      return (
        <div>
          <a
            className="emoji"
            onClick={this.toggleForm}
            
          >
            🖋️
          </a>

          <p>{this.state.bio}</p>
        </div>
      );
    } else if (this.state.bio === null) {
      return (
        <div>
          <p>Add a bio!</p>
        </div>
      );
    }
  }

  componentWillUpdate() {
    if (this.props.userId && this.state.bio === null) this.getBio();
  }

  render() {
    return (
      <div>
        <Button bsStyle="primary" onClick={this.toggleProfile}>
          Launch Modal
        </Button>
        <Modal show={this.state.showProfile} onHide={this.toggleProfile}>
          <Modal.Body className="upper">
            {/* make this container a css grid */}
            <div className="picture">
              <img
                className="img-responsive thumbnail"
                src={this.props.profilePic}
              />
            </div>

            <div className="rightSide">
              <div className="title">
                <h1>{this.props.user}</h1>
              </div>
              <div className="bio">
                    {this.renderBio()}
              </div>
            </div>

            <div className="down">
              <Favorites
                userId={this.props.userId}
                showFavorites={this.state.showProfile}
                closeFavorites={this.toggleProfile}
              />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Profile;
