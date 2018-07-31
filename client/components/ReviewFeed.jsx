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
  }
  render() {
    let reviews = this.state.reviews.map((review) => (
      <ReviewFeedParent key={review.id} review={review} />
    ))
    return (
      <div>
        What the community is saying about their recent study spots
        {reviews}
      </div>
    )
  }
}

export default ReviewFeed;