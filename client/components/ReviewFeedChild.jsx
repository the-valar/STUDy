import React from 'react';
import ReactTooltip from 'react-tooltip';

const ReviewFeedChild = (props) => {
  let membershipStatus = props.comment.membership > 0 ? <span className="horse" data-tip data-for={`"${props.comment.id}"`} role="img" aria-label="stud">🐎</span> : null;
  let profPicCSSClass = props.comment.membership > 0 ? "comment-prof-pic comment-member" : "comment-prof-pic"
  let profilePic = props.comment.profile_pic ? <img src={props.comment.profile_pic} className={profPicCSSClass}/> : <img src="../assets/anon-user.jpeg" className={profPicCSSClass}/>;


  return (
    <div className="child-comment">
      <h5> {profilePic} {membershipStatus} {props.comment.username}:</h5>
      <ReactTooltip id={`"${props.comment.id}"`} type="error">
          <p>{props.comment.username} is a STUD..<br/>Check the settings menu for details on how to be a STUD</p>
        </ReactTooltip>
      <p> {props.comment.text}</p>
    </div>
  )
};

export default ReviewFeedChild;

