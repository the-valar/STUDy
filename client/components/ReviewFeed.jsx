import React from 'react';
import axios from 'axios';

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
        console.log('response for getting parent reviews', response)
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
    return (<div>Hello</div>)
  }
}

export default ReviewFeed;