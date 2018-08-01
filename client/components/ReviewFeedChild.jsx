import React from 'react';

const ReviewFeedChild = (props) => (
  <div className="child-comment">
    <h5> {props.comment.username}:</h5>
    <p> {props.comment.text}</p>
  </div>
);

export default ReviewFeedChild;

