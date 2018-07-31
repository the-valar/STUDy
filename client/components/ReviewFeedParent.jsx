import React from 'react';

class ReviewFeedParent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasChildren: false
    }
  }

  componentDidMount() {
    //here is where I check if the review has children
    //if yes flip a flag to get child reviews as well
  }

  render() {

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
    </div>

    )
  }
}

export default ReviewFeedParent;