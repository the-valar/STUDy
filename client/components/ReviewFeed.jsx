import React from 'react';
import axios from 'axios';
import ReviewFeedParent from './ReviewFeedParent.jsx';

class ReviewFeed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: []
    }
    this.getParentReviews = this.getParentReviews.bind(this);
  }

  getParentReviews() {
    axios.get('/reviewsByParentId', {
      params: {
        parentId: 0
    }})
      .then((response) => {
        this.setState({
          reviews: response.data
        })
      })
      .catch((err) => {
        console.error('there was an error fetching the top level reviews', err)
      })
  }
  componentDidMount() {
    this.getParentReviews()
    this.intervalFetchReviews = setInterval(() => this.getParentReviews(), 2000);
  }
  render() {
    let reviews = this.state.reviews.map((review) => (
      <ReviewFeedParent currentUserId={this.props.currentUserId} key={review.id} review={review} />
    ))
    return (
      <div>
        <div className="review-feed-spacing"></div>
        <h4 className="review-feed-title">
        What the community is saying about their recent study spots:
        </h4>
        {reviews}
      </div>
    )
  }
}

export default ReviewFeed;