import React from 'react';
import axios from 'axios';

class ReviewFeedParent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasChildren: false,
      showCommentForm: false,
      commentValue: '',
      commentCharsRemain: 255
    }
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentClick = this.handleCommentClick.bind(this);
  }

  handleCommentSubmit(event) {
    event.preventDefault();
    axios.post('/subComment', {
      parentId: this.props.review.id,
      location: this.props.review.location,
      userId: this.props.review.user_id,
      text: this.state.commentValue
    })
      .then((response) => {
        this.setState({
          commentValue: '',
          commentCharsRemain: 255
        })
      })
  }

  handleCommentChange(event) {
    this.setState({
      commentValue: event.target.value,
      commentCharsRemain: 255 - event.target.value.length
    })

  }

  handleCommentClick() {
    this.setState({
      showCommentForm: !this.state.showCommentForm,
      commentValue: '',
      commentCharsRemain: 255
    })
  }

  componentDidMount() {
    //here is where I check if the review has children
    //if yes flip a flag to get child reviews as well
  }

  render() {

    let comment = this.state.showCommentForm ? 
                  <form onSubmit={this.handleCommentSubmit}>
                    <p>Characters left: {this.state.commentCharsRemain}</p>
                    <input type="text" value={this.state.commentValue} onChange={this.handleCommentChange}/>
                    <input type="submit" value="Submit" />
                    <button onClick={this.handleCommentClick}>Cancel</button>
                  </form> : 
                  <button onClick={this.handleCommentClick}>Comment</button>


    return (
    <div>
      <h5>
        <div>
        {this.props.review.name}
        </div>
        <div>
          <small>
            {this.props.review.address} <br/>
            {this.props.review.city}, {this.props.review.state}
          </small>
        </div>
      </h5>
      <p>
        {this.props.review.username}: {this.props.review.text}
      </p>
      {comment}
    </div>

    )
  }
}

export default ReviewFeedParent;