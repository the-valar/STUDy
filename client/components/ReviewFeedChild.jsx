import React from 'react';

const ReviewFeedChild = (props) => (
  <div>
    <p>{props.comment.username}: {props.comment.text}</p>
  </div>
);

export default ReviewFeedChild;

